import { useEffect } from 'react';
import { FormulaInput } from '../../components/form/FormulaInput';
import { FormulaResult } from '../../components/molecules/FormulaResult';
import { useFormula } from '../../hooks/useFormula';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';

export const FormulaPage = () => {
  const { formulaResult, fetchFormulaHistory, clearFormulaResult } = useFormula();

  // Fetch formula history when the component mounts
  useEffect(() => {
    fetchFormulaHistory();
  }, [fetchFormulaHistory]);

  return (
    <div>
      <div className="row mb-4">
        <div className="col">
          <h2>Chemical Formula Calculator</h2>
          <p className="text-muted">
            Enter a chemical formula to calculate molecular weight and view compound information.
          </p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-lg-12">
          <FormulaInput />
        </div>
      </div>
      
      {formulaResult && (
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-end mb-3">
              <button 
                className="btn btn-outline-secondary" 
                onClick={clearFormulaResult}
              >
                Clear Result
              </button>
            </div>
            <ErrorBoundary
              fallback={
                <div className="alert alert-warning">
                  <h4 className="alert-heading">Formula Display Error</h4>
                  <p>
                    There was a problem displaying the formula result. This might be due to 
                    unexpected data format from the server.
                  </p>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Try calculating a different formula or try again later.</p>
                    <button 
                      className="btn btn-outline-warning" 
                      onClick={clearFormulaResult}
                    >
                      Clear Result
                    </button>
                  </div>
                </div>
              }
            >
              <FormulaResult result={formulaResult} />
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  );
};