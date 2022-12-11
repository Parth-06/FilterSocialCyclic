import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, seteye] = useState(false);
  const [passType, setpassType] = useState("Password");
  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("invalid");
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      navigate("/");
    }
  };

  const guestuser = async (e) => {
    e.preventDefault();
    const Eval = "trial@gmail.com";
    setEmail(Eval);
    const Pass = "password@123";
    setPassword(Pass);

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: Eval,
        password: Pass,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("invalid");
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      navigate("/");
    }
  };

  const eyeopener = () => {
    seteye(true);
    setpassType("text");
  };
  const eyecloser = () => {
    seteye(false);
    setpassType("Password");
  };
  return (
    <>
      <div className="regi_main">
        <div className="regi">
          <div className="regi_name" style={{ marginBottom: "30px" }}>
            <h1>Login</h1>
          </div>
          <form className="regi_form" method="POST">
            <div className="regi_in">
              <input
                type="email"
                placeholder="Email"
                className="regi_input"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                maxLength="18"
              />
            </div>
            <div className="regi_in">
              <input
                type={passType}
                placeholder="Password"
                className="regi_input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                minLength="8"
                maxLength="15"
              />
              {eye === true && password !== "" ? (
                <i className="fas fa-eye-slash" onClick={eyecloser}></i>
              ) : eye === false && password !== "" ? (
                <i className="fas fa-eye" onClick={eyeopener}></i>
              ) : (
                <></>
              )}
            </div>
          </form>
          <div className="regi_button">
            <button className="regi_button_test" onClick={guestuser}>
              {" "}
              Guest Login
            </button>
            <button className="regi_button_main" onClick={loginuser}>
              {" "}
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
