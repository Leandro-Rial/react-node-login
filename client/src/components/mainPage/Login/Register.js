import React, { useState } from "react";
import Slider from "../SliderCarousel/Slider";
import Dell from "../../../image/dell-1.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUsers] = useState({
    username: "",
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
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
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
                <label htmlFor="Usuario">Usuario</label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre de usuario"
                  name="username"
                  value={user.username}
                  onChange={onInputChange}
                />
              </div>
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
                    Registrarse
                  </button>
                </div>
                <strong className="signup">
                  ¿Ya tenes una cuenta?&nbsp;
                  <Link to="/login">Inicia Sesion</Link>
                </strong>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
