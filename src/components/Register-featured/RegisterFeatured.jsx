import { memo } from "react";
import "./RegisterFeatured.scss";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import BracketTab from "../Register-featured/Bracket-tab/BracketTab";

const RegisterFeatured = () => {
  const { t } = useTranslation("common");

  const items = [
    {
      key: "1",
      label: "Details",
      children: <BracketTab />,
    },
    {
      key: "2",
      label: "Prize pool",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Players",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Bracket",
      children: "Content of Tab Pane 1",
    },
    {
      key: "5",
      label: "Chat",
      children: "Content of Tab Pane 2",
    },
    {
      key: "6",
      label: "Score Submission",
      children: "Content of Tab Pane 3",
    },
  ];

  const onChange = (key) => {
    console.log(key);
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
              <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }} justify="center">
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
