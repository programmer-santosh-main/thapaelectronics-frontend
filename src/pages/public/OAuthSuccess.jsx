import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // SAME token you already use after normal login
      localStorage.setItem("token", token);

      // Optional: clean URL
      window.history.replaceState({}, document.title, "/oauth-success");

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Signing you in...</p>;
}
