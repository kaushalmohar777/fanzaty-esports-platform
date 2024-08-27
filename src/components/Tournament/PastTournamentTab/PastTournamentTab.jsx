import { Card } from "antd";
import "./PastTournamentTab.scss";
import { Col, Row } from "antd";
import image1 from "../../../assets/images/past-tournament-img1.svg";
import image2 from "../../../assets/images/past-tournament-img2.svg";
import image3 from "../../../assets/images/past-tournament-img3.svg";
import image4 from "../../../assets/images/past-tournament-img4.svg";
import { useTranslation } from "react-i18next";

const style = {
  padding: "15px 0",
  backGround: "#141414",
};

const PastTournamentTab = () => {
  const { t } = useTranslation("common");

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
    {
      image: image2,
      title: t("past_tournament_tab.tournament_title"),
      description: t("past_tournament_tab.tournament_description"),
    },
    {
      image: image4,
      title: t("past_tournament_tab.tournament_title"),
      description: t("past_tournament_tab.tournament_description"),
    },
  ];

  return (
    <section className="past-tournament-card-section">
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="wrap">
          {data &&
            data.map((item, index) => (
              <Col className="gutter-row" span={8} key={index}>
                <div style={style}>
                  <Card hoverable className="card">
                    <div className="card-img">
                      <img src={item.image} alt="card-img" />
                    </div>
                    <div className="inner-content-card">
                      <button className="join-free-btn">
                        {t("past_tournament_tab.join_for_free")}
                      </button>
                      <p className="card-title">{item.title}</p>
                      <p className="card-description">{item.description}</p>
                      <button className="registration-btn">
                        {t("past_tournament_tab.registration_open")}
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
