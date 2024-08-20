import { memo } from "react";
import "./RegisterFeatured.scss";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

const RegisterFeatured = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="featured-banner-section">
        <h1 className="register-title">{t("featuredRegister.registerNow")}</h1>
      </div>
      <div className="timeline-section">
        <div className="container">
          <div className="main-box">
            <div className="timeline-content">
              <h2 className="title-timeline">
                {t("featuredRegister.timeline")}
              </h2>
              <Row>
                <Col span={5}>
                  <div className="section-right-pannel bg-dark-black border-green border-1">
                    <h2 className="timeline-box-title">
                      {t("featuredRegister.march1st")}
                    </h2>
                    <p className="timeline-box-content">
                      {t("featuredRegister.registrationStarts")}
                    </p>
                  </div>
                </Col>
                <Col span={5}>
                  <div className="section-right-pannel bg-dark-black border-1 ">
                    <h2 className="timeline-box-title">
                      {t("featuredRegister.march3rd")}
                    </h2>
                    <p className="timeline-box-content">
                      {t("featuredRegister.registrationStarts")}
                    </p>
                  </div>
                </Col>
                <Col span={5}>
                  <div className="section-right-pannel bg-dark-black border-green border-1">
                    <h2 className="timeline-box-title">
                      {t("featuredRegister.march4th")}
                    </h2>
                    <p className="timeline-box-content">
                      {t("featuredRegister.registrationStarts")}
                    </p>
                  </div>
                </Col>
                <Col span={5}>
                  <div className="section-right-pannel bg-dark-black border-1 ">
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
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </>
  );
};

export default memo(RegisterFeatured);
