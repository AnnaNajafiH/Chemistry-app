export interface FormulaResult {
  formula: string;
  molar_mass: number;
  unit: string;
  boiling_point?: string | null;
  melting_point?: string | null;
  flash_point?: string | null;
  density?: string | null;
  state_at_room_temp?: string | null;
  iupac_name?: string | null;
  common_name?: string | null;
  synonyms?: string | null;
  smiles?: string | null;
  hazard_classification?: string | null;
  hazard_statements?: string | null;
  precautionary_statements?: string | null;
  structure_image_url?: string | null;
  structure_image_svg_url?: string | null;
  structure_3d_url?: string | null;
  crystal_structure?: string | null;
  description?: string | null;
  compound_url?: string | null;
  error?: string;
}

    

export interface FormulaHistoryItem extends FormulaResult {
    timestamp: string;
}