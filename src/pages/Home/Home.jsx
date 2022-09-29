import React from "react";
import "./Home.modules.css";
import Jumbotron from "../../components/Jumbotron/Jumbotron";

const Home = () => {
  return (
    <div className="home__section">
      <Jumbotron>
        <h2 className="jumbotron__text">
          With us, you can shop online &#38; help
        </h2>
        <h2 className="jumbotron__text">
          save your high street at the same time
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Home;
