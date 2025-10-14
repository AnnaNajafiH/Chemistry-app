import { useEffect, useState } from 'react';
import { FormulaHistoryItem } from '../../components/molecules/FormulaHistoryItem';
import { useFormula } from '../../hooks/useFormula';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';

export const FormulaHistoryPage = () => {
  const { formulaHistory, historyLoading, fetchFormulaHistory } = useFormula();
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);

  // Fetch formula history only if we don't have any data
  useEffect(() => {
    if (!initialLoadComplete && formulaHistory.length === 0 && !historyLoading) {
      fetchFormulaHistory().finally(() => setInitialLoadComplete(true));
    } else {
      setInitialLoadComplete(true);
    }
  }, [fetchFormulaHistory, formulaHistory.length, historyLoading, initialLoadComplete]);

  return (
    <div>
      <h2>Formula History</h2>
      <p className="text-muted mb-4">
        View your previously calculated chemical formulas.
      </p>
      
      {!initialLoadComplete && historyLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : formulaHistory.length === 0 ? (
        <div className="alert alert-info">
          <p className="mb-0">No formula calculations found. Try calculating a new formula!</p>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            {/* Use ErrorBoundary to catch any errors in FormulaHistoryItem */}
            <ErrorBoundary>
              {formulaHistory.map((item) => (
                <FormulaHistoryItem key={item.id || Math.random()} item={item} />
              ))}
            </ErrorBoundary>
          </div>
        </div>
      )}
      
      {/* Show a refresh button when there are items */}
      {initialLoadComplete && formulaHistory.length > 0 && (
        <div className="text-center mt-4">
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => fetchFormulaHistory()}
            disabled={historyLoading}
          >
            {historyLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Refreshing...
              </>
            ) : (
              'Refresh History'
            )}
          </button>
        </div>
      )}
    </div>
  );
};