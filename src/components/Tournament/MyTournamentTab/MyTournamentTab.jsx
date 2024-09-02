import "./MyTournamentTab.scss";
import onGoingTournament from "../../../assets/images/ongoing-tournament-img.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import { useTranslation } from "react-i18next";
import { Col, Row, Card } from "antd";
import image1 from "../../../assets/images/past-tournament-img1.svg";
import image2 from "../../../assets/images/past-tournament-img2.svg";
import image3 from "../../../assets/images/past-tournament-img3.svg";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import moment from "moment";

const style = {
  padding: "15px 0",
  background: "#141414",
};

const MyTournamentTab = () => {
  const { t } = useTranslation("common");
  const [myTournaments, setMyTournaments] = useState({
    pastTournaments: [],
    ongoingTournaments: [],
    upcomingTournaments: [],
  });

  useEffect(() => {
    getMyTournaments();
  }, []);

  const getMyTournaments = async () => {
    try {
      const response = await getApiRequest(END_POINTS.MY_TOURNAMENT);
      if (response.success) {
        setMyTournaments(response.tournaments);
      }
    } catch (error) {
      console.log("error", error);
      showToast(error?.error?.message, "error");
    }
  };

  useEffect(() => {
    console.log("myTournaments", myTournaments);
  }, [myTournaments]);

  const data = [
    {
      image: image1,
      title: t("past_tournament_tab.tournament_title"),
      description: t("past_tournament_tab.tournament_description"),
    },
    {
      image: image2,
      title: t("past_tournament_tab.tournament_title"),
      description: t("past_tournament_tab.tournament_description"),
    },
    {
      image: image3,
      title: t("past_tournament_tab.tournament_title"),
      description: t("past_tournament_tab.tournament_description"),
    },
  ];

  return (
    <section className="my-tournament">
      <div className="container">
        {/* Upcoming Tournaments */}
        {myTournaments.upcomingTournaments.map((item, index) => (
          <div key={index}>
            <div className="my-tournament-inner">
              <div className="my-tournament-image">
                <img src={onGoingTournament} alt="ongoing-tournament-img" />
              </div>
            </div>
            <div className="tournament-name">
              <img src={rightArrow} alt="right-arrow-img" />
              <p className="name">{item.name}</p>
            </div>
            <button className="registration-open">
              {t("ongoing_tournament.registration_open")}
            </button>
          </div>
        ))}

        {/* Ongoing Tournaments */}
        {myTournaments.ongoingTournaments.map((item, index) => (
          <div key={index}>
            <div className="my-tournament-inner">
              <div className="my-tournament-image">
                <img src={onGoingTournament} alt="ongoing-tournament-img" />
              </div>
            </div>
            <div className="tournament-name">
              <img src={rightArrow} alt="right-arrow-img" />
              <p className="name">{item.name}</p>
            </div>
            <button className="registration-open">
              {t("ongoing_tournament.registration_open")}
            </button>
          </div>
        ))}

        {/* Past Tournaments */}
        {myTournaments.pastTournaments.length > 0 && (
          <section className="upcoming-past-tournament-card-section">
            <h3 className="upcoming-past-tournament">
              {t("tournaments.past_tournaments")}
            </h3>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="wrap">
              {myTournaments.pastTournaments.map((item, index) => (
                <Col className="gutter-row" span={8} key={index}>
                  <div style={style}>
                    <Card hoverable className="card">
                      <div className="card-img">
                        <img src={data[index % 3].image} alt="card-img" />
                      </div>
                      <div className="inner-content-card">
                        <button className="join-free-btn">
                          {t("past_tournament_tab.join_for_free")}
                        </button>
                        <p className="card-title">{item.name}</p>
                        <p className="card-description">
                          {t("past_tournament_tab.tournament_description")}{" "}
                          {moment(item.startDate).format("Do MMMM YYYY")}
                        </p>
                        <button className="registration-btn">
                          {t("past_tournament_tab.registration_open")}
                        </button>
                      </div>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </div>
    </section>
  );
};

export default MyTournamentTab;
