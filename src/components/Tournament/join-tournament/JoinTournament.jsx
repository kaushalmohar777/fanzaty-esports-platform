import "./JoinTournament.scss";
import { Checkbox } from "antd";
import { useTranslation } from "react-i18next";

const JoinTournament = () => {
  const { t } = useTranslation("common");

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
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

        <p className="join-tournament">
          <button className="term-conditon-btn">
            {t("joinTournament.button")}
          </button>
        </p>
      </div>
    </section>
  );
};

export default JoinTournament;
