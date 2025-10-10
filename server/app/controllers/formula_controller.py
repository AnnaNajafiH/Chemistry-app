from typing import List
from fastapi import HTTPException, Request
from sqlalchemy.orm import Session
from app.schemas.schemas import FormulaResponse, FormulaHistoryModel
from app.services.formula_service import FormulaService
from app.services.pubchem_service import PubChemService
from app.services.formula_history_service import FormulaHistoryService


class FormulaController:
    def __init__(self):
        self.formula_service = FormulaService()
        
#=====================================================================================

    def calculate_formula(self, formula: str, request: Request, db: Session) -> FormulaResponse:
        try:
            # Calculate molar mass
            molar_mass = self.formula_service.calculate_molar_mass(formula)
            
            # Try to get additional properties from PubChem
            properties = PubChemService.get_chemical_properties(formula)
            
            # Get user IP if available
            user_ip = self._get_client_ip(request)
            
            # Save the calculation to history and get the saved entry
            db_formula = FormulaHistoryService.create_formula_entry(
                db=db,
                formula=formula,
                molar_mass=molar_mass,
                user_ip=user_ip,
                properties=properties
            )
            
            # Create response from the database entry
            # This ensures all properties are consistently handled
            response_data = {
                "formula": db_formula.formula,
                "molar_mass": round(db_formula.molar_mass, 6),  # Round to 6 decimal places for display
                "unit": "g/mol"
            }
            
            # Add all available properties from the database entry
            for field in FormulaResponse.__annotations__:
                if field not in response_data and hasattr(db_formula, field) and getattr(db_formula, field):
                    response_data[field] = getattr(db_formula, field)
            
            return FormulaResponse(**response_data)
            
        except ValueError as ve:
            raise HTTPException(status_code=400, detail=str(ve))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Calculation failed: {str(e)}")


#=====================================================================================

    
    def get_recent_formulas(self, db: Session) -> List[FormulaHistoryModel]:
        try:
            formulas = FormulaHistoryService.get_recent_formulas(db)
            return [FormulaHistoryModel.model_validate(formula) for formula in formulas]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")
    
    
#=====================================================================================


    def get_formula_history(self, db: Session, skip: int = 0, limit: int = 10) -> List[FormulaHistoryModel]:
        try:
            formulas = FormulaHistoryService.get_formula_history(db, skip, limit)
            return [FormulaHistoryModel.model_validate(formula) for formula in formulas]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")
    

#=====================================================================================

            
    def get_formula_by_id(self, formula_id: int, db: Session) -> FormulaHistoryModel:
        try:
            formula = FormulaHistoryService.get_formula_by_id(db, formula_id)
            if not formula:
                raise HTTPException(status_code=404, detail=f"Formula with ID {formula_id} not found")
            return FormulaHistoryModel.model_validate(formula)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to retrieve formula: {str(e)}")

        
#=====================================================================================


    def update_formula(self, formula_id: int, formula_data: dict, db: Session):
        try:
            updated_formula = FormulaHistoryService.update_formula_entry(db, formula_id, formula_data)
            if not updated_formula:
                raise HTTPException(status_code=404, detail=f"Formula with ID {formula_id} not found")
            return FormulaHistoryModel.model_validate(updated_formula)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to update formula: {str(e)}")
        

#=====================================================================================

            
    def delete_formula(self, formula_id: int, db: Session):
        try:
            success = FormulaHistoryService.delete_formula_entry(db, formula_id)
            if not success:
                raise HTTPException(status_code=404, detail=f"Formula with ID {formula_id} not found")
            return {"status": "success", "message": f"Formula with ID {formula_id} deleted successfully"}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to delete formula: {str(e)}")
        
        
#=====================================================================================

    
    def _get_client_ip(self, request: Request) -> str:
        # Check for X-Forwarded-For header first (common with proxies)
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            # The client IP is the first one in the list
            return forwarded_for.split(",")[0].strip()
        
        # If no X-Forwarded-For, use the client host
        client_host = request.client.host if request.client else None
        return client_host or ""