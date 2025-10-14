import { Link } from 'react-router-dom';
import type { FormulaResult } from '../../types/types';

interface FormulaHistoryItemProps {
  item: FormulaResult;
}

export const FormulaHistoryItem = ({ item }: FormulaHistoryItemProps) => {
  // Validate item has the minimum required data
  if (!item || !item.formula) {
    return null; // Skip rendering invalid items
  }

  // Format date if timestamp exists
  const formattedDate = item.timestamp 
    ? new Date(item.timestamp).toLocaleString() 
    : 'Unknown date';
  
  // Only show "View Details" button if the item has an id
  const hasDetails = typeof item.id === 'number' || typeof item.id === 'string';

  return (
    <div className="card formula-card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">{item.formula}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {item.name || 'Unknown compound'}
            </h6>
            <p className="card-text">
              <small className="text-muted">{formattedDate}</small>
            </p>
            
            {/* Show molecular weight if available */}
            {(item.molecular_weight || item.molar_mass) && (
              <p className="card-text">
                <small>
                  Molecular weight: {(item.molecular_weight || item.molar_mass).toFixed(4)} g/mol
                </small>
              </p>
            )}
          </div>
          <div>
            {hasDetails && (
              <Link 
                to={`/formula/${item.id}`} 
                className="btn btn-outline-primary btn-sm"
              >
                View Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};