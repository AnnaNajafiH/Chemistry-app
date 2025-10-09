from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.config.database_config import get_db
from app.schemas.schemas import FormulaRequest, FormulaResponse, FormulaHistoryModel


router = APIRouter( tags=["Formulas"] , prefix="/api/formula")


@router.post("/calculate", response_model=FormulaResponse)
def calculate_formula(formula_req: FormulaRequest, request: Request, db: Session = Depends(get_db)):
    return formula_controller.calculate_formula(
        formula=formula_req.formula, 
        request=request,
        db=db
    )