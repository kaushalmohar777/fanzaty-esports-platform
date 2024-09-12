import "./ScoreSubmissionTab.scss";
import image76 from "../../../assets/avatar-image/image76.svg";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ScoreSubmissionTab = () => {
  const { t } = useTranslation("common");
  const data = useSelector((state) => state?.tournament?.data);

  return (
    <>
      {data?.isRegistered ? (
        <section className="registered-section">
          <div className="register-score-section">
            <h1 className="register-heading">
              {t("score_submission.score_submission")}
            </h1>

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
                    <p className="winner-user-name">
                      {t("score_submission.user")}
                    </p>
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
                    <p className="winner-user-name">
                      {t("score_submission.user")}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Winner Section */}
            <div className="winner-score">
              <h4 className="winner-heading">{t("score_submission.winner")}</h4>
              <Row>
                <Col span={12} offset={6}>
                  <div className="score-submission-winner-list">
                    <div className="winner-name-img">
                      <img
                        src={image76}
                        alt="loading-winner-img"
                        className="winner-image"
                      />
                      <p className="winner-user-name">
                        {t("score_submission.user")}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Action Buttons */}
            <div>
              <button className="add-screenshot-btn">
                {t("score_submission.add_screenshot")}
              </button>
              <Link className="report-issue-btn" to="/result">
                {t("score_submission.report_issue")}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="unregistered-section">
            <h1 className="unregistered-heading">
              {t("score_submission.sorry")}
            </h1>
            <p className="unregistered-msg">
              {t("score_submission.cant_submit")}
            </p>

            <button className="register-here-btn">
              {t("score_submission.register_here")}
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default ScoreSubmissionTab;
