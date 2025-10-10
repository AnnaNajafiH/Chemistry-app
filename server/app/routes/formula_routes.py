from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.config.database_config import get_db
from app.controllers.formula_controller import FormulaController
from app.schemas.schemas import FormulaRequest, FormulaResponse, FormulaHistoryModel


router = APIRouter(prefix="/api/formula", tags=["Formula Operations"])


formula_controller = FormulaController()

#=====================================================================================

@router.post("/" , response_model=FormulaResponse)
def calculate_formula(
    formula_request: FormulaRequest,  #input json body
    request: Request,  #full HTTP request info(optional)
    db: Session = Depends(get_db)  #database session
    ):
    return formula_controller.calculate_formula(
        formula=formula_request.formula,
        request=request,
        db=db
    )
    
#=====================================================================================

@router.get("/recent", response_model=List[FormulaHistoryModel])
def get_recent_formulas(
    db: Session = Depends(get_db)
    ):
    return formula_controller.get_recent_formulas(
        db=db
    )
    
#=====================================================================================

@router.get("/history", response_model=List[FormulaHistoryModel])
def get_formula_history(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10
    ):
    return formula_controller.get_formula_history(
        db=db,
        skip=skip,
        limit=limit
    )
    
#=====================================================================================

@router.get("/{formula_id}", response_model=FormulaHistoryModel)
def get_formula_by_id(
    formula_id: int,
    db: Session = Depends(get_db)
    ):
    return formula_controller.get_formula_by_id(
        formula_id=formula_id,
        db=db
    )
    
#=====================================================================================

@router.put("/{formula_id}" , response_model=FormulaHistoryModel)
def update_formula(
    formula_id: int,
    formula_data: dict,
    db: Session = Depends(get_db)
    ):
    return formula_controller.update_formula(
        formula_id=formula_id,
        formula_data=formula_data,
        db=db
    )
    
#=====================================================================================

@router.delete("/{formula_id}")
def delete_formula(
    formula_id: int,
    db: Session = Depends(get_db)
    ):
    return formula_controller.delete_formula(
        formula_id=formula_id,
        db=db
    )