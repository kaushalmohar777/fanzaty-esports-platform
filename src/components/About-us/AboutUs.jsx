/* eslint-disable react/no-unescaped-entities */
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <section className="about-section-bg">
      <div className="container">
        <div className="about-us-section">
          <div className="about-us-details">
            <h1 className="about-heading">Who we are</h1>
            <p className="about-us-para">
              Fanzaty is a passion turned into reality, a dream come true. It's
              a dream of a place that embraces all lovers and fanatics of the
              game. The childhood obsession, the cheers of enthusiasts, all
              gather here. At Fanzaty, we help you participate, compete, and
              win, transforming every fan into a professional gamer.
            </p>
            <div className="about-us-btn">
              <button className="button">more about us</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
