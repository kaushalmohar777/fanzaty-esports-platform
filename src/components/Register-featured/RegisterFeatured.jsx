import { useEffect } from "react";
import "./RegisterFeatured.scss";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import BracketTab from "../Register-featured/Bracket-tab/BracketTab";
import PrizePoolTab from "./Prize-pool-tab/PrizePoolTab";
import DetailsTab from "./Details-tab/DetailsTab";
import PlayersTab from "./Players-tab/PlayersTab";
import ChatTab from "./Chat-tab/ChatTab";
import ScoreSubmissionTab from "./Score-submission-tab/ScoreSubmissionTab";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../features/tournament/tournamentSlice";
import moment from "moment";
import { postApiRequest } from "../../services/postApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { fetchNotificationData } from "../../features/notification/notificationSlice";

const RegisterFeatured = () => {
  const { t } = useTranslation("common");
  const { id } = useParams();
  const location = useLocation();
  // const [tabKey, setTabKey] = useState("details");
  const dispatch = useDispatch();
  // const status = useSelector((state) => state?.tournament?.status);
  const data = useSelector((state) => state?.tournament?.data);
  const state = location.state || {};

  useEffect(() => {
    if (id) {
      console.log("called, id", id);
      dispatch(fetchData(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (state?.fromNotification) {
      handleNotification();
    }
  }, [state]);

  const handleNotification = async () => {
    try {
      const response = await postApiRequest(
        `${END_POINTS.NOTIFICATION_SEEN}/${state?.notificationId}`
      );
      if (response.success) {
        dispatch(fetchNotificationData());
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const items = [
    {
      key: "details",
      label: t("featuredRegister.details"),
      children: <DetailsTab />,
    },
    {
      key: "prize",
      label: t("featuredRegister.prize_pool"),
      children: <PrizePoolTab />,
    },
    {
      key: "players",
      label: t("featuredRegister.players"),
      children: <PlayersTab />,
    },
    {
      key: "bracket",
      label: t("featuredRegister.brackets"),
      children: <BracketTab />,
    },
    ...(["Upcoming", "Ongoing"]?.includes(data?.status) && data?.isRegistered
      ? [
          {
            key: "chat",
            label: t("featuredRegister.chat"),
            children: <ChatTab />,
          },
          {
            key: "score",
            label: t("featuredRegister.score_submission"),
            children: <ScoreSubmissionTab />,
          },
        ]
      : ["Past_Tournament"]?.includes(data?.status) && data?.isRegistered
      ? [
          {
            key: "score",
            label: t("featuredRegister.score_submission"),
            children: <ScoreSubmissionTab />,
          },
        ]
      : []),
  ];

  // const onChange = (key) => {
  //   setTabKey(key);
  // };

  return (
    <>
      <div className="featured-banner-section">
        {data?.status == "Past_Tournament" ? (
          <h1 className="register-now-title">
            {t("featuredRegister.tournament-ended")}
          </h1>
        ) : !data?.isRegistered &&
          data?.maxParticipants === data?.participants?.length ? (
          <h1 className="register-now-title">
            {t("featuredRegister.tournament-full")}
          </h1>
        ) : (
          <h1 className="register-now-title">
            {t("featuredRegister.registerNow")}
          </h1>
        )}
      </div>
      <div className="timeline-section">
        <div className="container">
          <div className="register-now-main-box">
            <div className="timeline-content">
              <h2 className="title-timeline">
                {t("featuredRegister.timeline")}
              </h2>
              {moment(data?.tournament?.registrationEnds).format(
                "Do MMMM YYYY"
              ) > moment().format("Do MMMM YYYY") ? (
                <Row
                  gutter={{ xs: 8, sm: 24, md: 24, lg: 32 }}
                  justify="center"
                >
                  <Col span={5}>
                    <div className="section-right-pannel border-green">
                      <h2 className="timeline-box-title">
                        {/* {t("featuredRegister.march1st")} */}
                        {moment(data?.tournament?.registrationStarts).format(
                          "Do MMMM YYYY"
                        )}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.registrationStarts")}
                      </p>
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="section-right-pannel">
                      <h2 className="timeline-box-title">
                        {/* {t("featuredRegister.march3rd")} */}
                        {moment(data?.tournament?.registrationEnds).format(
                          "Do MMMM YYYY"
                        )}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.registrationStarts")}
                      </p>
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="section-right-pannel border-green">
                      <h2 className="timeline-box-title">
                        {/* {t("featuredRegister.march4th")} */}
                        {moment(data?.tournament?.startDate).format(
                          "Do MMMM YYYY"
                        )}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.tournamentStarts")}
                      </p>
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="section-right-pannel">
                      <h2 className="timeline-box-title">
                        {/* {t("featuredRegister.march9th")} */}
                        {moment(data?.tournament?.endDate).format(
                          "Do MMMM YYYY"
                        )}
                      </h2>
                      <p className="timeline-box-content">
                        {t("featuredRegister.tournamentEnd")}
                      </p>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div className="end-registration">
                  {t("featuredRegister.endRegistration")}
                </div>
              )}
            </div>
          </div>

          <div className="tab-section">
            <Tabs defaultActiveKey="1" items={items} />;
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterFeatured;
