import type { FormEvent } from 'react';
import { useFormula } from '../../hooks/useFormula';

export const FormulaInput = () => {
  const { formula, setFormula, calculateFormula, loading, error } = useFormula();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await calculateFormula();
  };
  
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Calculate Chemical Formula</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formula-input" className="form-label">Enter Chemical Formula</label>
            <div className="input-group">
              <input
                id="formula-input"
                type="text"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                placeholder="e.g. H2O, NaCl, C6H12O6"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading || !formula.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Calculating...
                  </>
                ) : (
                  'Calculate'
                )}
              </button>
            </div>
            {error && <div className="invalid-feedback d-block">{error}</div>}
          </div>
          <div className="form-text">
            Enter a chemical formula to calculate its molecular weight and composition.
          </div>
        </form>
      </div>
    </div>
  );
};