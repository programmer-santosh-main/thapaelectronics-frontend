import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
  // store token
  localStorage.setItem("token", token);

  // force full reload to home page
  window.location.href = "/";
} else {
  navigate("/login");
}

  }, [navigate]);

  return <p>Signing you in...</p>;
}
