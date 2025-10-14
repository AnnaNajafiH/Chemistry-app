import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to Chemistry App</h1>
          <p className="lead mb-5">
            Calculate molecular weights, explore chemical compounds, and understand their properties.
          </p>
          
          <div className="row g-4 py-3">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Calculate Formula</h5>
                  <p className="card-text">
                    Enter a chemical formula to calculate its molecular weight and composition.
                  </p>
                  <Link to="/formula" className="btn btn-primary">
                    Calculate Now
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Formula History</h5>
                  <p className="card-text">
                    View your previous calculations and their results.
                  </p>
                  <Link to="/history" className="btn btn-outline-primary">
                    View History
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 pt-3">
            <h4>Features</h4>
            <ul className="list-group list-group-flush text-start">
              <li className="list-group-item">Calculate molecular weights</li>
              <li className="list-group-item">View compound information from PubChem</li>
              <li className="list-group-item">See detailed element composition</li>
              <li className="list-group-item">Track formula calculation history</li>
              <li className="list-group-item">View compound hazards and properties</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};