import "./HomePage.scss";
import croupier from "../../assets/images/croupier.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="login-after-home-page">
      <div className="active-tour-division">
        <div className="active-tourn-bg">
          <h1 className="active-tour-heading">
            <Link to="/all-tournaments" className="active-tour-heading">
              ACTIVE TOURNAMET’s
            </Link>
          </h1>
        </div>
      </div>

      <div className="active-tour-division">
        <div className="join-academy-bg">
          <h1 className="active-tour-heading">Join the Acedemy</h1>
        </div>
      </div>
      <div className="container">
        <div>
          <h2 className="our-esport-track">our esports track record</h2>
        </div>

        <div className="track">
          <div className="track-record">
            <p className="record-name">Tournament + Number</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={croupier} alt="laoding-img" />
              <p>
                <span className="track-score">+235658</span> <br />
                <span className="track-score">+235658</span>
              </p>
            </div>
          </div>
          <div className="track-record">
            <p className="record-name">Academy + Number Trainee</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={croupier} alt="" />
              <p>
                <span className="track-score">+235658</span> <br />
                <span className="track-score">+235658</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
