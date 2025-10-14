import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormula } from '../hooks/useFormula';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { LoadingSpinner } from '../components/common/LoadingSpinner'

interface FormulaDetailParams {
  id: string;
  [key: string]: string | undefined;
}

export const FormulaDetailPage = () => {
  const { id } = useParams<FormulaDetailParams>();
  const { getFormulaById } = useFormula();
  const [formula, setFormula] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFormulaDetails = async () => {
      try {
        if (!id) {
          throw new Error('No formula ID provided');
        }
        
        setLoading(true);
        const formulaData = await getFormulaById(id);
        
        if (!formulaData) {
          throw new Error('Formula not found');
        }
        
        setFormula(formulaData);
        setError(null);
      } catch (err) {
        console.error('Error loading formula details:', err);
        setError(err instanceof Error ? err.message : 'Failed to load formula details');
      } finally {
        setLoading(false);
      }
    };

    loadFormulaDetails();
  }, [id, getFormulaById]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body text-center">
                <LoadingSpinner />
                <p className="mt-3">Loading formula details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger">
              <h4>Error</h4>
              <p>{error}</p>
              <Link to="/history" className="btn btn-primary">
                Back to History
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div className="alert alert-danger">There was an error displaying formula details.</div>}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Formula Details</h3>
                <Link to="/history" className="btn btn-sm btn-light">
                  Back to History
                </Link>
              </div>
              <div className="card-body">
                {formula && (
                  <>
                    <h2 className="card-title">{formula.formula}</h2>
                    {formula.name && (
                      <h4 className="card-subtitle mb-3 text-muted">
                        {formula.name}
                      </h4>
                    )}
                    
                    <hr />
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <h5>Molecular Information</h5>
                        <ul className="list-group">
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            Molecular Weight
                            <span className="badge bg-primary rounded-pill">
                              {(formula.molecular_weight || formula.molar_mass || 0).toFixed(4)} g/mol
                            </span>
                          </li>
                          {formula.elements && (
                            <li className="list-group-item">
                              <strong>Elements:</strong> {Object.entries(formula.elements).map(([element, count]) => (
                                <span key={element} className="badge bg-secondary me-1">{element}: {count}</span>
                              ))}
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="col-md-6 mb-3">
                        <h5>Additional Information</h5>
                        <ul className="list-group">
                          {formula.timestamp && (
                            <li className="list-group-item">
                              <strong>Calculated on:</strong> {new Date(formula.timestamp).toLocaleString()}
                            </li>
                          )}
                          {formula.pubchem_url && (
                            <li className="list-group-item">
                              <strong>PubChem:</strong> <a href={formula.pubchem_url} target="_blank" rel="noopener noreferrer">View on PubChem</a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {formula.properties && Object.keys(formula.properties).length > 0 && (
                      <>
                        <h5 className="mt-4">Chemical Properties</h5>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Property</th>
                                <th>Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(formula.properties).map(([key, value]) => (
                                <tr key={key}>
                                  <td>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                                  <td>{String(value)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    <div className="mt-4">
                      <Link to={`/`} className="btn btn-secondary me-2">
                        New Calculation
                      </Link>
                      <Link to={`/history`} className="btn btn-primary">
                        View History
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default FormulaDetailPage;