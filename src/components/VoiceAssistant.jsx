import { useEffect, useState, useRef } from "react";
import "./VoiceAssistant.scss";
import voice from "../assets/voice.mp4";

function VoiceAssistant() {
  const [status, setStatus] = useState("Loading Library...");
  const [statusClass, setStatusClass] = useState("status-box");
  const [isReady, setIsReady] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const deviceRef = useRef(null);
  const videoRef = useRef(null);

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
      const tokenUrl =
        "https://unremoved-azzie-unaccommodating.ngrok-free.dev/token";
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
      // Play video when call connects
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err);
        });
      }
    });

    device.on("disconnect", (conn) => {
      setStatus("Call Ended. Ready.");
      setStatusClass("status-box status-ready");
      setIsCallActive(false);
      // Pause video when call disconnects
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    });
  };

  const handleConnect = async () => {
    if (!deviceRef.current) return;
    try {
      await deviceRef.current.connect();
      setStatus("Speak now");
      setIsCallActive(true);
    } catch (err) {
      setStatus("Connection Failed: " + err.message);
      setStatusClass("status-box status-error");
    }
  };

  const handleDisconnect = () => {
    if (deviceRef.current) {
      deviceRef.current.disconnectAll();
      setIsCallActive(false);
    }
    // Pause video when manually disconnecting
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="voice-assistant">
      <div className="voice-assistant__background">
        <div className="voice-assistant__gradient"></div>
        <div className="voice-assistant__particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="voice-assistant__particle"
              style={{
                left: `${(i * 5) % 100}%`,
                animationDelay: `${-i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="voice-assistant__container">
        <div className="voice-assistant__content">
          <div className="voice-assistant__header">
            <h1 className="voice-assistant__title">Temple Assistant</h1>
            <p className="voice-assistant__subtitle">Web Voice Interface</p>
          </div>

          <div className="voice-assistant__visual">
            {isCallActive ? (
              <div className="voice-assistant__video-container">
                <video
                  ref={videoRef}
                  className="voice-assistant__video"
                  loop
                  muted
                  playsInline
                  autoPlay
                >
                  <source src={voice} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="voice-assistant__call-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.84 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.76 21 21 20.37 21 19.83V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>

          {isCallActive && (
            <div className={statusClass}>
              <span className="voice-assistant__status-text">{status}</span>
            </div>
          )}

          <div className="voice-assistant__controls">
            {!isCallActive ? (
              <button
                id="btn-connect"
                className="voice-assistant__btn voice-assistant__btn--connect"
                onClick={handleConnect}
                disabled={!isReady}
              >
                <span className="voice-assistant__btn-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.84 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.76 21 21 20.37 21 19.83V16.37C21 15.83 20.55 15.38 20.01 15.38Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>Start Call</span>
              </button>
            ) : (
              <button
                id="btn-disconnect"
                className="voice-assistant__btn voice-assistant__btn--disconnect"
                onClick={handleDisconnect}
              >
                <span className="voice-assistant__btn-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9ZM19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>End Call</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceAssistant;
