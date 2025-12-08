import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessFormPage from "./pages/BusinessFormPage";
import VoiceAssistantPage from "./pages/VoiceAssistantPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-form" element={<BusinessFormPage />} />
          <Route path="/voice-assistant" element={<VoiceAssistantPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
