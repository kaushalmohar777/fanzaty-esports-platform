import { useRef, useState } from "react";
import "./PlayersTab.scss";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PlayersTab = () => {
  const { t } = useTranslation("common");
  const data = useSelector((state) => state?.tournament?.data);
  const playersRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setIsExpanded(true);
  };

  const handleBackToTop = () => {
    setIsExpanded(false);
    if (playersRef.current) {
      playersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const visibleData = isExpanded ? data?.players : data?.players?.slice(0, 5);
  console.log("visibleData: ", visibleData);

  return (
    <section>
      <div className="container">
        <div className="prize-pool-section">
          <div className="prize-pool-inner-content">
            <div className="players-eid">
              <p className="eid">{t("player.eid")}</p>
              <p className="user-name">{t("player.userName")}</p>
            </div>
            {visibleData?.map((item, index) => (
              <div
                key={index}
                className="price-show-section"
                ref={playersRef}
                onClick={() => navigate(`/consumer-Profile/${item._id}`)}
              >
                <div
                  className="prize-pool-place"
                  dangerouslySetInnerHTML={{
                    __html: item.editableGameId,
                  }}
                />
                <div className="prize-pool-price">{item.userName}</div>
              </div>
            ))}
          </div>
        </div>

        {data?.players?.length > 5 ? (
          <div className="view-more-less">
            <p className="view" onClick={handleViewMore}>
              <ArrowDownOutlined />
              {t("player.viewMore")}
            </p>

            <p className="back" onClick={handleBackToTop}>
              <ArrowUpOutlined />
              {t("player.backToTop")}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PlayersTab;
