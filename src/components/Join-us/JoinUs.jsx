/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import "./JoinUs.scss";
import { memo } from "react";
/* eslint-disable react-refresh/only-export-components */

const JoinUs = () => {
  const { t } = useTranslation("common");

  return (
    <section className="join-us-section">
      <div className="container">
        <Row>
          <Col span={11}>
            <div>
              <h1 className="join-us-heading">{t("joinUs.heading")}</h1>
            </div>
          </Col>
          <Col span={13}>
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
