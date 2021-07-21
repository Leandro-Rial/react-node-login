import React from "react";
import inspiron from "../../../image/inspiron.webp";

const Home = () => {
  return (
    <>
      <div className="bg-home">
        <div className="wrapper">
          <div className="content">
            <h1>DELL</h1>
          </div>
        </div>
      </div>
      <div className="home-product">
        <div className="content-home-product">
          <span>Inspiron</span>
          <h3>Connect to your world</h3>
          <p>
            Easy-to-use and thoughtfully designed, the new Inspiron keeps you
            connected to what matters most.
          </p>
          <strong>Inspiron 15</strong> | <strong>Inspiron16</strong>
        </div>
        <div className="image-home-product">
          <div className="img-home-product">
            <img src={inspiron} alt="inspiron" />
          </div>
        </div>
      </div>
      <footer>&copy; 2021</footer>
    </>
  );
};

export default Home;
