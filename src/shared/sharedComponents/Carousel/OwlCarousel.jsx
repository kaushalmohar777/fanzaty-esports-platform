import PropTypes from "prop-types";
import { Carousel } from "antd";
import "./OwlCarousel.scss";
import { useEffect } from "react";

const OwlCarousel = ({ data }) => {
  useEffect(() => {}, [data]);

  const carouselConfig = {
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Carousel
      {...carouselConfig}
      draggable={true}
      dots={true}
      slidesToShow={3}
      slidesToScroll={1}
      infinite={true}
      dotActiveWidth={10}
      dotWidth={10}
      dotHeight={5}
    >
      {data &&
        data.map((item, index) => (
          <div className="happy-player-box" key={index}>
            <div className="owl-couresel-inner">
              <div>
                <img
                  src={item.img}
                  alt="player-img"
                  className="owl-cauresel-img"
                />
              </div>
              <div className="">
                <h4 className="player-name">{item.playerName}</h4>
                <p className="player-message">{item.description}</p>
              </div>
              <div>
                <img src={item.icon} alt="" />
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
};

OwlCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      playerName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OwlCarousel;
