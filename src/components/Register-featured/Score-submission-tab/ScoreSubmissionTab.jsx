import "./ScoreSubmissionTab.scss";
import image76 from "../../../assets/avatar-image/image76.svg";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ScoreSubmissionTab = () => {
  const data = useSelector((state) => state?.tournament?.data);

  return (
    <>
      {data?.isRegistered ? (
        <section className="registered-section">
          <div className="register-score-section">
            <h1 className="register-heading">score submission</h1>

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="score-submission-partison"
            >
              <Col className="gutter-row" span={12}>
                <div className="score-submission-winner-list">
                  <div className="score-submission-score">03</div>
                  <div className="winner-name-img">
                    <img
                      src={image76}
                      alt="loading-winner-img"
                      className="winner-image"
                    />
                    <p className="winner-user-name">USER XYZ</p>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="score-submission-winner-list">
                  <div className="score-submission-score">03</div>
                  <div className="winner-name-img">
                    <img
                      src={image76}
                      alt="loading-winner-img"
                      className="winner-image"
                    />
                    <p className="winner-user-name">USER XYZ</p>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="winner-score">
              <h4 className="winner-heading">Winner</h4>
              <Row>
                <Col span={12} offset={6}>
                  <div className="score-submission-winner-list">
                    <div className="winner-name-img">
                      <img
                        src={image76}
                        alt="loading-winner-img"
                        className="winner-image"
                      />
                      <p className="winner-user-name">USER XYZ</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <button className="add-screenshot-btn">
                Add a Screenshot Proof
              </button>
              <Link className="report-issue-btn" to="/result">
                report an issue
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="unregistered-section">
            <h1 className="unregistered-heading">Sorry!</h1>
            <p className="unregistered-msg">
              YOU CAN’T SUBMITT YOUR SCORES WITHOUT REGISTERING IN THE
              TOURNAMENT
            </p>

            <button className="register-here-btn">REGISTER HERE</button>
          </div>
        </section>
      )}
    </>
  );
};

export default ScoreSubmissionTab;
