import { useEffect, useState, useRef } from "react";
import "./VoiceAssistant.scss";

function VoiceAssistant() {
  const [status, setStatus] = useState("Loading Library...");
  const [statusClass, setStatusClass] = useState("status-box");
  const [isReady, setIsReady] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const deviceRef = useRef(null);

  useEffect(() => {
    // Check if Twilio SDK is loaded
    if (typeof window.Twilio === "undefined" && typeof Twilio === "undefined") {
      setStatus(
        "Error: Twilio SDK failed to load. Check ad-blocker or network."
      );
      setStatusClass("status-box status-error");
      return;
    }

    init();

    // Cleanup function
    return () => {
      if (deviceRef.current) {
        deviceRef.current.destroy();
        deviceRef.current = null;
      }
    };
  }, []);

  const init = async () => {
    try {
      setStatus("Fetching access token...");

      // Use environment variable for backend URL, or default to relative path
      const tokenUrl = "https://971d5414c6b6.ngrok-free.app/token";
      const response = await fetch(tokenUrl, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Backend error (${response.status}): ${response.statusText}. Please ensure your backend server is running and has a /token endpoint.`
        );
      }

      // Check content type to ensure we're getting JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        // Check for ngrok warning page
        if (text.includes("ngrok") && text.includes("ERR_NGROK")) {
          throw new Error(
            "Ngrok warning page detected. Please visit the ngrok URL once in your browser to trust it, or ensure your backend server is properly configured."
          );
        }
        // If it's HTML, it's likely a 404 page or ngrok warning
        if (
          text.trim().startsWith("<!DOCTYPE") ||
          text.trim().startsWith("<html")
        ) {
          throw new Error(
            "Token endpoint not found. The /token endpoint is returning HTML instead of JSON. Please configure your backend server with a /token endpoint that returns a Twilio access token."
          );
        }
        throw new Error(
          `Unexpected response type: ${contentType}. Expected JSON.`
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.token) {
        throw new Error(
          "Token not found in response. Please ensure your backend returns { token: '...' }"
        );
      }

      setStatus("Initializing...");

      // Initialize Device - use window.Twilio or global Twilio
      const TwilioSDK = window.Twilio || Twilio;
      const device = new TwilioSDK.Device(data.token, {
        codecPreferences: ["opus", "pcmu"],
        fakeLocalDTMF: true,
        enableRingingState: true,
      });

      deviceRef.current = device;
      setupListeners(device);
      device.register();
    } catch (err) {
      console.error("Voice Assistant Error:", err);
      setStatus("Setup Error: " + err.message);
      setStatusClass("status-box status-error");
    }
  };

  const setupListeners = (device) => {
    device.on("registered", () => {
      setStatus("Ready to call");
      setStatusClass("status-box status-ready");
      setIsReady(true);
    });

    device.on("error", (error) => {
      console.error("Twilio Error:", error);
      setStatus("Error: " + error.message);
      setStatusClass("status-box status-error");
    });

    device.on("connect", (conn) => {
      setStatus("Connected - Speak now");
      setStatusClass("status-box status-call");
      setIsCallActive(true);
    });

    device.on("disconnect", (conn) => {
      setStatus("Call Ended. Ready.");
      setStatusClass("status-box status-ready");
      setIsCallActive(false);
    });
  };

  const handleConnect = async () => {
    if (!deviceRef.current) return;
    try {
      await deviceRef.current.connect();
      setStatus("Calling...");
    } catch (err) {
      setStatus("Connection Failed: " + err.message);
      setStatusClass("status-box status-error");
    }
  };

  const handleDisconnect = () => {
    if (deviceRef.current) {
      deviceRef.current.disconnectAll();
    }
  };

  return (
    <div className="voice-assistant">
      <div className="voice-assistant__card">
        <h1 className="voice-assistant__title">Temple Assistant</h1>
        <p className="voice-assistant__subtitle">Web Voice Interface</p>

        <div className={statusClass}>{status}</div>

        {!isCallActive ? (
          <button
            id="btn-connect"
            className="voice-assistant__btn voice-assistant__btn--connect"
            onClick={handleConnect}
            disabled={!isReady}
          >
            Start Call
          </button>
        ) : (
          <button
            id="btn-disconnect"
            className="voice-assistant__btn voice-assistant__btn--disconnect"
            onClick={handleDisconnect}
          >
            End Call
          </button>
        )}
      </div>
    </div>
  );
}

export default VoiceAssistant;
