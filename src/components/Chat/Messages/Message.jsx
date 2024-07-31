import { memo } from "react";
import "./Message.scss";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import userImage1 from "../../../assets/images/user-image1.svg";
import userImage2 from "../../../assets/images/user-image2.svg";
import userImage3 from "../../../assets/images/user-image3.svg";
import userImage4 from "../../../assets/images/user-image4.svg";
import userImage from "../../../assets/images/user-image.svg";
/* eslint-disable react-refresh/only-export-components */

const Message = () => {
  const { t } = useTranslation("common");

  const userList = [
    {
      avatarUrl: userImage1,
      userName: "Roggers",
      tournamentName: "Fanzaty Esports canceled FC24 for 4$",
      date: "11 Jul 5:12",
    },
    {
      avatarUrl: userImage2,
      userName: "Hsdrnia",
      tournamentName: "Fanzaty Esports canceled FC24 for 4$",
      date: "11 Jul 5:12",
    },
    {
      avatarUrl: userImage3,
      userName: "Wilma R. Levan",
      tournamentName: "Fanzaty Esports canceled FC24 for 4$",
      date: "11 Jul 5:12",
    },
    {
      avatarUrl: userImage4,
      userName: "Snkaniaa",
      tournamentName: "Fanzaty Esports canceled FC24 for 4$",
      date: "11 Jul 5:12",
    },
    {
      avatarUrl: userImage1,
      userName: "Gainaika",
      tournamentName: "Fanzaty Esports canceled FC24 for 4$",
      date: "11 Jul 5:12",
    },
  ];

  return (
    <section>
      <div className="container">
        <div>
          <h1 className="message-heading">{t("messages.message")}</h1>
        </div>
        <div>
          <Row gutter={[16, 16]}>
            <Col span={8} className="message-outer-box">
              <div className="message-left-box">
                {userList &&
                  userList?.map((item, index) => (
                    <div className="message-detail-box" key={index}>
                      <img src={item.avatarUrl} alt="avatar-img-loading" />
                      <div className="user-name-tournament-name">
                        <p className="message-user-name">{item.userName}</p>
                        <p className="message-user-tournament">
                          {item.tournamentName}
                        </p>
                      </div>
                      <div>{item.date}</div>
                    </div>
                  ))}
              </div>
              <div className="contact-us">
                <div className="contact-us-btn">
                  <button>Contact support</button>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <div className="message-right-box">
                {/* chat header */}
                <div className="user-image-btn">
                  <div className="userimage-name">
                    <img
                      src={userImage}
                      alt="laoding-img"
                      className="chat-user-image"
                    />
                    <p className="chat-user-name">Wilma R. Levan</p>
                  </div>
                  <div className="invite-mark">
                    <button>Invite Mark</button>
                  </div>
                </div>

                <hr className="chat-top-hr-line" />

                {/* inner chat */}
                <div>
                  <div className="real-time-date-time">
                    <p className="recent-date">2 Jul 2024 / 3:34AM</p>
                    <p className="recent-para">
                      HKHALILIAN00081 INVITED GEMERS TO PLAY FC24 FOR 3$
                    </p>
                  </div>

                  <div className="upcoming-msg">
                    <img
                      src={userImage}
                      alt="user-image-load"
                      className="live-chat-user-img"
                    />
                    <div>
                      <p className="live-chat-date-time">9 Jul, 3:34AM</p>
                      <p className="live-message">Hi there how are you?</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default memo(Message);
