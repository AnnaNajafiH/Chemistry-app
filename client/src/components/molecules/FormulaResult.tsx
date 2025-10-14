import type { FormulaResult as FormulaResultType } from '../../types/types';

interface FormulaResultProps {
  result: FormulaResultType;
}

export const FormulaResult = ({ result }: FormulaResultProps) => {
  // Check if the result has the minimum required data
  if (!result || !result.formula) {
    throw new Error("Invalid formula result data: Missing formula");
  }
  
  // Format the elements for display
  const formatElements = () => {
    // Check if elements property exists and is in the expected format
    if (!result.elements || typeof result.elements !== 'object') {
      return <p className="text-muted">No element information available</p>;
    }
    
    // Ensure result.elements is treated as a record of string to number
    return Object.entries(result.elements).map(([element, count]) => (
      <div className="chemical-element" key={element}>
        <div className="symbol">{element}</div>
        <div className="name">Count: {count}</div>
      </div>
    ));
  };

  // Format the formula with subscripts for display
  const formatFormula = (formula: string) => {
    // This is a simple approach - a more comprehensive solution would use a library or regex
    return formula.split('').map((char, index) => {
      if (!isNaN(Number(char))) {
        return <sub key={index}>{char}</sub>;
      }
      return <span key={index}>{char}</span>;
    });
  };

  return (
    <div className="card formula-card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Formula Result</h5>
      </div>
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-6">
            <h6 className="card-subtitle mb-2 text-muted">Formula</h6>
            <p className="formula-display">{formatFormula(result.formula || '')}</p>
          </div>
          <div className="col-md-6">
            <h6 className="card-subtitle mb-2 text-muted">Molecular Weight</h6>
            <p className="h3">
              {/* Handle both molecular_weight and molar_mass property names */}
              {(() => {
                const weight = result.molecular_weight || result.molar_mass;
                if (weight === undefined || weight === null) return 'N/A';
                if (typeof weight === 'number') return weight.toFixed(4);
                return weight;
              })()} {result.unit || 'g/mol'}
            </p>
          </div>
        </div>
        
        {result.name && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">Compound Name</h6>
            <p>{result.name}</p>
          </div>
        )}
        
        {result.iupac_name && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">IUPAC Name</h6>
            <p>{result.iupac_name}</p>
          </div>
        )}
        
        {result.description && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">Description</h6>
            <p>{result.description}</p>
          </div>
        )}
        
        {result.synonyms && result.synonyms.length > 0 && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">Synonyms</h6>
            <p>{result.synonyms.join(", ")}</p>
          </div>
        )}
        
        {result.hazards && result.hazards.length > 0 && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">Hazards</h6>
            <div className="alert alert-warning">
              <ul className="mb-0">
                {result.hazards.map((hazard, index) => (
                  <li key={index}>{hazard}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {result.elements && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">Elements</h6>
            <div className="d-flex flex-wrap">
              {formatElements()}
            </div>
          </div>
        )}
        
        {result.structure_2d && (
          <div className="mb-3">
            <h6 className="card-subtitle mb-2 text-muted">2D Structure</h6>
            <img 
              src={result.structure_2d} 
              alt={`2D Structure of ${result.formula || 'compound'}`}
              className="img-fluid border rounded"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};