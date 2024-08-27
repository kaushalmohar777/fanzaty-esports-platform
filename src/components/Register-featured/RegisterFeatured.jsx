import { memo, useState } from "react";
import "./RegisterFeatured.scss";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import BracketTab from "../Register-featured/Bracket-tab/BracketTab";
import PrizePoolTab from "./Prize-pool-tab/PrizePoolTab";
import DetailsTab from "./Details-tab/DetailsTab";
import PlayersTab from "./Players-tab/PlayersTab";
import ChatTab from "./Chat-tab/ChatTab";
import ScoreSubmissionTab from "./Score-submission-tab/ScoreSubmissionTab";

const RegisterFeatured = () => {
  const { t } = useTranslation("common");
  const [tabKey, setTabKey] = useState("details");

  const items = [
    {
      key: "details",
      label: t("featuredRegister.details"),
      children: <DetailsTab />,
    },
    {
      key: "prize",
      label: t("featuredRegister.prize_pool"),
      children: <PrizePoolTab />,
    },
    {
      key: "players",
      label: t("featuredRegister.players"),
      children: <PlayersTab />,
    },
    {
      key: "bracket",
      label: t("featuredRegister.brackets"),
      children: <BracketTab />,
    },
    {
      key: "chat",
      label: t("featuredRegister.chat"),
      children: <ChatTab />,
    },
    {
      key: "score",
      label: t("featuredRegister.score_submission"),
      children: <ScoreSubmissionTab />,
    },
  ];

  const onChange = (key) => {
    setTabKey(key);
  };

  return (
    <>
      <div className="featured-banner-section">
        <h1 className="register-now-title">
          {t("featuredRegister.registerNow")}
        </h1>
      </div>
      <div className="timeline-section">
        <div className="container">
          <div className="register-now-main-box">
            <div className="timeline-content">
              <h2 className="title-timeline">
                {t("featuredRegister.timeline")}
              </h2>
              {tabKey === "details" || tabKey === "prize" ? (
                <Row
                  gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}
                  justify="center"
                >
                  <Col span={5}>
                    <div className="section-right-pannel border-green">
                      <h2 className="timeline-box-title">
                        {t("featuredRegister.march1st")}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.registrationStarts")}
                      </p>
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="section-right-pannel">
                      <h2 className="timeline-box-title">
                        {t("featuredRegister.march3rd")}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.registrationStarts")}
                      </p>
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="section-right-pannel border-green">
                      <h2 className="timeline-box-title">
                        {t("featuredRegister.march4th")}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.registrationStarts")}
                      </p>
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="section-right-pannel">
                      <h2 className="timeline-box-title">
                        {t("featuredRegister.march9th")}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.registrationStarts")}
                      </p>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div className="end-registration">
                  {t("featuredRegister.endRegistration")}
                </div>
              )}
            </div>
          </div>

          <div className="tab-section">
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RegisterFeatured);
