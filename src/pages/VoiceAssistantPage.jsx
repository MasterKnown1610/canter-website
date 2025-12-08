import VoiceAssistant from "../components/VoiceAssistant";
import Header from "../components/Header";
import Footer from "../components/Footer";

function VoiceAssistantPage() {
  return (
    <>
      <Header />
      <main className="main-content">
        <VoiceAssistant />
      </main>
      <Footer />
    </>
  );
}

export default VoiceAssistantPage;
