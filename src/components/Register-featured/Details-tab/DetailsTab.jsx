/* eslint-disable react/no-unescaped-entities */
import "./DetailsTab.scss";
import { useTranslation } from "react-i18next";

const DetailsTab = () => {
  const { t } = useTranslation("common");

  return (
    <section className="details-tab-section">
      <div className="container">
        <div className="details-inner-section">
          <h1 className="details-tab-section-heading">
            {t("detailsTab.heading")}
          </h1>
          <p className="details-tab-section-para">
            {t("detailsTab.contactInfo")}
          </p>
          <p className="details-tab-section-para">
            {t("detailsTab.discordLink")}
          </p>
          <p className="details-tab-section-link">
            <a href="#">https://discord.gg/8WgwNNAjus</a>
          </p>

          <div className="platform-details">
            <div className="section1">
              <p>{t("detailsTab.platforms")}</p>
              <p>{t("detailsTab.playstation")}</p>
              <p>{t("detailsTab.xboxS")}</p>
              <p>{t("detailsTab.xbox")}</p>
            </div>
            <div className="section2">
              <p>{t("detailsTab.computer")}</p>
              <p>{t("detailsTab.tournament")}</p>
              <p>{t("detailsTab.rules")}</p>
            </div>
          </div>

          <div>
            <p className="details-tab-section-para">
              {t("detailsTab.playingMode")}
            </p>
            <p className="player-detail-para">{t("detailsTab.playerDetail")}</p>
            <p className="details-tab-section-para">
              {t("detailsTab.officialDate")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsTab;
