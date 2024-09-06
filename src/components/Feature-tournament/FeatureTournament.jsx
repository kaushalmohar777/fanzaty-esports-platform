/* eslint-disable no-irregular-whitespace */
import { memo, useEffect, useState } from "react";
import "./FeatureTournament.scss";
import userImage from "../../assets/images/userImage.svg";
import game from "../../assets/images/game.svg";
import dollar from "../../assets/images/dollar.svg";
import dateTime from "../../assets/images/Date-time.svg";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
/* eslint-disable react-refresh/only-export-components */

const FeatureTournament = () => {
  const { t } = useTranslation("common");
  const [featuredTournaments, setFeaturedTournaments] = useState([]);

  useEffect(() => {
    getFeturedTournament();
  }, []);

  const getFeturedTournament = async () => {
    try {
      const response = await getApiRequest(END_POINTS.FEATURED_TOURNAMENT);
      if (response.success) setFeaturedTournaments(response.tournaments);
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message);
    }
  };

  return (
    <section className="feature-tournament-section">
      <div className="container">
        <h1 className="feature-heading">{t("feature_tournament.heading")}</h1>
        <p className="feature-sub-heading">
          {t("feature_tournament.sub_heading")}
        </p>
        {featuredTournaments &&
          featuredTournaments?.map((item, index) => (
            <div className="main-box" key={index}>
              <Row style={{ position: "relative", zIndex: "1" }}>
                <Col span={12}>
                  <div>
                    <img
                      src={item?.fileUrl}
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
                    <p className="tournament-name">{item.name}</p>

                    <div className="tournament-details">
                      <div className="tournament-details">
                        <img
                          src={userImage}
                          className="tournament-icons"
                          alt="userImage"
                        />
                        <p className="tournament-para">
                          Playstation 5, xbox series x/s & pc​
                        </p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={dateTime}
                          className="tournament-icons"
                          alt="dateTime-image"
                        />
                        <p className="tournament-para">
                          {item.registrationStarts}
                        </p>
                      </div>
                    </div>
                    <div className="tournament-details">
                      <div className="tournament-details">
                        <img
                          src={dollar}
                          className="tournament-icons"
                          alt="dollar-image"
                        />
                        <p className="tournament-para">
                          {item?.prizePoolCoins[0]?.prize}
                        </p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={game}
                          className="tournament-icons"
                          alt="game-image"
                        />
                        <p className="tournament-para">
                          {item.participants?.length} / {item.maxParticipants}
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
