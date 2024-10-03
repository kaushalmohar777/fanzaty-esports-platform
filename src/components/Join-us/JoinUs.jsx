/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import "./JoinUs.scss";
import { memo } from "react";

const JoinUs = () => {
  const { t } = useTranslation("common");

  return (
    <section className="join-us-section">
      <div className="container">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col xs={24} sm={24} md={11} className="join-us-heading-col">
            <div>
              <h1 className="join-us-heading">{t("joinUs.heading")}</h1>
            </div>
          </Col>
          <Col xs={24} sm={24} md={13} className="join-us-description-col">
            <p className="join-us-description">{t("joinUs.description")}</p>
            <div className="join-us-btn">
              <button>{t("joinUs.buttonText")}</button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default memo(JoinUs);
