import "./UserProfile.scss";
import { Col, Row, Tabs } from "antd";
import { useSelector } from "react-redux";
import userEditIcon from "../../assets/images/user-edit-icon.svg";
import { useTranslation } from "react-i18next";
import gameImage from "../../assets/images/game-image.svg";
import addIcon from "../../assets/icons/add-icon.svg";
import editIcon from "../../assets/icons/edit-icon.svg";
import copyIcon from "../../assets/icons/copy-icon.svg";
import { Flex } from "antd";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import copy from "copy-to-clipboard";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import CommonModal from "../../shared/sharedComponents/CommonModal/CommonModal";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
/* eslint-disable react-refresh/only-export-components */

const UserProfile = () => {
  const userData = useSelector((state) => state.user.userData);
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const gameIdData = [
    {
      gameIdHeading: t("game_id.uno_id"),
      gameId: "232354655545",
    },
    {
      gameIdHeading: t("game_id.fc24_id"),
      gameId: "232354655545",
    },
    {
      gameIdHeading: t("game_id.pubg_id"),
      gameId: "ZZ10",
    },
  ];

  const data = [
    {
      gameImage: gameImage,
      gameName: t("rival_stats.game_name"),
      gameTitle: t("rival_stats.game_title_fc24"),
      ripointEearn: "3000",
      rivalRecord: "25-0-0",
      rivalRating: "1288",
    },
    {
      gameImage: gameImage,
      gameName: t("rival_stats.game_name"),
      gameTitle: t("rival_stats.game_title_fc24"),
      ripointEearn: "3000",
      rivalRecord: "25-0-0",
      rivalRating: "1288",
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  //Function to add text to clipboard
  const copyToClipboard = (id) => {
    let copyText = id;
    let isCopy = copy(copyText);
    if (isCopy) {
      showToast("Copied to Clipboard", "success");
    }
  };

  const getTabOneData = () => {
    return (
      <>
        {data.map((item, index) => (
          <div key={index} className="game-detail-box">
            <div className="game-detail-inner">
              <div className="game-img">
                <img src={item.gameImage} alt="game-image" />
              </div>
              <div className="game-head">
                <h4 className="game-name">{t("user_profile.rival_stats")}</h4>
                <div className="game-score-detail">
                  <div>
                    <p className="game-sub-heading">
                      {t("user_profile.game_title")}
                    </p>
                    <p className="game-dynamic-sub-head">{item.gameTitle}</p>
                  </div>
                  <div>
                    <p className="game-sub-heading">
                      {t("user_profile.ripoint_earn")}
                    </p>
                    <p className="game-dynamic-sub-head">{item.ripointEearn}</p>
                  </div>
                  <div>
                    <p className="game-sub-heading">
                      {t("user_profile.rival_record")}
                    </p>
                    <p className="game-dynamic-sub-head">{item.rivalRecord}</p>
                  </div>
                  <div>
                    <p className="game-sub-heading">
                      {t("user_profile.rival_rating")}
                    </p>
                    <p className="game-dynamic-sub-head">{item.rivalRating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const items = [
    {
      key: "1",
      label: t("user_profile.fifa"),
      children: getTabOneData(),
    },
    {
      key: "2",
      label: t("user_profile.esports"),
      children: getTabOneData(),
    },
  ];

  const getGameData = async () => {
    try {
      const response = await getApiRequest(END_POINTS);
      if (response.success) {
        console.log("response: ", response);
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message || "Something went wrong", "error");
    }
  };

  const handleEditGameId = async (item) => {
    setOpen(true);
    setEditData(item);
  };

  return (
    <section className="user-profile-section">
      <CommonModal
        open={open}
        handleClose={setOpen}
        data={editData}
        onModalClose={getGameData}
      />
      <div className="container">
        <div className="user-detail-main">
          <div className="user-avatar" style={{ position: "relative" }}>
            <div className="user-avatar-img">
              <img src={userData?.avatarUrl} alt="avatar-img" />
              <Link to="/edit-user-profile" className="edit-icon-img">
                <img src={userEditIcon} alt="edit-icon-loading" />
              </Link>
            </div>
            <h1 className="user-profile-name">
              {userData?.firstName} {userData?.lastName}
            </h1>
            <p className="user-bio">{t("user_profile.write_your_bio")}</p>
          </div>

          <div className="coin-win-section" style={{ position: "relative" }}>
            <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }} justify="center">
              <Col className="gutter-row" span={8}>
                <div className="game-play-box">
                  <div className="inner-box">
                    <p className="game-detail">
                      {t("user_profile.games_played")}
                    </p>
                    <p className="game-score">0</p>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="game-play-box">
                  <div className="inner-box">
                    <p className="game-detail">{t("user_profile.win_rate")}</p>
                    <p className="game-score">0</p>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="game-play-box">
                  <div className="inner-box">
                    <p className="game-detail">{t("user_profile.coins")}</p>
                    <p className="game-score">0.00</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="game-played-section">
          <h2 className="game-played-section-heading">
            {t("user_profile.state_by_game")}
          </h2>

          <div className="user-profile">
            <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
          </div>
        </div>

        <div className="player-section">
          <h4 className="player-heading">{t("user_profile.about_player")}</h4>
          <div className="bio-section">
            <div className="bio">
              <p>{t("user_profile.write_your_bio")}</p>
              <p>
                <Link to="/edit-user-profile">
                  <img src={addIcon} alt="bio-icon" />
                </Link>
              </p>
            </div>
            <div>
              <button className="point-history-btn">
                {t("user_profile.points_history")}
              </button>
            </div>
          </div>
        </div>

        <div className="game-id">
          <h4 className="game-id-heading">{t("user_profile.game_id")}</h4>
          <Flex wrap gap="middle">
            {gameIdData &&
              gameIdData.map((item, index) => {
                return (
                  <div className="game-id-division" key={index}>
                    <div>
                      <p className="game-id-head">{item.gameIdHeading}</p>
                      <p className="game-dynamic-id">{item.gameId}</p>
                    </div>
                    <div>
                      <img
                        src={editIcon}
                        alt="edit-img"
                        className="edit-img"
                        onClick={() => handleEditGameId(item)}
                      />
                      <img
                        src={copyIcon}
                        alt="copy-img"
                        className="copy-img"
                        onClick={() => copyToClipboard(item.gameId)}
                      />
                    </div>
                  </div>
                );
              })}
          </Flex>
        </div>
      </div>
    </section>
  );
};

export default memo(UserProfile);
