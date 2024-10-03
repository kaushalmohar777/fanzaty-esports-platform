import { Col, Row } from "antd";
import "./OurClient.scss";
import snoonu from "../../assets/images/snoonu.svg";
import education from "../../assets/images/education.svg";
import store from "../../assets/images/store.svg";
import { useTranslation } from "react-i18next";
import { memo } from "react";
/* eslint-disable react-refresh/only-export-components */

const OurClient = () => {
  const { t } = useTranslation("common");

  return (
    <section className="our-client-section">
      <div className="container">
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          justify="center"
          align="middle"
        >
          <Col xs={24} sm={24} md={10} className="gutter-row">
            <div className="our-client-heading">{t("our_client.heading")}</div>
          </Col>
          <Col xs={24} sm={8} md={5} className="gutter-row">
            <div className="our-client-img">
              <img src={store} alt="loading-img" />
            </div>
          </Col>
          <Col xs={24} sm={8} md={5} className="gutter-row">
            <div className="our-client-img">
              <img src={education} alt="loading-img" />
            </div>
          </Col>
          <Col xs={24} sm={8} md={4} className="gutter-row">
            <div className="our-client-img-pic">
              <img src={snoonu} alt="loading-img" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default memo(OurClient);
