/* eslint-disable no-irregular-whitespace */
import { useTranslation } from "react-i18next";
import "./UpcomingTournamentTab.scss";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { postApiRequest } from "../../../services/postApiRequest";
import moment from "moment";
import userImage from "../../../assets/images/userImage.svg";
import game from "../../../assets/images/game.svg";
import dollar from "../../../assets/images/dollar.svg";
import dateTime from "../../../assets/images/Date-time.svg";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchNotificationData } from "../../../features/notification/notificationSlice";
import { useDispatch } from "react-redux";

const UpcomingTournamentTab = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const dispatch = useDispatch();
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

  useEffect(() => {
    getUpcomingTournaments();
  }, []);

  const getUpcomingTournaments = async () => {
    try {
      const response = await getApiRequest(END_POINTS.UPCOMING_TOURNAMENTS);
      if (response.success) {
        setUpcomingTournaments(response.tournaments);
      }
    } catch (error) {
      console.log("error", error);
      showToast(error?.error?.message || "something went wrong", "error");
    }
  };

  const handleRegister = async (id, name) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: t("sweet_alert.title"),
        text: t("sweet_alert.text_message")?.replace(
          t("sweet_alert.name"),
          name
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("sweet_alert.confirm"),
        cancelButtonText: t("sweet_alert.cancel"),
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading((prev) => ({ ...prev, [id]: true }));
          try {
            const response = await postApiRequest(
              END_POINTS.REGISTER_TOURNAMENT,
              {
                tournamentId: id,
              }
            );
            if (response.success) {
              setLoading(false);
              getUpcomingTournaments();
              swalWithBootstrapButtons.fire(
                t("sweet_alert.registered"),
                response?.message,
                "success"
              );
              dispatch(fetchNotificationData());
            } else {
              throw new Error(
                response?.error?.message || "Registration failed"
              );
            }
          } catch (error) {
            console.log("error: ", error);
            setLoading(false);
            swalWithBootstrapButtons.fire(
              "Error!",
              error?.message || "Something went wrong",
              "error"
            );
          } finally {
            setLoading((prev) => ({ ...prev, [id]: false }));
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            t("sweet_alert.cancelled"),
            t("sweet_alert.cancel_message"),
            "error"
          );
        }
      });
  };

  return (
    <section className="upcoming-tournament">
      <div className="container">
        {upcomingTournaments &&
          upcomingTournaments?.map((item, index) => (
            <div className="main-box" key={index}>
              <Row
                gutter={[16, 16]}
                style={{ position: "relative", zIndex: "1" }}
              >
                <Col xs={24} md={12} span={12}>
                  <div className="tournament-upcoming-img">
                    <img
                      src={item?.fileUrl}
                      alt="tournament-img"
                      className="tournament-img"
                      loading="lazy"
                    />
                  </div>
                </Col>
                <Col xs={24} md={12} span={12}>
                  <div className="tournament-details-section">
                    <div className="text-start">
                      <a className="join-free-btn">
                        {t("feature_tournament.join_free")}
                      </a>
                    </div>
                    <p className="tournament-name">{item.name}</p>

                    <div className="tournament-details">
                      <div className="tournament-details">
                        <img
                          src={userImage}
                          className="tournament-icons"
                          alt="userImage"
                        />
                        <p className="tournament-para">
                          Playstation 5, xbox series x/s & pc​
                        </p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={dateTime}
                          className="tournament-icons"
                          alt="dateTime-image"
                        />
                        <p className="tournament-para">
                          {t("feature_tournament.start_date")}{" "}
                          {moment(item.registrationStarts).format(
                            "Do MMMM YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="tournament-details">
                      <div className="tournament-details">
                        <img
                          src={dollar}
                          className="tournament-icons"
                          alt="dollar-image"
                        />
                        <p className="tournament-para">
                          {item?.prizePoolCoins[0]?.prize}
                        </p>
                      </div>
                      <div className="tournament-details">
                        <img
                          src={game}
                          className="tournament-icons"
                          alt="game-image"
                        />
                        <p className="tournament-para">
                          {item.participants?.length} / {item.maxParticipants}
                        </p>
                      </div>
                    </div>

                    <div className="join-tournament-button">
                      {!item?.isRegistered &&
                      item.maxParticipants != item?.participants?.length &&
                      moment(item?.registrationEnds)
                        .startOf("day")
                        .isSameOrAfter(moment().startOf("day")) ? (
                        <Button
                          className="registration-open"
                          onClick={() => handleRegister(item._id, item.name)}
                          loading={loading[item._id]}
                        >
                          {t("ongoing_tournament.registration_open")}
                        </Button>
                      ) : (
                        <Button
                          className="registration-open"
                          onClick={() =>
                            navigate(`/register-featured/${item._id}`)
                          }
                        >
                          {t("ongoing_tournament.details")}
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UpcomingTournamentTab;
