import { useTranslation } from "react-i18next";
import player1 from "../../assets/images/playerImage1.svg";
import player2 from "../../assets/images/playerImage2.svg";
import player3 from "../../assets/images/playerImage3.svg";
import "./HappyPlayers.scss";
import twitter from "../../assets/images/twitter.svg";
import OwlCarousel from "../../shared/sharedComponents/Carousel/OwlCarousel";
import { memo } from "react";

const HappyPlayers = () => {
  const { t } = useTranslation("common");
  const data = [
    {
      img: player1,
      playerName: t("happy_players.players.0.playerName"),
      description: t("happy_players.players.0.description"),
      icon: twitter,
    },
    {
      img: player2,
      playerName: t("happy_players.players.1.playerName"),
      description: t("happy_players.players.1.description"),
      icon: twitter,
    },
    {
      img: player3,
      playerName: t("happy_players.players.2.playerName"),
      description: t("happy_players.players.2.description"),
      icon: twitter,
    },
    {
      img: player3,
      playerName: t("happy_players.players.2.playerName"),
      description: t("happy_players.players.2.description"),
      icon: twitter,
    },
  ];

  return (
    <section className="happy-player-section">
      <div className="container">
        <h1 className="happy-player-heading">{t("happy_players.heading")}</h1>
        <OwlCarousel data={data} />
      </div>
    </section>
  );
};

export default memo(HappyPlayers);
