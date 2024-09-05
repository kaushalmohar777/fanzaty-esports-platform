import { Card } from "antd";
import "./PastTournamentTab.scss";
import { Col, Row } from "antd";
import image1 from "../../../assets/images/past-tournament-img1.svg";
// import image2 from "../../../assets/images/past-tournament-img2.svg";
// import image3 from "../../../assets/images/past-tournament-img3.svg";
// import image4 from "../../../assets/images/past-tournament-img4.svg";
import { useTranslation } from "react-i18next";
import { getApiRequest } from "../../../services/getApiRequest";
import { useEffect, useState } from "react";
import { END_POINTS } from "../../../Helper/Constant";
import moment from "moment";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { useNavigate } from "react-router-dom";

const style = {
  padding: "15px 0",
  backGround: "#141414",
};

const PastTournamentTab = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [pastTournaments, setPastTournaments] = useState([]);

  useEffect(() => {
    getPastTournaments();
  }, []);

  const getPastTournaments = async () => {
    try {
      const response = await getApiRequest(END_POINTS.PAST_TOURNAMENTS);
      console.log("response: ", response);
      if (response.success) {
        setPastTournaments(response.tournaments);
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  return (
    <section className="past-tournament-card-section">
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="wrap">
          {pastTournaments &&
            pastTournaments?.map((item, index) => (
              <Col className="gutter-row" span={8} key={index}>
                <div style={style}>
                  <Card hoverable className="card">
                    <div className="card-img">
                      <img src={image1} alt="card-img" />
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
                      <button
                        className="registration-btn"
                        onClick={() =>
                          navigate(`/register-featured/${item._id}`)
                        }
                      >
                        {t("past_tournament_tab.tournament_details")}
                      </button>
                    </div>
                  </Card>
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </section>
  );
};

export default PastTournamentTab;
