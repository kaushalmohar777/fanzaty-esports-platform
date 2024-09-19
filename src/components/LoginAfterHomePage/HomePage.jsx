import "./HomePage.scss";

const HomePage = () => {
  return (
    <section className="login-after-home-page">
      <div className="active-tour-division">
        <div className="active-tourn-bg">
          <h1 className="active-tour-heading">ACTIVE TOURNAMET’s</h1>
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
            <p>
              <img src="" alt="" />
            </p>
          </div>
          <div className="track-record">
            <p className="record-name">Academy + Number Trainee</p>
            <p>
              <img src="" alt="" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
