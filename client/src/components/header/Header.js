import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);

  const [isLogged] = state.userAPI.isLogged;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    try {
      await axios.get("/user/logout");

      localStorage.removeItem("firstLogin");

      window.location.href = "/";
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <nav>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <i className="fas fa-bars"></i>
      </div>

      <div className="logo">
        <h1>
          <Link to="/">DELL</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <Link to="/">{ isLogged ? "home" : null}</Link>
        </li>

        {isLogged ? (
          loggedRouter()
        ) : (
          <>
            <li onClick={() => setMenu(!menu)}>
              <Link to="/login">login</Link>
            </li>
            <li onClick={() => setMenu(!menu)}>
              <Link to="/register">register</Link>
            </li>
          </>
        )}

        <li className="cruz" onClick={() => setMenu(!menu)}>
          <i className="fas fa-times"></i>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
