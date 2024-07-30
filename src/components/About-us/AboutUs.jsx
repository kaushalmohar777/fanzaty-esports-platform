/* eslint-disable react/no-unescaped-entities */
import { memo } from "react";
import "./AboutUs.scss";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation("common");

  return (
    <section className="about-section-bg">
      <div className="container">
        <div className="about-us-section">
          <div className="about-us-details">
            <h1 className="about-heading">{t("about_us.heading")}</h1>
            <p className="about-us-para">{t("about_us.description")}</p>
            <div className="about-us-btn">
              <button className="button">{t("about_us.button")}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutUs);
