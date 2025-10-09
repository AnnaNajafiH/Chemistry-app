from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class FormulaRequest(BaseModel):
    formula: str


class FormulaData(BaseModel):
    formula:str
    molar_mass: float
    boiling_point: Optional[str] = None   
    melting_point: Optional[str] = None
    density: Optional[str] = None
    flash_point: Optional[str] = None
    state_at_room_temp: Optional[str] = None
    iupac_name: Optional[str] = None
    hazard_classification: Optional[str] = None
    structure_image_url: Optional[str] = None
    structure_image_svg_url: Optional[str] = None
    compound_url: Optional[str] = None


class FormulaResponse(FormulaData):
    unit: str = "g/mol"


class FormulaHistoryModel(FormulaData):
    id: int
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }