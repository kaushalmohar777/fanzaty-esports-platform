import { memo } from "react";
import "./consumerProfile.scss";
import { Col, Row } from "antd";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import Userprofileimg from "../../assets/images/user-profile-img.svg";
import msgimg from "../../assets/icons/msg.svg";
import Thumbimg from "../../assets/icons/thumb.svg";
import Lockbimg from "../../assets/icons/lock.svg";
import userimg from "../../assets/icons/user-rating.svg";
import starimg from "../../assets/icons/star.svg";

/* eslint-disable react-refresh/only-export-components */
const ConsumerProfile = () => {
  const { t } = useTranslation("common");

  return (
    <div className="Container-main-box">
      <Row>
        <Col span={7}>
          <div className="section-right-pannel bg-dark-black border-1">
            <div className="user-profile-section">
              <img className="profile-img" src={Userprofileimg} alt="" />
              <h1 className="profile-title">Fanzaty</h1>
              <h3 className="text-online">{t("consumerProfile.online")}</h3>
              <span className="text-date">{t("consumerProfile.date")}</span>
            </div>
            <table className="profile-table">
              <tbody>
                <tr>
                  <td>{t("consumerProfile.winRatio")}</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>{t("consumerProfile.gamesPlayed")}</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>{t("consumerProfile.winRatio")}</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>{t("consumerProfile.review")}</td>
                  <td>9.1</td>
                </tr>
                <tr>
                  <td>{t("consumerProfile.region")}</td>
                  <td>{t("consumerProfile.canada")}</td>
                </tr>
              </tbody>
            </table>
            <div className="border-btn-list">
              <div className="icon-box">
                <img src={msgimg} alt="" />
              </div>
              <div className="text-box">
                <h3 className="text-bio">{t("consumerProfile.message")}</h3>
              </div>
            </div>
            <div className="border-btn-list">
              <div className="icon-box">
                <img src={Thumbimg} alt="" />
              </div>
              <div className="text-box">
                <h3 className="text-bio">{t("consumerProfile.report")}</h3>
              </div>
            </div>
            <div className="border-btn-list">
              <div className="icon-box">
                <img src={Lockbimg} alt="" />
              </div>
              <div className="text-box">
                <h3 className="text-bio">{t("consumerProfile.block")}</h3>
              </div>
            </div>
            {/* <Button type="primary" className="btn-boi">
              {t("consumerProfile.bio")}
            </Button> */}
          </div>
        </Col>
        <Col span={17}>
          <div className="profile-right-section">
            <Row>
              <Col span={7}>
                <div className="section-right-pannel left-pannel bg-dark-black border-1 ">
                  <h2 className="text-invited">{t("consumerProfile.unoId")}</h2>
                  <h3 className="text-invited-num">23235</h3>
                  <table className="profile-table table-loses">
                    <tbody>
                      <tr>
                        <td>100</td>
                        <td>{t("consumerProfile.wins")}</td>
                      </tr>
                      <tr>
                        <td>80</td>
                        <td>{t("consumerProfile.loses")}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Button type="primary" className="btn-boi btn-invite">
                    {t("consumerProfile.invite")}
                  </Button>
                </div>
              </Col>
              <Col span={7}>
                <div className="section-right-pannel left-pannel bg-dark-black border-1">
                  <h2 className="text-invited">{t("consumerProfile.pubg")}</h2>
                  <h3 className="text-invited-num">ZZ10</h3>
                  <table className="profile-table table-loses">
                    <tbody>
                      <tr>
                        <td>{t("consumerProfile.wins")}</td>
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>{t("consumerProfile.loses")}</td>
                        <td>20</td>
                      </tr>
                    </tbody>
                  </table>
                  <Button type="primary" className="btn-boi btn-invite">
                    {t("consumerProfile.invite")}
                  </Button>
                </div>
              </Col>
              <Col span={7}>
                <div className="section-right-pannel left-pannel bg-dark-black border-1">
                  <h2 className="text-invited">{t("consumerProfile.fc24")}</h2>
                  <h3 className="text-invited-num">PS3 XBI</h3>
                  <table className="profile-table table-loses">
                    <tbody>
                      <tr>
                        <td>{t("consumerProfile.wins")}</td>
                        <td>80</td>
                      </tr>
                      <tr>
                        <td>{t("consumerProfile.loses")}</td>
                        <td>40</td>
                      </tr>
                    </tbody>
                  </table>
                  <Button type="primary" className="btn-boi btn-invite">
                    {t("consumerProfile.invite")}
                  </Button>
                </div>
              </Col>
            </Row>
            <div className="comment-section">
              <Row>
                <Col span={24}>
                  <div className="section-right-pannel left-pannel bg-dark-black border-1 ">
                    <div className="comment-total-sectipn">
                      <div className="text-comment">
                        <h3>{t("consumerProfile.comments")}</h3>
                      </div>
                      <div className="total">
                        <h3>
                          {t("consumerProfile.total")} <span>(3)</span>
                        </h3>
                      </div>
                    </div>
                    <div className="ratings-section">
                      <img src={userimg} alt="" />
                      <div className="rating-content">
                        <h5 className="rating-title">
                          {t("consumerProfile.ratingTitle")}
                        </h5>
                        <ul className="rating-list">
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                        </ul>
                        <p className="rating-date">
                          <span>{t("consumerProfile.ratingDate")}</span>
                        </p>
                      </div>
                    </div>
                    <div className="ratings-section">
                      <img src={userimg} alt="" />
                      <div className="rating-content">
                        <h5 className="rating-title">
                          {t("consumerProfile.ratingTitle")}
                        </h5>
                        <ul className="rating-list">
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                        </ul>
                        <p className="rating-date">
                          <span>{t("consumerProfile.ratingDate")}</span>
                        </p>
                      </div>
                    </div>
                    <div className="ratings-section">
                      <img src={userimg} alt="" />
                      <div className="rating-content">
                        <h5 className="rating-title">
                          {t("consumerProfile.ratingTitle")}
                        </h5>
                        <ul className="rating-list">
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                        </ul>
                        <p className="rating-date">
                          <span>{t("consumerProfile.ratingDate")}</span>
                        </p>
                      </div>
                    </div>
                    <div className="ratings-section">
                      <img src={userimg} alt="" />
                      <div className="rating-content">
                        <h5 className="rating-title">
                          {t("consumerProfile.ratingTitle")}
                        </h5>
                        <ul className="rating-list">
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                          <li>
                            <img src={starimg} alt="" />
                          </li>
                        </ul>
                        <p className="rating-date">
                          <span>{t("consumerProfile.ratingDate")}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default memo(ConsumerProfile);
