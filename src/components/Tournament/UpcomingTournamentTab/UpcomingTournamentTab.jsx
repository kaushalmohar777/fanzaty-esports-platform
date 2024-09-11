import onGoingTournament from "../../../assets/images/ongoing-tournament-img.svg";
import rightArrow from "../../../assets/images/right-arrow.svg";
import freeRegister from "../../../assets/images/free-register-img.svg";
import { useTranslation } from "react-i18next";
import "./UpcomingTournamentTab.scss";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { postApiRequest } from "../../../services/postApiRequest";

const UpcomingTournamentTab = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [upcominTournaments, setUpcominTournaments] = useState([]);

  useEffect(() => {
    getUpcomingTournaments();
  }, []);

  const getUpcomingTournaments = async () => {
    try {
      const response = await getApiRequest(END_POINTS.UPCOMING_TOURNAMENTS);
      if (response.success) {
        setUpcominTournaments(response.tournaments);
      }
    } catch (error) {
      console.log("error", error);
      showToast(error?.error?.message, "error");
    }
  };

  const handleRegister = async (id) => {
    setLoading(true);
    try {
      const response = await postApiRequest(END_POINTS.REGISTER_TOURNAMENT, {
        tournamentId: id,
      });
      if (response.success) {
        setLoading(false);
        getUpcomingTournaments();
      }
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  return (
    <section className="upcoming-tournament">
      <div className="container">
        {console.log("upcominTournaments", upcominTournaments)}
        {upcominTournaments &&
          upcominTournaments.map((item, index) => (
            <div key={index} className="upcoming-tournament-list">
              <div className="upcoming-tournament-inner">
                <div className="upcoming-tournament-image">
                  <img src={onGoingTournament} alt="loading-img" />
                </div>
                <div className="free-registeration-img">
                  <img src={freeRegister} alt="laoding-img" />
                </div>
              </div>

              <div className="tournament-name">
                <img src={rightArrow} alt="right-arrow-img" />
                <p className="name">
                  {/* {t("ongoing_tournament.tournament_name1")} */}
                  {item.name}
                </p>
              </div>

              {!item.isRegistered ? (
                <Button
                  className="registration-open"
                  onClick={() => handleRegister(item._id)}
                  loading={loading}
                >
                  {t("ongoing_tournament.registration_open")}
                </Button>
              ) : (
                <Button
                  className="registration-open"
                  onClick={() => navigate(`/register-featured/${item._id}`)}
                >
                  {t("ongoing_tournament.details")}
                </Button>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default UpcomingTournamentTab;
