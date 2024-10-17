/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef, useState } from "react";
import "./Message.scss";
import { useTranslation } from "react-i18next";
import {
  Col,
  Input,
  Row,
  Modal,
  Button,
  Upload,
  message,
  Dropdown,
  Form,
} from "antd";
import {
  UploadOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";

// Image imports
import userImage1 from "../../../assets/images/user-image1.svg";
import userImage2 from "../../../assets/images/user-image2.svg";
import userImage3 from "../../../assets/images/user-image3.svg";
import userImage4 from "../../../assets/images/user-image4.svg";
import userImage from "../../../assets/images/user-image.svg";
import avatar1 from "../../../assets/avatar-image/image76.svg";
import selectFile from "../../../assets/icons/select-file.svg";
import sendIcon from "../../../assets/icons/send-icon.svg";
import moment from "moment";
import { fileUploadApi } from "../../../services/fileUpload";
import uploadFile from "../../../services/chatFileUpload";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../../shared/commonFunction";
import { setUser } from "../../../features/user/userSlice";

/* eslint-disable react-refresh/only-export-components */

const Message = () => {
  const userData = useSelector((state) => state.user.userData);
  const [isChatUser, setIsChatUser] = useState(
    getLocalStorageData("isChatUser")
  );
  const [todayDate, setTodayDate] = useState(moment().format("D MMM"));
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [user, setUserData] = useState(null);
  const [userList, setUserDataList] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const currentMessage = useRef(null);
  const [allMessage, setAllMessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (userData?.conversationUser?.length > 0) {
      setUserDataList(userData.conversationUser);
    }
  }, [userData]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isChatUser) {
      getUserDetailsById(isChatUser);
    }
  }, [isChatUser]);

  const getUserDetailsById = async (isChatUser) => {
    try {
      const response = await getApiRequest(
        `${END_POINTS.GET_USER_BY_ID}/${isChatUser}`
      );
      if (response.success) {
        setUserData(response.user);
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  // Use custom hook to manage socket connection
  const socketConnection = useSocket();

  // useEffect(() => {
  //   getAllUser();
  // }, []);

  // const getAllUser = async () => {
  //   try {
  //     const response = await getApiRequest(END_POINTS.GET_ALL_USER);
  //     if (response.success) {
  //       setUserDataList(userData.conversationUser);
  //     }
  //   } catch (error) {
  //     console.log("error: ", error);
  //     showToast(error.message, "error");
  //   }
  // };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user?._id);
      socketConnection.on("conversation", (data) => {
        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });

        setAllUser(conversationUserData);
      });
    }
  }, [socketConnection, user]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessage]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", user?._id);

      socketConnection.emit("seen", user?._id);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      socketConnection.on("message", (data) => {
        setAllMessage(data);
      });
    }
  }, [socketConnection, user?._id, user]);

  const handleUser = (e, item) => {
    setLocalStorageData("isChatUser", item?._id);
    setUserData(item);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage((preve) => {
      return {
        ...preve,
        text: value,
      };
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: userData?._id,
          receiver: user?._id,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: userData?._id,
        });
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
        fetchUserData();
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_USER_DATA);
      if (response.success) {
        dispatch(setUser(response.user));
      }
    } catch (error) {
      console.log(error);
      showToast(error?.error?.message, "error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleFileInputClick = (inputId) => {
    document.getElementById(inputId).click();
  };

  const handleFileChange = async (e, fileType) => {
    const file = e.target.files[0];
    let uploadPhoto;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (fileType === "Image") {
        uploadPhoto = await uploadFile(file);
        setIsModalOpen(false);
        setMessage((preve) => {
          return {
            ...preve,
            imageUrl: uploadPhoto.url,
          };
        });
      } else if (fileType === "Video") {
        uploadPhoto = await uploadFile(file);
        setIsModalOpen(false);
        setMessage((preve) => {
          return {
            ...preve,
            videoUrl: uploadPhoto.url,
          };
        });
      }

      socketConnection.emit("new message", {
        sender: userData?._id,
        receiver: user?._id,
        text: fileType === "Document" ? uploadPhoto.url : "",
        imageUrl: fileType === "Image" ? uploadPhoto.url : "",
        videoUrl: fileType === "Video" ? uploadPhoto.url : "",
        msgByUserId: userData?._id,
      });

      handleCloseModal();
    }
  };

  const renderDate = (message, index) => {
    if (
      index === 0 ||
      moment(allMessage[index - 1]?.createdAt).format("LL") !==
        moment(message?.createdAt).format("LL")
    ) {
      return (
        <>
          <div key={`date-${index}`} className="message-date">
            {moment(message?.createdAt).format("D MMM") == todayDate
              ? "Today"
              : moment(message?.createdAt).format("D MMM, h:mmA")}
          </div>
          <div className="msg-divide-hr"></div>
        </>
      );
    }
    return null;
  };

  const handleBackClick = () => {
    setDataUser({
      name: "",
      email: "",
      profile_pic: "",
      online: false,
      _id: "",
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Button
          icon={<FileImageOutlined />}
          onClick={() => handleFileInputClick("Image")}
          className="file-select-button"
        >
          {t("chatMessages.selectImage")}
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button
          icon={<VideoCameraOutlined />}
          onClick={() => handleFileInputClick("Video")}
          className="file-select-button"
        >
          {t("chatMessages.selectVideo")}
        </Button>
      ),
    },
    // {
    //   key: "3",
    //   label: (
    //     <Button
    //       icon={<FileOutlined />}
    //       onClick={() => handleFileInputClick("Document")}
    //       className="file-select-button"
    //     >
    //       {t("chatMessages.selectDocument")}
    //     </Button>
    //   ),
    // },
  ];
  return (
    <section>
      <div className="container">
        <div>
          <h1 className="message-heading">{t("chatMessages.message")}</h1>
        </div>
        <div>
          <Row gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}>
            <Col
              xs={24}
              sm={24}
              md={8}
              span={8}
              className={`message-outer-box ${
                dataUser && dataUser?.name
                  ? `is-hide-mobile`
                  : `is-visible-mobile`
              }`}
            >
              <div className="message-left-box">
                {userList &&
                  userList.map((item, index) => (
                    <div
                      className={`message-detail-box ${
                        item._id === user?._id ? "add-highlighted-bg" : null
                      }`}
                      key={index}
                      onClick={(e) => handleUser(e, item)}
                    >
                      <img
                        src={item?.avatarUrl || userImage}
                        className="user-avatar-img-side"
                        alt="avatar-img-loading"
                      />
                      <div className="user-name-tournament-name">
                        <p className="message-user-name">{item?.userName}</p>
                      </div>
                      <div>{item?.date}</div>
                    </div>
                  ))}
              </div>
              <div className="contact-us">
                <div className="contact-us-btn">
                  <button>{t("chatMessages.contactSupport")}</button>
                </div>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={16}
              span={16}
              className={
                dataUser && dataUser?.name
                  ? "is-visible-mobile"
                  : "is-hide-mobile"
              }
            >
              <div className="message-right-box">
                {/* chat header */}
                <div className="user-image-btn">
                  {dataUser && (
                    <div className="userimage-name">
                      <LeftOutlined
                        onClick={handleBackClick}
                        className="chat-back-icon"
                      />
                      {dataUser?.profile_pic ? (
                        <img
                          src={dataUser?.profile_pic}
                          alt="laoding-img"
                          className="chat-user-image"
                        />
                      ) : null}
                      {dataUser?.name ? (
                        <div className="chat-user-name">
                          {dataUser?.name} <br />
                          <p className="online-offline">
                            {dataUser?.online ? (
                              <span className="text-primary">
                                {t("chatMessages.online")}
                              </span>
                            ) : (
                              <span className="text-slate-400">
                                <span className="text-primary">
                                  {t("chatMessages.offline")}
                                </span>
                              </span>
                            )}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {/* <div className="invite-mark">
                    <button>{t("chatMessages.inviteMark")}</button>
                  </div> */}
                </div>

                <hr className="chat-top-hr-line" />

                {/* inner chat */}

                <div className="message-container" ref={currentMessage}>
                  {allMessage?.map((msg, index) => {
                    return (
                      <div className="particular-user-chat" key={index}>
                        {renderDate(msg, index)}
                        <div
                          className={`message-bubble ${
                            user._id === msg?.msgByUserId ? "sent" : "received"
                          }`}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {dataUser?.profile_pic &&
                            user._id === msg?.msgByUserId ? (
                              <img
                                src={dataUser?.profile_pic}
                                alt="chat-user-img"
                                className={`${
                                  user._id === msg?.msgByUserId
                                    ? "sent "
                                    : "received"
                                }`}
                              />
                            ) : (
                              <img
                                src={userData?.avatarUrl}
                                alt="chat-user-img"
                                className={`${
                                  user._id === msg?.msgByUserId
                                    ? "sent"
                                    : "received"
                                }`}
                              />
                            )}
                            <div className="w-full relative">
                              {msg?.imageUrl || msg?.videoUrl ? (
                                <p className="message-timestamp">
                                  {moment(msg.createdAt).format("D MMM, h:mmA")}
                                </p>
                              ) : null}
                              {msg?.imageUrl && (
                                <img
                                  src={msg?.imageUrl}
                                  alt="loading-chat-img"
                                  className="chat-img"
                                />
                              )}
                              {msg?.videoUrl && (
                                <video
                                  src={msg.videoUrl}
                                  className="chat-video"
                                  controls
                                />
                              )}
                            </div>
                            <div style={{ padding: "5px" }}>
                              {msg.text ? (
                                <p className="message-timestamp">
                                  {moment(msg.createdAt).format("D MMM, h:mmA")}
                                </p>
                              ) : null}
                              {msg.text ? (
                                <p
                                  className={
                                    user._id === msg?.msgByUserId
                                      ? "message-text-sent"
                                      : "message-text-received"
                                  }
                                >
                                  {msg.text}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>

                <div className="type-message-section">
                  {dataUser?.profile_pic && dataUser?.name ? (
                    <div>
                      <div className="video-doc-select-modal">
                        <input
                          type="file"
                          id="Image"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "Image")}
                        />
                        <input
                          type="file"
                          id="Video"
                          style={{ display: "none" }}
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, "Video")}
                        />
                        <div className="">
                          <Dropdown
                            menu={{
                              items,
                            }}
                            trigger={["click"]}
                            placement="topLeft"
                            arrow
                            overlayClassName="img-select-dropdown"
                          >
                            <img
                              src={selectFile}
                              alt="loading-select-file"
                              className="select-file-image"
                              onClick={handleOpenModal}
                              style={{ position: "relative" }}
                            />
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {dataUser?.profile_pic && dataUser?.name ? (
                    <div className="input-send">
                      <div className="chat-input">
                        <input
                          value={message.text}
                          onChange={handleOnChange}
                          onKeyDown={handleKeyPress}
                          className="msg-input"
                          placeholder={t("chatMessages.placeholder")}
                        />
                      </div>
                      <div>
                        <img
                          src={sendIcon}
                          alt="loading-select-file"
                          className="send-icon-image"
                          onClick={handleSendMessage}
                        />
                      </div>
                    </div>
                  ) : null}
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
