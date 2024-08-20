/* eslint-disable no-unused-vars */
import { memo, useEffect, useRef, useState } from "react";
import "./Message.scss";
import { useTranslation } from "react-i18next";
import { Col, Input, Row, Modal, Button, Upload, message } from "antd";
import {
  UploadOutlined,
  FileImageOutlined,
  VideoCameraOutlined,
  FileOutlined,
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

/* eslint-disable react-refresh/only-export-components */

const Message = () => {
  const params = useParams();
  const userData = useSelector((state) => state.user.userData);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Use custom hook to manage socket connection
  const socketConnection = useSocket();

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_ALL_USER);
      if (response.success) {
        setUserList(response.users);
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error.message, "error");
    }
  };

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
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
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
    setUser(item);
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
      }
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

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      if (fileType === "Image") {
        setMessage((prev) => ({
          ...prev,
          imageUrl: fileUrl,
          videoUrl: "",
          text: "",
        }));
      } else if (fileType === "Video") {
        setMessage((prev) => ({
          ...prev,
          videoUrl: fileUrl,
          imageUrl: "",
          text: "",
        }));
      } else if (fileType === "Document") {
        setMessage((prev) => ({
          ...prev,
          text: file.name,
          imageUrl: "",
          videoUrl: "",
        }));
      }
      socketConnection.emit("new message", {
        sender: userData?._id,
        receiver: user?._id,
        text: fileType === "Document" ? file.name : "",
        imageUrl: fileType === "Image" ? fileUrl : "",
        videoUrl: fileType === "Video" ? fileUrl : "",
        msgByUserId: userData?._id,
      });

      handleCloseModal();
    }
  };

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
                        className="user-avatar-img"
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
                  <button>Contact support</button>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <div className="message-right-box">
                {/* chat header */}
                <div className="user-image-btn">
                  {dataUser && (
                    <div className="userimage-name">
                      <img
                        src={userImage}
                        alt="laoding-img"
                        className="chat-user-image"
                      />
                      <div className="chat-user-name">
                        {dataUser?.name ? dataUser?.name : ""} <br />
                        <p className="online-offline">
                          {dataUser.online && dataUser?.online ? (
                            <span className="text-primary">online</span>
                          ) : (
                            <span className="text-slate-400">
                              {dataUser.online ? "offline" : ""}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="invite-mark">
                    <button>Invite Mark</button>
                  </div>
                </div>

                <hr className="chat-top-hr-line" />

                {/* inner chat */}

                <div className="message-container" ref={currentMessage}>
                  {allMessage.map((msg, index) => {
                    return (
                      <div
                        className={`message-bubble ${
                          user._id === msg?.msgByUserId ? "sent" : "received"
                        }`}
                        key={index}
                      >
                        <div className="w-full relative">
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
                        <p className="message-text">{msg.text}</p>
                        <p className="message-timestamp">
                          {moment(msg.createdAt).format("hh:mm")}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="type-message-section">
                  <div>
                    <img
                      src={selectFile}
                      alt="loading-select-file"
                      className="select-file-image"
                      onClick={handleOpenModal}
                      style={{ position: "relative" }}
                    />
                    <div className="video-doc-select-modal">
                      <Modal
                        title="Select a file to upload"
                        open={isModalOpen}
                        onCancel={handleCloseModal}
                        footer={null}
                        style={{
                          maxWidth: "240px",
                          position: "fixed",
                          left: "40%",
                          top: "50%",
                        }}
                      >
                        <div className="file-selection-options">
                          <Button
                            icon={<FileImageOutlined />}
                            onClick={() => handleFileInputClick("Image")}
                            className="file-select-button"
                          >
                            Select Image
                          </Button>
                          <Button
                            icon={<VideoCameraOutlined />}
                            onClick={() => handleFileInputClick("Video")}
                            className="file-select-button"
                          >
                            Select Video
                          </Button>
                          <Button
                            icon={<FileOutlined />}
                            onClick={() => handleFileInputClick("Document")}
                            className="file-select-button"
                          >
                            Select Document
                          </Button>
                        </div>

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
                        <input
                          type="file"
                          id="Document"
                          style={{ display: "none" }}
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => handleFileChange(e, "Document")}
                        />
                      </Modal>
                    </div>
                  </div>

                  <div className="input-send">
                    <div className="chat-input">
                      <Input
                        placeholder="Enter message"
                        size="large"
                        value={message.text}
                        onChange={handleOnChange}
                        onKeyDown={handleKeyPress}
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
