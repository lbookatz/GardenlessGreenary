/* to register users*/
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const Login = (props) => {
  const fetchLogin = async (name, password) => {
    const response = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    const data = await response.json();
    if (data != null) {
      localStorage.setItem("MyToken", data.token);
      props.setUser(data.name);
      props.setUserAdmin(data.userAdmin);
      props.setShowPop(false);
      props.setShowPopReg(false);
    } else {
      alert("Username or password not recognised");
    }
  };

  const checkLogin = (e) => {
    e.preventDefault();
    fetchLogin(props.name, props.password);
  };

  const register = (e) => {
    props.setShowPopReg(true);
  };

  return (
    <div className="form-login">
      <form onSubmit={checkLogin}>
        <HighlightOffIcon
          className="close-icon"
          onClick={() => props.setShowPop(false)}
        />

        <label>name</label>
        <input
          required
          onChange={(e) => {
            props.setName(e.target.value);
          }}
          value={props.name}
        />
        <br />
        <label>password</label>
        <input
          required
          type="password"
          onChange={(e) => {
            props.setPassword(e.target.value);
          }}
          value={props.password}
        />

        <br />
        <button type="submit" className="btt-login">
          Login
        </button>
      </form>
      <button onClick={register} className="btt-reg">
        Register
      </button>
    </div>
  );
};

export default Login;
