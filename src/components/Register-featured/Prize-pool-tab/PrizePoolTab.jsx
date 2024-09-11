import { useEffect, useRef, useState } from "react";
import "./PrizePoolTab.scss";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import topTrophy from "../../../assets/images/top-trophy.svg";
import middleTrophy from "../../../assets/images/middle-trophy.svg";
import lowTrophy from "../../../assets/images/low-trophy.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const PrizePoolTab = () => {
  const { t } = useTranslation("common");
  const prizePoolRef = useRef(null);
  const data = useSelector((state) => state?.tournament?.data);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const images = {
    "1st": topTrophy,
    "2nd": middleTrophy,
    "3rd": lowTrophy,
    "4th": lowTrophy,
    "5th-9th": lowTrophy,
    "10th-14th": lowTrophy,
  };

  // const dummyData = t("prizePool.prizes", { returnObjects: true }).map(
  //   (item) => ({
  //     ...item,
  //     image: images[item.place],
  //   })
  // );

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
    return place.replace(
      /(\d+)(st|nd|rd|th)/g,
      (match, number, suffix) =>
        `${number}<sup>${suffix}</sup> <span className="place">Place</span>`
    );
  };

  const visibleData = isExpanded
    ? data?.prizePoolCoins
    : data?.prizePoolCoins?.slice(0, 5);

  return (
    <section>
      <div className="container">
        <div className="prize-pool-section">
          <h1 className="prize-pool-heading">{t("prizePool.heading")}</h1>

          <div className="prize-pool-inner-content" ref={prizePoolRef}>
            {visibleData?.map((item, index) => (
              <div key={index} className="price-show-section">
                <div
                  className="prize-pool-place"
                  dangerouslySetInnerHTML={{
                    __html: renderPlaceWithSup(`${item?.rank}`),
                  }}
                />
                <div className="prize-pool-price">
                  <p className="prize-image">
                    <img
                      src={images[item?.rank] || topTrophy}
                      alt="prize-img-load"
                      className="img-fluid"
                    />
                  </p>
                  <p>{item.prize}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data?.prizePoolCoins.length > 5 ? (
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
        ) : null}
      </div>
    </section>
  );
};

export default PrizePoolTab;
``;
