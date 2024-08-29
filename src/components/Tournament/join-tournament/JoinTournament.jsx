import "./JoinTournament.scss";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const JoinTournament = () => {
  const { t } = useTranslation("common");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      // Navigate to the desired route when the checkbox is checked
      navigate("/all-tournaments");
    }
  };

  return (
    <section>
      <div className="container">
        <p className="join-tournament-sub-head">
          {t("joinTournament.subHead")}
        </p>
        <h4 className="join-tournament-heading">
          {t("joinTournament.heading")}
        </h4>

        <p className="join-tournament-term-condition">
          <Checkbox onChange={onChange}>
            {t("joinTournament.termCondition")}
          </Checkbox>
        </p>

        <p className="join-tournament-green-btn">
          <button className="term-conditon-btn">
            {t("joinTournament.button")}
          </button>
        </p>
      </div>
    </section>
  );
};

export default JoinTournament;
