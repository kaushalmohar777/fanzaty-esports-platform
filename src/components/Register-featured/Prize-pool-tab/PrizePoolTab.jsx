import { useRef, useState } from "react";
import "./PrizePoolTab.scss";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import topTrophy from "../../../assets/images/top-trophy.svg";
import middleTrophy from "../../../assets/images/middle-trophy.svg";
import lowTrophy from "../../../assets/images/low-trophy.svg";
import { useTranslation } from "react-i18next";

const PrizePoolTab = () => {
  const { t } = useTranslation("common");
  const prizePoolRef = useRef(null);

  const images = {
    "1st place": topTrophy,
    "2nd place": middleTrophy,
    "3rd place": lowTrophy,
    "4th place": lowTrophy,
    "5th-9th place": lowTrophy,
    "10th-14th place": lowTrophy,
  };

  const data = t("prizePool.prizes", { returnObjects: true }).map((item) => ({
    ...item,
    image: images[item.place],
  }));

  const [isExpanded, setIsExpanded] = useState(false);

  const handleViewMore = () => {
    setIsExpanded(true);
  };

  const handleBackToTop = () => {
    setIsExpanded(false);
    if (prizePoolRef.current) {
      prizePoolRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderPlaceWithSup = (place) => {
    return place
      .replace(
        /(\d+)(st|nd|rd|th)/g,
        (match, number, suffix) => `${number}<sup>${suffix}</sup>`
      )
      .replace(
        /(\d+-\d+)(th)/g,
        (match, range, suffix) => `${range}<sup>${suffix}</sup>`
      );
  };

  const visibleData = isExpanded ? data : data.slice(0, 5);

  return (
    <section>
      <div className="container">
        <div className="prize-pool-section">
          <h1 className="prize-pool-heading">{t("prizePool.heading")}</h1>

          <div className="prize-pool-inner-content" ref={prizePoolRef}>
            {visibleData.map((item, index) => (
              <div key={index} className="price-show-section">
                <div
                  className="prize-pool-place"
                  dangerouslySetInnerHTML={{
                    __html: renderPlaceWithSup(item.place),
                  }}
                />
                <div className="prize-pool-price">
                  <p className="prize-image">
                    <img
                      src={item.image}
                      alt="prize-img-load"
                      className="img-fluid"
                    />
                  </p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="view-more-less">
          <p className="view" onClick={handleViewMore}>
            <ArrowDownOutlined />
            {t("prizePool.viewMore")}
          </p>

          <p className="back" onClick={handleBackToTop}>
            <ArrowUpOutlined />
            {t("prizePool.backToTop")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrizePoolTab;
``;
