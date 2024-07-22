/* eslint-disable react/no-unescaped-entities */
import { memo, useState } from "react";
import "./FeatureTournament.scss";
import tournamentImage1 from "../../assets/images/tournament-image1.svg";
import tournamentImage2 from "../../assets/images/tournament-image2.svg";
import userImage from "../../assets/images/userImage.svg";
import game from "../../assets/images/game.svg";
import dollar from "../../assets/images/dollar.svg";
import dateTime from "../../assets/images/Date-time.svg";
import { Col, Row } from "antd";

const FeatureTournament = () => {
  const [data] = useState([
    {
      img: tournamentImage1,
      tournamentName: "FC 2024 TOURNAMENT",
      tournamentPlayStation: "Playstation 5, xbox series x/s & pc​",
      winnerPrice: "500 sar for winner",
      numberOfParticipant: "1 vs 1",
      TournamentDate: "Tournament starts on 7 July (7-7- 2024)",
    },
    {
      img: tournamentImage2,
      tournamentName: "FC 2024 TOURNAMENT",
      tournamentPlayStation: "Playstation 5, xbox series x/s & pc​",
      winnerPrice: "500 sar for winner",
      numberOfParticipant: "1 vs 1",
      TournamentDate: "Tournament starts on 7 July (7-7- 2024)",
    },
  ]);

  return (
    <section className="feature-tournament-section">
      <div className="container">
        <h1 className="feature-heading">Featured Tournaments</h1>
        <p className="feature-sub-heading">
          Join our ongoing tournaments: compete and carve your name as one of
          the game's legends!
        </p>
        {data &&
          data.map((item, index) => (
            <div className="main-box" key={index}>
              <Row>
                <Col span={12}>
                  <div>
                    <img
                      src={item.img}
                      alt="tournament-img"
                      className="tournament-img"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="tournament-details-section">
                    <div className="text-start">
                      <a className="join-free-btn">JOIN FOR FREE 100%</a>
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
                        <p className="tournament-para">{item.TournamentDate}</p>
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
                          {item.tournamentPlayStation}
                        </p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={game}
                          className="tournament-icons"
                          alt="game-image"
                        />
                        <p className="tournament-para">{item.TournamentDate}</p>
                      </div>
                    </div>

                    <div className="join-tournament-button">
                      <a
                        href="javascript:void(0)"
                        className="join-tournament-btn"
                      >
                        Join TOURNAMENT
                      </a>
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
