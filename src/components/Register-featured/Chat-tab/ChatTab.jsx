/* eslint-disable no-unused-vars */
import "./ChatTab.scss";
import { useTranslation } from "react-i18next";
import { Col, Row, Button, Dropdown, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import uploadFile from "../../../services/chatFileUpload";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import useSocket from "../../../hooks/useSocket";
import selectFile from "../../../assets/icons/select-file.svg";
import sendIcon from "../../../assets/icons/send-icon.svg";
import { FileImageOutlined, VideoCameraOutlined } from "@ant-design/icons";
import userImage from "../../../assets/images/user-image.svg";

/* eslint-disable react-refresh/only-export-components */

const ChatTab = () => {
  const userData = useSelector((state) => state.user.userData);
  const data = useSelector((state) => state?.tournament?.data);
  const [todayDate] = useState(moment().format("D MMM"));
  const { t } = useTranslation("common");
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");
  const [allUser, setAllUser] = useState([]);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [group, setGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const messageEndRef = useRef(null);
  const [allMessage, setAllMessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const socketConnection = useSocket();

  useEffect(() => {
    if (data) {
      setUserList(data?.participants);
    }
  }, [data]);

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
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [allMessage, activeTab]);

  useEffect(() => {
    if (socketConnection && user?._id) {
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

  useEffect(() => {
    if (socketConnection && group?._id) {
      socketConnection.emit("group-message-page", group?._id);

      // socketConnection.emit("seen", group?._id);

      socketConnection.on("group-data", (data) => {
        setDataUser(data);
      });

      socketConnection.on("message", (data) => {
        setAllMessage(data);
      });
    }
  }, [socketConnection, group?._id, group]);

  const handleUser = (e, item) => {
    setUser(item);
  };

  const handlegroup = (e, item) => {
    setGroup(item);
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

  const handleSendMessage = (e, isGroup) => {
    e.preventDefault();
    if (
      isGroup &&
      socketConnection &&
      (message.text || message.imageUrl || message.videoUrl)
    ) {
      socketConnection.emit("new-group-message", {
        sender: userData?._id,
        admin: userData.role === "admin" ? userData?._id : null,
        text: message.text,
        imageUrl: message.imageUrl,
        videoUrl: message.videoUrl,
        // msgByUserId: userData?._id,
      });
      socketConnection.on("conversation", (data) => {
        console.log("data: ", data);
      });

      setMessage({
        text: "",
        imageUrl: "",
        videoUrl: "",
      });
    } else {
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
        }
      }
    }
  };

  const handleKeyPress = (e, isGroup) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e, isGroup);
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

  const items = [
    {
      key: "chat",
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
      key: "group",
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
  ];

  const getChatData = () => {
    return (
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
                <p className="message-user-name">{data?.name}</p>
              </div>
              <div>{item?.date}</div>
            </div>
          ))}
      </div>
    );
  };

  const getTabGroupData = () => {
    return (
      <div className="message-left-box">
        {data.group && (
          <div
            className={`message-detail-box ${
              data.group._id === group?._id ? "add-highlighted-bg" : null
            }`}
            onClick={(e) => handlegroup(e, data.group)}
          >
            <img
              src={data?.group?.avatarUrl || userImage}
              className="user-avatar-img-side"
              alt="avatar-img-loading"
            />
            <div className="user-name-tournament-name">
              <p className="message-user-name">{data?.group?.userName}</p>
              <p className="message-user-name">{data?.name}</p>
            </div>
            <div>{data?.group?.date}</div>
          </div>
        )}
      </div>
    );
  };

  const tabData = [
    {
      key: "chat",
      label: t("chatMessages.chat"),
      children: getChatData(),
    },
    {
      key: "group",
      label: t("chatMessages.group"),
      children: getTabGroupData(),
    },
  ];

  const onChange = (key) => {
    setActiveTab(key);
    setDataUser({
      name: "",
      email: "",
      profile_pic: "",
      online: false,
      _id: "",
    });
    setAllMessage([]);
    setGroup(null);
    setUser(null);
  };

  return (
    <section>
      <div className="container">
        <div>
          <Row gutter={[16, 16]}>
            <Col span={8} className="message-outer-box">
              <div>
                <div className="tournament-chat-tabs">
                  <Tabs
                    defaultActiveKey="1"
                    items={tabData}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="contact-us">
                <div className="contact-us-btn">
                  <button>{t("chatMessages.contactSupport")}</button>
                </div>
              </div>
            </Col>
            {activeTab == "chat" ? (
              <Col span={16}>
                <div className="message-right-box">
                  {/* chat header */}
                  <div className="user-image-btn">
                    {dataUser && (
                      <div className="userimage-name">
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

                  <div className="message-container">
                    {allMessage.map((msg, index) => {
                      return (
                        <div className="particular-user-chat" key={index}>
                          {renderDate(msg, index)}
                          <div
                            className={`message-bubble ${
                              user._id === msg?.msgByUserId
                                ? "sent"
                                : "received"
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
                                    {moment(msg.createdAt).format(
                                      "D MMM, h:mmA"
                                    )}
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
                                    {moment(msg.createdAt).format(
                                      "D MMM, h:mmA"
                                    )}
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
                                <div ref={messageEndRef} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
                            onKeyDown={(e) =>
                              handleKeyPress(e, dataUser?.isGroup)
                            }
                            className="msg-input"
                            placeholder="Enter message"
                          />
                        </div>
                        <div>
                          <img
                            src={sendIcon}
                            alt="loading-select-file"
                            className="send-icon-image"
                            onClick={(e) =>
                              handleSendMessage(e, dataUser?.isGroup)
                            }
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Col>
            ) : (
              <Col span={16}>
                <div className="message-right-box">
                  {/* chat header */}
                  <div className="user-image-btn">
                    {dataUser && (
                      <div className="userimage-name">
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
                            {/* <p className="online-offline">
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
                            </p> */}
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

                  <div className="message-container">
                    {allMessage.map((msg, index) => {
                      return (
                        <div className="particular-user-chat" key={index}>
                          {renderDate(msg, index)}
                          <div
                            className={`message-bubble ${
                              userData?._id === msg?.sender?._id
                                ? "received"
                                : "sent"
                            }`}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {dataUser?.profile_pic &&
                              userData?._id === msg?.sender?._id ? (
                                <img
                                  src={dataUser?.profile_pic}
                                  alt="chat-user-img"
                                  className={`${
                                    userData?._id === msg?.sender?._id
                                      ? "received"
                                      : "sent"
                                  }`}
                                />
                              ) : (
                                <img
                                  src={userData?.avatarUrl}
                                  alt="chat-user-img"
                                  className={`${
                                    userData?._id === msg?.sender?._id
                                      ? "received"
                                      : "sent"
                                  }`}
                                />
                              )}
                              <div className="w-full relative">
                                {msg?.imageUrl || msg?.videoUrl ? (
                                  <p className="message-timestamp">
                                    {moment(msg.createdAt).format(
                                      "D MMM, h:mmA"
                                    )}
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
                                    {msg?.sender?.firstName}{" "}
                                    {moment(msg.createdAt).format(
                                      "D MMM, h:mmA"
                                    )}
                                  </p>
                                ) : null}
                                {msg.text ? (
                                  <p
                                    className={
                                      userData?._id === msg?.sender?._id
                                        ? "message-text-sent"
                                        : "message-text-received"
                                    }
                                  >
                                    {msg.text}
                                  </p>
                                ) : null}

                                <div ref={messageEndRef} />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
                            onKeyDown={(e) =>
                              handleKeyPress(e, dataUser?.isGroup)
                            }
                            className="msg-input"
                            placeholder="Enter message"
                          />
                        </div>
                        <div>
                          <img
                            src={sendIcon}
                            alt="loading-select-file"
                            className="send-icon-image"
                            onClick={(e) =>
                              handleSendMessage(e, dataUser?.isGroup)
                            }
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </section>
  );
};

export default ChatTab;
