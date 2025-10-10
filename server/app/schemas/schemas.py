from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class FormulaRequest(BaseModel):
    formula: str


class FormulaData(BaseModel):
    formula: str
    molar_mass: float
    
    # Physical properties
    boiling_point: Optional[str] = None   
    melting_point: Optional[str] = None
    density: Optional[str] = None
    flash_point: Optional[str] = None
    state_at_room_temp: Optional[str] = None
    
    # Chemical identifiers
    iupac_name: Optional[str] = None
    common_name: Optional[str] = None
    synonyms: Optional[str] = None
    smiles: Optional[str] = None
    
    # Hazard information
    hazard_classification: Optional[str] = None
    hazard_statements: Optional[str] = None
    precautionary_statements: Optional[str] = None
    
    # Structural information
    structure_image_url: Optional[str] = None
    structure_image_svg_url: Optional[str] = None
    structure_3d_url: Optional[str] = None
    crystal_structure: Optional[str] = None
    
    # Additional information
    description: Optional[str] = None
    compound_url: Optional[str] = None


class FormulaResponse(FormulaData):
    unit: str = "g/mol"


class FormulaHistoryModel(FormulaData):
    id: int
    timestamp: datetime

    # allows creating model from an object, not just a dict
    model_config = {
        "from_attributes": True
    }