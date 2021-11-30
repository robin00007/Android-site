import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "../styles/css/auth.css";

import loginPage from "../styles/images/loginPage.svg";
import mail from "../styles/images/mail.svg";
import lock from "../styles/images/lock.svg";

const Auth = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const firebaseConfig = {
    apiKey: "AIzaSyCEJxGq1DKGsb0eBuoc2jeZ2yL3NpBAg_Y",
    authDomain: "login-9cc04.firebaseapp.com",
    projectId: "login-9cc04",
    storageBucket: "login-9cc04.appspot.com",
    messagingSenderId: "410391250548",
    appId: "1:410391250548:web:0a9672719b7d84a91a3321",
  };
  const Fire = firebase.initializeApp(firebaseConfig);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    Fire.auth().signOut();
  };

  const authListener = () => {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => authListener());

  return (
    <div className="editor">
      <div className="loginContainer">
        <div className="sign-in-card">
          <form>
            <h1>{hasAccount ? "Log In" : "Sign Up"}</h1>
            <br/>

            <div>
              Email Address:
              <div className="inputContainer">
                <img src={mail} alt=""/>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter Email ID"
                  required
                />
              </div>
            </div>

            <div>
              Password:
              <div className="inputContainer">
                <img src={lock} alt="" />
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>

            <div>
              {hasAccount ? (
                <>
                  <button className="loginSubmitButton" onClick={handleLogin}>
                    Log In
                  </button>
                  <div className="hr"/>
                  <p style={{
                      backgroundColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Don't have an account?
                    <span style={{paddingLeft: "4px", textDecoration: "underline"}} onClick={() => setHasAccount(false)}>
                      Sign Up
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button className="loginSubmitButton" onClick={handleSignUp}>
                    Sign Up
                  </button>
                  <div className="hr"></div>
                  <p
                    style={{
                      backgroundColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Have a account?
                    <span style={{paddingLeft: "4px", textDecoration: "underline"}} onClick={() => setHasAccount(true)}>
                      Log In
                    </span>
                  </p>
                </>
              )}
            </div>
            {/* <button onClick={""} className="loginSubmitButton">
               
            </button> */}
            <div style={{ color: "red", fontSize: "18px" }}>
              {passwordError}
            </div>
            <div style={{ color: "red", fontSize: "18px" }}>{emailError}</div>
            <br />
            <br />
          </form>
        </div>

        <div className="loginImage">
          <img src={loginPage} alt="planningImage" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
