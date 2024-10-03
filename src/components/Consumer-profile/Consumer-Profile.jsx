import { memo, useEffect, useState } from "react";
import "./ConsumerProfile.scss";
import { Col, Row } from "antd";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import Userprofileimg from "../../assets/images/user-profile-img.svg";
import msgimg from "../../assets/icons/msg.svg";
import Thumbimg from "../../assets/icons/thumb.svg";
import Lockbimg from "../../assets/icons/lock.svg";
import userimg from "../../assets/icons/user-rating.svg";
import starimg from "../../assets/icons/star.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import sendIcon from "../../assets/icons/send-icon.svg";
import { postApiRequest } from "../../services/postApiRequest";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { setLocalStorageData } from "../../shared/commonFunction";
import Swal from "sweetalert2";
import ReportModal from "../../shared/sharedComponents/ReportModal/ReportModal";

/* eslint-disable react-refresh/only-export-components */
const ConsumerProfile = () => {
  const { t } = useTranslation("common");
  const { id } = useParams();
  const [consumerDetails, setConsumerDetails] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getUserDetailsById(id);
  }, [id]);

  const getUserDetailsById = async (id) => {
    try {
      const response = await getApiRequest(
        `${END_POINTS.GET_USER_BY_ID}/${id}`
      );
      if (response.success) {
        setConsumerDetails(response.user);
        console.log(response);
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  useEffect(() => {
    console.log("consumerDetails", consumerDetails);
  }, [consumerDetails]);

  const handleSubmitComment = async (id) => {
    const payload = {
      comment: comment,
      commentedOn: id,
    };
    try {
      const response = await postApiRequest(END_POINTS.ADD_COMMENT, payload);
      if (response.success) {
        getUserDetailsById(id);
        setComment("");
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  const handleChat = (_id) => {
    setLocalStorageData("isChatUser", _id);
    navigate("/messages");
  };

  const handleBlockUnBlock = async (id, type) => {
    if (type === "BLOCK") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: t("block_user.sweet_alert.title"),
          text: t("block_user.sweet_alert.text_message")?.replace(
            t("block_user.sweet_alert.name"),
            consumerDetails?.firstName
          ),
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: t("block_user.sweet_alert.confirm"),
          cancelButtonText: t("block_user.sweet_alert.cancel"),
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await postApiRequest(
                `${END_POINTS.BLOCK_USER}/${id}`,
                {}
              );
              if (response.success) {
                getUserDetailsById(id);
              }
            } catch (error) {
              console.log("error: ", error);
              showToast(error?.error?.message, "error");
            }
          }
        });
    } else {
      try {
        const response = await postApiRequest(
          `${END_POINTS.BLOCK_USER}/${id}`,
          {}
        );
        if (response.success) {
          getUserDetailsById(id);
        }
      } catch (error) {
        console.log("error: ", error);
        showToast(error?.error?.message, "error");
      }
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    console.log("Report values: ", values);
  };

  return (
    <div className="container">
      <ReportModal
        visible={isModalVisible}
        onClose={handleClose}
        onSubmit={handleSubmit}
        id={consumerDetails?._id}
      />

      <Row gutter={[16, 16]} className="consumer-profile-section">
        <Col span={7}>
          <div className="consumer-section-right-pannel bg-dark-black border-1">
            <div className="user-profile-section">
              <img className="profile-img" src={Userprofileimg} alt="" />
              <h1 className="profile-title">Fanzaty</h1>
              <h3 className="text-online">{t("consumerProfile.online")}</h3>
              <span className="text-date">{t("consumerProfile.date")}</span>
            </div>
            <table className="profile-table">
              <tbody>
                <tr className="consumer-basic-details">
                  <td>{t("consumerProfile.winRatio")}</td>
                  <td>10%</td>
                </tr>
                <tr className="consumer-basic-details">
                  <td>{t("consumerProfile.gamesPlayed")}</td>
                  <td>10%</td>
                </tr>
                <tr className="consumer-basic-details">
                  <td>{t("consumerProfile.winRatio")}</td>
                  <td>10%</td>
                </tr>
                <tr className="consumer-basic-details">
                  <td>{t("consumerProfile.review")}</td>
                  <td>9.1</td>
                </tr>
                <tr className="consumer-basic-details">
                  <td>{t("consumerProfile.region")}</td>
                  <td>{t("consumerProfile.canada")}</td>
                </tr>
              </tbody>
            </table>
            {!consumerDetails?.isBlocked ? (
              <div
                className="border-btn-list"
                onClick={() => handleChat(consumerDetails?._id)}
              >
                <div className="icon-box">
                  <img src={msgimg} alt="" />
                </div>
                <div className="text-box">
                  <h3 className="text-bio">{t("consumerProfile.message")}</h3>
                </div>
              </div>
            ) : null}
            <div className="border-btn-list" onClick={() => showModal()}>
              <div className="icon-box">
                <img src={Thumbimg} alt="" />
              </div>
              <div className="text-box">
                <h3 className="text-bio">{t("consumerProfile.report")}</h3>
              </div>
            </div>
            {!consumerDetails?.isBlocked ? (
              <div
                className="border-btn-list"
                onClick={() =>
                  handleBlockUnBlock(consumerDetails?._id, "BLOCK")
                }
              >
                <div className="icon-box">
                  <img src={Lockbimg} alt="" />
                </div>
                <div className="text-box">
                  <h3 className="text-bio">{t("consumerProfile.block")}</h3>
                </div>
              </div>
            ) : (
              <div
                className="border-btn-list"
                onClick={() =>
                  handleBlockUnBlock(consumerDetails?._id, "UNBLOCK")
                }
              >
                <div className="icon-box">
                  <img src={Lockbimg} alt="" />
                </div>
                <div className="text-box">
                  <h3 className="text-bio">{t("consumerProfile.unblock")}</h3>
                </div>
              </div>
            )}
            {/* <Button type="primary" className="btn-boi">
              {t("consumerProfile.bio")}
            </Button> */}
          </div>
        </Col>
        <Col span={17}>
          <div className="profile-right-section">
            <Row>
              <Col span={7}>
                <div className="consumer-section-right-pannel left-pannel bg-dark-black border-1 ">
                  <h2 className="text-invited">{t("consumerProfile.unoId")}</h2>
                  <h3 className="text-invited-num">23235</h3>
                  <table className="profile-table table-loses">
                    <tbody>
                      <tr className="consumer-basic-details">
                        <td>100</td>
                        <td>{t("consumerProfile.wins")}</td>
                      </tr>
                      <tr className="consumer-basic-details">
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
                <div className="consumer-section-right-pannel left-pannel bg-dark-black border-1">
                  <h2 className="text-invited">{t("consumerProfile.pubg")}</h2>
                  <h3 className="text-invited-num">ZZ10</h3>
                  <table className="profile-table table-loses">
                    <tbody>
                      <tr className="consumer-basic-details">
                        <td>{t("consumerProfile.wins")}</td>
                        <td>30</td>
                      </tr>
                      <tr className="consumer-basic-details">
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
                <div className="consumer-section-right-pannel left-pannel bg-dark-black border-1">
                  <h2 className="text-invited">{t("consumerProfile.fc24")}</h2>
                  <h3 className="text-invited-num">PS3 XBI</h3>
                  <table className="profile-table table-loses">
                    <tbody>
                      <tr className="consumer-basic-details">
                        <td>{t("consumerProfile.wins")}</td>
                        <td>80</td>
                      </tr>
                      <tr className="consumer-basic-details">
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
                <Col span={24} className="border-1">
                  <div className="comment-total-sectipn">
                    <div className="text-comment">
                      <h3>{t("consumerProfile.comments")}</h3>
                    </div>
                    <div className="total">
                      <h3>
                        {t("consumerProfile.total")}{" "}
                        <span>
                          (
                          {consumerDetails?.comments?.length == 0
                            ? 0
                            : consumerDetails?.comments?.length}
                          )
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="comment-section consumer-section-right-pannel left-pannel bg-dark-black  ">
                    {consumerDetails && consumerDetails?.comments?.length > 0
                      ? consumerDetails?.comments?.map((item, index) => (
                          <div className="ratings-section" key={index}>
                            <img src={userimg} alt="loading-comment-user-img" />
                            <div className="rating-content">
                              <h5 className="rating-title">
                                {/* {t("consumerProfile.ratingTitle")} */}
                                {item.fullName}
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
                              <p className="rating-title">{item.comment}</p>
                              <p className="rating-date">
                                <span>{t("consumerProfile.ratingDate")}</span>
                              </p>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  <div className="add-comment-section">
                    <input
                      placeholder="Comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    {comment && comment != null ? (
                      <img
                        src={sendIcon}
                        alt="loading-send-icon"
                        className="comment-send-icon"
                        onClick={() =>
                          handleSubmitComment(consumerDetails?._id)
                        }
                      />
                    ) : null}
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
