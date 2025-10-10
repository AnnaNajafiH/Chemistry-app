import requests
import logging
from typing import Dict, Any


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PubChemService:
    BASE_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug"

    @classmethod
    def get_chemical_properties(cls, formula: str) -> Dict[str, Any]:
        try:
            # Step 1: Try to get the CID (PubChem Compound ID) based on the formula
            cid_url = f"{cls.BASE_URL}/compound/name/{formula}/cids/JSON"
            
            logger.info(f"Requesting CID for formula: {formula}")
            response = requests.get(cid_url, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if "IdentifierList" not in data or "CID" not in data["IdentifierList"] or not data["IdentifierList"]["CID"]:
                logger.warning(f"No compound ID found for formula: {formula}")
                return {}
                
            cid = data["IdentifierList"]["CID"][0]
            logger.info(f"Found CID {cid} for formula: {formula}")
            
            # Step 2: Fetch properties using the CID
            properties = cls._fetch_properties_by_cid(cid)
            
            # Step 3: Add image URLs
            properties["structure_image_url"] = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/PNG"
            properties["structure_image_svg_url"] = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/SVG"
            properties["compound_url"] = f"https://pubchem.ncbi.nlm.nih.gov/compound/{cid}"
            
            return properties
            
        except Exception as e:
            logger.error(f"Error fetching compound properties for formula '{formula}': {str(e)}")
            return {}


    @classmethod
    def _fetch_properties_by_cid(cls, cid: int) -> Dict[str, Any]:
        try:
            # Request basic properties - added more properties
            props_url = f"{cls.BASE_URL}/compound/cid/{cid}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,Complexity,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,ExactMass,MonoisotopicMass,TPSA,HeavyAtomCount,AtomChiralCount,BondChiralCount/JSON"
            
            logger.info(f"Requesting properties for CID: {cid}")
            response = requests.get(props_url, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            if "PropertyTable" not in data or "Properties" not in data["PropertyTable"] or not data["PropertyTable"]["Properties"]:
                logger.warning(f"No properties found for CID: {cid}")
                return {}
                
            prop_data = data["PropertyTable"]["Properties"][0]
            
            # Try to get physical and chemical properties
            physchem_props = cls._fetch_physical_properties(cid)
            
            # Combine the data
            combined_properties = {
                "formula": prop_data.get("MolecularFormula", ""),
                "molar_mass": float(prop_data.get("MolecularWeight", 0)),
                "iupac_name": prop_data.get("IUPACName", ""),
                "smiles": prop_data.get("CanonicalSMILES", ""),
                "structure_3d_url": f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/{cid}/record/3d/JSON",
                **physchem_props
            }
            
            return combined_properties
            
        except Exception as e:
            logger.error(f"Error fetching properties for CID {cid}: {str(e)}")
            return {}
    
    @classmethod
    def _fetch_physical_properties(cls, cid: int) -> Dict[str, Any]:
        properties = {}
        
        try:
            # Get more detailed information from PubChem's Classification section
            classifications_url = f"{cls.BASE_URL}/compound/cid/{cid}/classification/JSON"
            
            logger.info(f"Requesting classification data for CID: {cid}")
            response = requests.get(classifications_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "Hierarchies" in data["Classification"]:
                    for hierarchy in data["Classification"]["Hierarchies"]:
                        if hierarchy.get("SourceName") == "Physical State" and hierarchy.get("Nodes"):
                            state = hierarchy["Nodes"][0].get("Information", {}).get("Name", "")
                            if state:
                                properties["state_at_room_temp"] = state
                        
                        # Try to find hazard classification
                        if hierarchy.get("SourceName") == "GHS Classification" and hierarchy.get("Nodes"):
                            hazards = []
                            hazard_statements = []
                            precautionary_statements = []
                            
                            for node in hierarchy["Nodes"]:
                                if node.get("Information", {}).get("Name"):
                                    hazards.append(node["Information"]["Name"])
                                    
                                    # Look for detailed hazard statements
                                    if "Description" in node.get("Information", {}):
                                        if "H" in node["Information"]["Description"]:
                                            hazard_statements.append(node["Information"]["Description"])
                                        if "P" in node["Information"]["Description"]:
                                            precautionary_statements.append(node["Information"]["Description"])
                            
                            if hazards:
                                properties["hazard_classification"] = ", ".join(hazards)
                            if hazard_statements:
                                properties["hazard_statements"] = "; ".join(hazard_statements)
                            if precautionary_statements:
                                properties["precautionary_statements"] = "; ".join(precautionary_statements)
            
            # Get synonyms
            synonyms_url = f"{cls.BASE_URL}/compound/cid/{cid}/synonyms/JSON"
            logger.info(f"Requesting synonyms for CID: {cid}")
            response = requests.get(synonyms_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "InformationList" in data and "Information" in data["InformationList"]:
                    info = data["InformationList"]["Information"][0]
                    if "Synonym" in info:
                        # Get the first 10 synonyms to avoid extremely long lists
                        synonyms = info["Synonym"][:10]
                        properties["synonyms"] = "; ".join(synonyms)
                        if synonyms:
                            properties["common_name"] = synonyms[0]  # Use first synonym as common name
            
            # Try to get crystal structure and description information
            description_url = f"{cls.BASE_URL}/compound/cid/{cid}/description/JSON"
            logger.info(f"Requesting description for CID: {cid}")
            response = requests.get(description_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "InformationList" in data and "Information" in data["InformationList"]:
                    for info in data["InformationList"]["Information"]:
                        if "Description" in info:
                            # Get the first description as the main description
                            properties["description"] = info["Description"]
                            break
            
            # Get more detailed properties from PubChem's Sections
            sections_url = f"{cls.BASE_URL}/compound/cid/{cid}/sections/JSON"
            logger.info(f"Requesting sections data for CID: {cid}")
            response = requests.get(sections_url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "Sections" in data:
                    # Look for the section with experimental properties
                    section_ids = []
                    for section in data["Sections"]:
                        if "Experimental Properties" in section.get("TOCHeading", ""):
                            section_ids.append(section.get("Section"))
            
            # If we found relevant sections, fetch them
            if section_ids:
                # Fetch the experimental properties section
                for section_id in section_ids:
                    section_url = f"{cls.BASE_URL}/compound/cid/{cid}/section/{section_id}/JSON"
                    logger.info(f"Requesting section {section_id} for CID: {cid}")
                    response = requests.get(section_url, timeout=10)
                    
                    if response.status_code == 200:
                        section_data = response.json()
                        if "Section" in section_data and section_data["Section"].get("Information"):
                            for info in section_data["Section"]["Information"]:
                                if info.get("Value") and info.get("Value").get("StringWithMarkup"):
                                    name = info.get("Name", "").lower()
                                    value = info["Value"]["StringWithMarkup"][0].get("String", "")
                                    
                                    if "boiling point" in name and not properties.get("boiling_point"):
                                        properties["boiling_point"] = value
                                    elif "melting point" in name and not properties.get("melting_point"):
                                        properties["melting_point"] = value
                                    elif "density" in name and not properties.get("density"):
                                        properties["density"] = value
                                    elif "flash point" in name and not properties.get("flash_point"):
                                        properties["flash_point"] = value
                                    elif "crystal" in name and not properties.get("crystal_structure"):
                                        properties["crystal_structure"] = value
                
        except Exception as e:
            logger.error(f"Error fetching physical properties for CID {cid}: {str(e)}")
        
        return properties