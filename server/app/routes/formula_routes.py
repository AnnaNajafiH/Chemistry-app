
from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.config.database_config import get_db
from app.controllers.formula_controller import FormulaController
from app.schemas.schemas import FormulaRequest, FormulaResponse, FormulaHistoryModel

router = APIRouter(tags=["formulas"], prefix="/api")

# Create controller instance
formula_controller = FormulaController()


@router.post("/calculate", response_model=FormulaResponse)
def calculate_formula(formula_req: FormulaRequest, request: Request, db: Session = Depends(get_db)):
    return formula_controller.calculate_formula(
        formula=formula_req.formula, 
        request=request,
        db=db
    )


@router.get("/recent", response_model=List[FormulaHistoryModel])
def get_recent_formulas(db: Session = Depends(get_db)):
    return formula_controller.get_recent_formulas(db)


@router.get("/history", response_model=List[FormulaHistoryModel])
def get_formula_history(db: Session = Depends(get_db), skip: int = 0, limit: int = 10):
    return formula_controller.get_formula_history(db, skip, limit)