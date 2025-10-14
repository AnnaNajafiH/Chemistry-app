import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-brand">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-warning">Chem</span>Ion
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/formula">
                Calculate Formula
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/history">
                Formula History
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
