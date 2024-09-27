/* eslint-disable react/no-unescaped-entities */
import { useTranslation } from "react-i18next";
import "./JoinOurCommunity.scss";
import { memo } from "react";
import { Link } from "react-router-dom";
/* eslint-disable react-refresh/only-export-components */

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

          {/* <>{t("join_our_community.button")}</> */}

          <Link to="/academy" style={{ textDecoration: "none" }}>
            <div className="join-our-community-btn">
              <button>{t("join_our_community.button")}</button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(JoinOurCommunity);
