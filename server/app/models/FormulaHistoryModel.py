from sqlalchemy import Column, Integer, String, Float, DateTime, func, Text
from app.config.database_config import Base


class FormulaHistory(Base):
    __tablename__ = "formulas"

    id = Column(Integer, primary_key=True, index=True)
    formula = Column(String(100), index=True)
    molar_mass = Column(Float)
    timestamp = Column(DateTime, default=func.now())
    user_ip = Column(String(45), nullable=True)  # IPv6 addresses can be long
    
    # Physical properties
    boiling_point = Column(String(100), nullable=True)
    melting_point = Column(String(100), nullable=True)
    flash_point = Column(String(100), nullable=True)
    density = Column(String(100), nullable=True)
    state_at_room_temp = Column(String(50), nullable=True)
    
    # Chemical identifiers
    iupac_name = Column(String(255), nullable=True)
    common_name = Column(String(255), nullable=True)
    synonyms = Column(Text, nullable=True)  # Store as JSON string or comma-separated values
    smiles = Column(String(500), nullable=True)  # SMILES notation for molecular structure
    
    # Hazard information
    hazard_classification = Column(String(255), nullable=True)
    hazard_statements = Column(Text, nullable=True)  # GHS hazard statements
    precautionary_statements = Column(Text, nullable=True)  # GHS precautionary statements
    
    # Structural information
    structure_image_url = Column(String(255), nullable=True)  # 2D structure
    structure_image_svg_url = Column(String(255), nullable=True)  # 2D structure as SVG
    structure_3d_url = Column(String(255), nullable=True)  # URL to 3D structure model
    crystal_structure = Column(String(255), nullable=True)  # Crystal system/structure type
    
    # Additional information
    description = Column(Text, nullable=True)  # General description of the compound
    compound_url = Column(String(255), nullable=True)  # Reference URL
    