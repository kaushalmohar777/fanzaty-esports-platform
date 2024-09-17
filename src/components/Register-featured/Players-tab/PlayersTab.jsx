import { useRef, useState } from "react";
import "./PlayersTab.scss";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const PlayersTab = () => {
  const { t } = useTranslation("common");
  const data = useSelector((state) => state?.tournament?.data);

  const playersRef = useRef(null);
  // const data = [
  //   { eid: t("player.eid"), userName: t("player.userName") },
  //   { eid: "Abo khalil98", userName: "abd" },
  //   { eid: "rcx_19", userName: "rcx_19" },
  //   { eid: "coxial_tiger72", userName: "coaxial_tiger72" },
  //   { eid: "HAMZAH", userName: "HAMZAHGG" },
  //   { eid: "GHAZY98", userName: "GH98" },
  //   { eid: "SKU_kwt-yo24", userName: "OEhEqJf77LT5Mi5h" },
  //   { eid: "Noorpro20002", userName: "Noraldo 2" },
  //   { eid: "mohamed0909870", userName: "Ali-AKJ" },
  //   { eid: "msh31633", userName: "مشعل بن" },
  // ];

  const [isExpanded, setIsExpanded] = useState(false);

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
              <div key={index} className="price-show-section" ref={playersRef}>
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
