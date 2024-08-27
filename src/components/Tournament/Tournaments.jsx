import { useState } from "react";
import "./Tournaments.scss";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import PastTournamentTab from "./PastTournamentTab/PastTournamentTab";
import OngoingTournamentTab from "./OngoingTournamentTab/OngoingTournamentTab";
import UpcomingTournamentTab from "./UpcomingTournamentTab/UpcomingTournamentTab";
import MyTournament from "./MyTournamentTab/MyTournamentTab";

const Tournaments = () => {
  const { t } = useTranslation("common");
  const [tabKey, setTabKey] = useState(t("tournaments.past_tournaments"));

  const items = [
    {
      key: t("tournaments.past_tournaments"),
      label: t("tournaments.past_tournaments"),
      children: <PastTournamentTab />,
    },
    {
      key: t("tournaments.ongoing_tournament"),
      label: t("tournaments.ongoing_tournament"),
      children: <OngoingTournamentTab />,
    },
    {
      key: t("tournaments.upcoming_tournament"),
      label: t("tournaments.upcoming_tournament"),
      children: <UpcomingTournamentTab />,
    },
    {
      key: t("tournaments.my_tournament"),
      label: t("tournaments.my_tournament"),
      children: <MyTournament />,
    },
  ];

  const onChange = (key) => {
    setTabKey(t(key));
  };

  return (
    <>
      <section className="tournament-banner-section">
        <div className="active-tab-key">{tabKey}</div>
      </section>
      <section>
        <div className="container">
          <div className="all-tournament-tab-section">
            <Tabs
              defaultActiveKey="past_tournaments"
              items={items}
              onChange={onChange}
              className="past-tournament-section"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Tournaments;
