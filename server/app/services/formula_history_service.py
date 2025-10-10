from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.FormulaHistoryModel import FormulaHistory


class FormulaHistoryService:

    @staticmethod
    def create_formula_entry(db: Session, 
                            formula: str, 
                            molar_mass: float, 
                            user_ip: Optional[str] = None, 
                            properties: Optional[dict] = None) -> FormulaHistory:
        # Create the base object with required fields
        db_formula = FormulaHistory(
            formula=formula,
            molar_mass=molar_mass,
            user_ip=user_ip
        )
        
        # Add additional properties if available
        if properties:
            # Physical properties
            if "boiling_point" in properties:
                db_formula.boiling_point = properties["boiling_point"]
            if "melting_point" in properties:
                db_formula.melting_point = properties["melting_point"]
            if "density" in properties:
                db_formula.density = properties["density"]
            if "state_at_room_temp" in properties:
                db_formula.state_at_room_temp = properties["state_at_room_temp"]
            if "flash_point" in properties:
                db_formula.flash_point = properties["flash_point"]
            
            # Chemical identifiers
            if "iupac_name" in properties:
                db_formula.iupac_name = properties["iupac_name"]
            if "common_name" in properties:
                db_formula.common_name = properties["common_name"]
            if "synonyms" in properties:
                db_formula.synonyms = properties["synonyms"]
            if "smiles" in properties:
                db_formula.smiles = properties["smiles"]
            
            # Hazard information
            if "hazard_classification" in properties:
                db_formula.hazard_classification = properties["hazard_classification"]
            if "hazard_statements" in properties:
                db_formula.hazard_statements = properties["hazard_statements"]
            if "precautionary_statements" in properties:
                db_formula.precautionary_statements = properties["precautionary_statements"]
            
            # Structural information
            if "structure_image_url" in properties:
                db_formula.structure_image_url = properties["structure_image_url"]
            if "structure_image_svg_url" in properties:
                db_formula.structure_image_svg_url = properties["structure_image_svg_url"]
            if "structure_3d_url" in properties:
                db_formula.structure_3d_url = properties["structure_3d_url"]
            if "crystal_structure" in properties:
                db_formula.crystal_structure = properties["crystal_structure"]
            
            # Additional information
            if "description" in properties:
                db_formula.description = properties["description"]
            if "compound_url" in properties:
                db_formula.compound_url = properties["compound_url"]
        
        db.add(db_formula)
        db.commit()
        db.refresh(db_formula)
        return db_formula
    

    @staticmethod
    def get_recent_formulas(db: Session, limit: int = 10) -> List[FormulaHistory]:
        return db.query(FormulaHistory).order_by(FormulaHistory.timestamp.desc()).limit(limit).all()
    
    @staticmethod
    def get_formula_history(db: Session, 
                        skip: int = 0, 
                        limit: int = 100) -> List[FormulaHistory]:
        return db.query(FormulaHistory).order_by(FormulaHistory.timestamp.desc()).offset(skip).limit(limit).all()
    
    @staticmethod
    def update_formula_entry(db: Session, formula_id: int, updated_data: dict) -> FormulaHistory:
        db_formula = db.query(FormulaHistory).filter(FormulaHistory.id == formula_id).first()
        
        if not db_formula:
            return None
            
        # Update fields that are present in the request
        for key, value in updated_data.items():
            if hasattr(db_formula, key):
                setattr(db_formula, key, value)
                
        db.commit()
        db.refresh(db_formula)
        return db_formula
        
    @staticmethod
    def delete_formula_entry(db: Session, formula_id: int) -> bool:
        db_formula = db.query(FormulaHistory).filter(FormulaHistory.id == formula_id).first()
        
        if not db_formula:
            return False
            
        db.delete(db_formula)
        db.commit()
        return True
        
    @staticmethod
    def get_formula_by_id(db: Session, formula_id: int) -> FormulaHistory:
        return db.query(FormulaHistory).filter(FormulaHistory.id == formula_id).first()