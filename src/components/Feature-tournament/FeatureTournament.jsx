import { memo } from "react";
import "./FeatureTournament.scss";
import tournamentImage1 from "../../assets/images/tournament-image1.svg";
import tournamentImage2 from "../../assets/images/tournament-image2.svg";
import userImage from "../../assets/images/userImage.svg";
import game from "../../assets/images/game.svg";
import dollar from "../../assets/images/dollar.svg";
import dateTime from "../../assets/images/Date-time.svg";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
/* eslint-disable react-refresh/only-export-components */

const FeatureTournament = () => {
  const { t } = useTranslation("common");

  const data = t("feature_tournament.tournaments", { returnObjects: true });

  return (
    <section className="feature-tournament-section">
      <div className="container">
        <h1 className="feature-heading">{t("feature_tournament.heading")}</h1>
        <p className="feature-sub-heading">
          {t("feature_tournament.sub_heading")}
        </p>
        {data &&
          data.map((item, index) => (
            <div className="main-box" key={index}>
              <Row>
                <Col span={12}>
                  <div>
                    <img
                      src={index === 0 ? tournamentImage1 : tournamentImage2}
                      alt="tournament-img"
                      className="tournament-img"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="tournament-details-section">
                    <div className="text-start">
                      <a className="join-free-btn">
                        {t("feature_tournament.join_free")}
                      </a>
                    </div>
                    <p className="tournament-name">{item.tournamentName}</p>

                    <div className="tournament-details">
                      <div className="tournament-details">
                        <img
                          src={userImage}
                          className="tournament-icons"
                          alt="userImage"
                        />
                        <p className="tournament-para">
                          {item.tournamentPlayStation}
                        </p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={dateTime}
                          className="tournament-icons"
                          alt="dateTime-image"
                        />
                        <p className="tournament-para">{item.tournamentDate}</p>
                      </div>
                    </div>
                    <div className="tournament-details">
                      <div className="tournament-details">
                        <img
                          src={dollar}
                          className="tournament-icons"
                          alt="dollar-image"
                        />
                        <p className="tournament-para">{item.winnerPrice}</p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={game}
                          className="tournament-icons"
                          alt="game-image"
                        />
                        <p className="tournament-para">
                          {item.numberOfParticipant}
                        </p>
                      </div>
                    </div>

                    <div className="join-tournament-button">
                      <Link className="join-tournament-btn">
                        {t("feature_tournament.join_tournament")}
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
      </div>
    </section>
  );
};

export default memo(FeatureTournament);
