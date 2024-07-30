/* eslint-disable react/no-unescaped-entities */
import { useTranslation } from "react-i18next";
import "./JoinOurCommunity.scss";
import { memo } from "react";

const JoinOurCommunity = () => {
  const { t } = useTranslation("common");
  return (
    <section className="join-community-section">
      <div className="container">
        <div className="join-community-content">
          <h1
            className="join-our-heading"
            dangerouslySetInnerHTML={{
              __html: t("join_our_community.heading"),
            }}
          ></h1>
          <p className="join-our-heading-para">
            {t("join_our_community.description")}
          </p>
          <div className="join-our-community-btn">
            <button>{t("join_our_community.button")}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(JoinOurCommunity);
