import BusinessForm from "../components/BusinessForm";
import { Link } from "react-router-dom";
import "./BusinessFormPage.scss";

function BusinessFormPage() {
  return (
    <div className="business-form-page">
      <header className="business-form-page__header">
        <div className="business-form-page__header-content">
          <Link to="/" className="business-form-page__back-link">
            ← Back to Home
          </Link>
          <h1 className="business-form-page__title">Business Registration</h1>
        </div>
      </header>

      <main className="business-form-page__main">
        <BusinessForm />
      </main>
    </div>
  );
}

export default BusinessFormPage;
