import { Col, Row } from "antd";
import "./OurClient.scss";
import snoonu from "../../assets/images/snoonu.svg";
import education from "../../assets/images/education.svg";
import store from "../../assets/images/store.svg";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const OurClient = () => {
  const { t } = useTranslation("common");

  return (
    <section>
      <div className="container">
        <div className="our-client-section">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={10}>
              <div className="our-client-heading">
                {t("our_client.heading")}
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div>
                <img src={store} alt="loading-img" />
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div>
                <img src={education} alt="loading-img" />
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>
                <img src={snoonu} alt="loading-img" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default memo(OurClient);
