/* to register users*/
import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const Register = (props) => {

  const fetchLogin = async (name, email, password, userAdmin) => {
    const response = await fetch("http://localhost:5000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        userAdmin: userAdmin,
      }),
    });
    const data = await response.json();
    localStorage.setItem("MyToken", data.token);
    props.setUser(data.name);
    props.setUserAdmin(data.userAdmin);
    props.setShowPop(false);    
    props.setShowPopReg(false);
  };

  const RegisterUser = (e) => {
    e.preventDefault();
    fetchLogin(props.name, props.email, props.password, props.userAdmin);
  };

  return (
    <div className="form-login">
      <form onSubmit={RegisterUser}>
        <HighlightOffIcon
          className="close-icon"
          onClick={() => props.setShowPopReg(false)}
        />

        <label>name</label>
        <input
          required
          onChange={(e) => {props.setName(e.target.value)}}
          value={props.name}
        />
        <br />
        <label>email</label>
        <input
          required
          onChange={(e) => {props.setEmail(e.target.value)}}
          value={props.email}
        />
        <br />
        <label>password</label>
        <input
          required
          type="password"
          onChange={(e) => {props.setPassword(e.target.value)}}
          value={props.password}
        />

        <br />        
        <label>admin</label>
        <input          
          type="checkbox"
          onChange={(e) => {props.setUserAdmin(e.target.checked)}}
          value={props.userAdmin}
        />

        <br />
        <button type="submit" className="btt-login">
        Register
        </button>
      </form>
    </div>
  );
};

export default Register;
