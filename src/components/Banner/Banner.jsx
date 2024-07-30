import { memo } from "react";
import "./Banner.scss";
import { useTranslation } from "react-i18next";
/* eslint-disable react-refresh/only-export-components */
const Banner = () => {
  const { t } = useTranslation("common");
  return (
    <section className="banner-section">
      <div className="container">
        <h1 className="heading">{t("banner.heading")}</h1>
        <br />
        <h2 className="sub-heading">{t("banner.sub_heading")}</h2>
        <p className="banner-para">{t("banner.paragraph")}</p>
        <div className="join-tournament">
          <a>{t("banner.join_tournament")}</a>
        </div>
      </div>
    </section>
  );
};

export default memo(Banner);
