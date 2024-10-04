import React, { useState } from "react";
// import "../component/LoginPage.scss";
// import googleIcon from "../assets/images/google.png";
// import facebookIcon from "../assets/images/facebook.svg";
// import xIcon from "../assets/images/X.png";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const hangleLogin = () => {
    if (email === null || email === "") {
      setError("Please input a email, can not empty");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please input a valid email");
      return;
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="left-content">
          <div className="logo-name">
            <div className="logo"></div>
            <div className="name">Nishikigoi Nexus</div>
          </div>
        </div>
        <div className="right-content">
          <div className="login-form">
            <div className="login-form-title">Login</div>
            <div className="login-form-content">
              {error && (
                <div className="error-message" data-testid="error-message">
                  {error}
                </div>
              )}
              <div className="email">
                <div className="email-title">Email</div>
                <input
                  className="email-input"
                  data-testid="email-input"
                  type="text"
                  onChange={(e) => setEmail(e.currentTarget.value)} // Update state on input change
                  required
                />
              </div>
              <div className="password">
                <div className="password-title">Password</div>
                <input
                  className="password-input"
                  data-testid="password-input"
                  type="password"
                  required
                />
              </div>
              <div className="remember-and-forget">
                <div className="remember">
                  <input className="remember-checkbox" type="checkbox" />
                  <div className="remember-text">Keep me logged in</div>
                </div>
                <a className="forget-account" href="#">
                  Forgot username or password?
                </a>
              </div>
              <div className="login-and-signup">
                <button
                  className="login-btn"
                  data-testid="login-btn"
                  onClick={hangleLogin}
                >
                  Login
                </button>
                <div className="text-with-login">
                  Don’t have an account?{" "}
                  <a className="login" href="#">
                    Signup
                  </a>
                </div>
                <div className="or-line">
                  <hr className="left-line" /> or <hr className="right-line" />
                </div>
              </div>
              <div className="login-google">
                {/* <img className="google-icon" src={googleIcon} alt="Google" /> */}
                <div className="login-google-text">Continue with Google</div>
              </div>
              <div className="login-facebook">
                {/* <img
                  className="facebook-icon"
                  src={facebookIcon}
                  alt="Facebook"
                /> */}
                <div className="login-facebook-text">
                  Continue with Facebook
                </div>
              </div>
              <div className="login-X">
                {/* <img className="X-icon" src={xIcon} alt="X" /> */}
                <div className="login-X-text">Continue with X</div>
              </div>
            </div>
            <div className="note">
              By logging in to Nishikigoi Nexus, we confirm that you have
              carefully read, understood and agree to comply with our{" "}
              <a className="term-of-service" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="private-policy" href="#">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.+[\w]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export default LoginPage;
