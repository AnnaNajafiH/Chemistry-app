import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL, ROUTES } from '../../constants/api';
import { FormulaResult } from '../../components/molecules/FormulaResult';
import type { FormulaResult as FormulaResultType } from '../../types/types';

export const FormulaDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [formula, setFormula] = useState<FormulaResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormula = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}${ROUTES.FORMULA_HISTORY}/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch formula details');
        }
        
        const data = await response.json();
        setFormula(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFormula();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <hr />
        <Link to="/history" className="btn btn-outline-danger">
          Return to Formula History
        </Link>
      </div>
    );
  }

  if (!formula) {
    return (
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Formula Not Found</h4>
        <p>The formula you're looking for could not be found.</p>
        <hr />
        <Link to="/history" className="btn btn-outline-warning">
          Return to Formula History
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Formula Details</h2>
        <Link to="/history" className="btn btn-outline-primary">
          Back to History
        </Link>
      </div>
      
      <FormulaResult result={formula} />
    </div>
  );
};