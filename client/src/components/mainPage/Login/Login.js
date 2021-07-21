import React, { useState } from "react";
import Slider from "../SliderCarousel/Slider";
import Dell from "../../../image/dell-1.svg";
import Google from "../../../image/google-logo-24.png";
import Facebook from "../../../image/facebook-logo-24.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUsers] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="container-login">
      <div className="login">
        <div className="slider">
          <Slider />
        </div>
        <div className="login-content">
          <img src={Dell} alt="" />
          <div className="content">
            <h1>Bienvenido de vuelta</h1>
            <form onSubmit={onSubmit}>
              <div className="rows">
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  placeholder="Ingresa tu email"
                  name="email"
                  value={user.email}
                  onChange={onInputChange}
                />
              </div>
              <div className="rows">
                <div className="password-content">
                  <label htmlFor="Contraseña">Contraseña</label>
                  <span>¿Olvidate tu contraseña?</span>
                </div>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  value={user.password}
                  onChange={onInputChange}
                />
              </div>
              <div className="buttons">
                <div className="modal-container">
                  <button type="submit" className="iniciar-sesion">
                    Iniciar Sesion
                  </button>
                </div>
                <span>O inicia sesion con</span>
                <div className="btn-accounts">
                  <button>
                    <img className="png-button" src={Google} alt="Google" />
                    &nbsp;Google
                  </button>
                  <button>
                    <img className="png-button" src={Facebook} alt="Facebook" />
                    &nbsp;Facebook
                  </button>
                </div>
              </div>
            </form>
          </div>
          <strong className="signup">
            ¿Todavia no tenes una cuenta?&nbsp;
            <Link to="/register">Crea una ahora</Link>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Login;
