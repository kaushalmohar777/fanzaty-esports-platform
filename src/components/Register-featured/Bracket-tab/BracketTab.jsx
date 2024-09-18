import { useParams } from "react-router-dom";
import "./BracketTab.scss";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import winTropy from "../../../assets/images/top-trophy.svg";
import { useTranslation } from "react-i18next";

const BracketTab = () => {
  const { id } = useParams();
  const [bracketData, setBracketData] = useState([]);
  const [championData, setChampionData] = useState(null);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (id) {
      getBracketData(id);
    }
  }, [id]);

  const getBracketData = async (id) => {
    try {
      const response = await getApiRequest(
        `${END_POINTS.GET_BRACKET_DATA}/${id}`
      );
      if (response.success && response.brackets) {
        setBracketData(response.brackets);
        findChampion(response.brackets);
      } else {
        showToast("No bracket data available", "info");
      }
    } catch (error) {
      showToast(error?.error?.message, "error");
    }
  };

  const renderTeamMembers = (teams = []) => {
    return teams.map((item, index) => (
      <div className={`main-team-members`} key={index}>
        {renderBrackets(item)}
      </div>
    ));
  };

  const renderBrackets = (item = []) => {
    return item.map((data, index) => (
      <div className="team-members" key={index}>
        <div className="player-combination-section">
          <div className="player-number">{data?.score}</div>
          <div className="team-name">{data?.name}</div>
        </div>
      </div>
    ));
  };

  const findChampion = (brackets) => {
    if (!brackets || brackets.length === 0) return;
    const lastRound = brackets.reduce((prev, current) =>
      prev.level > current.level ? prev : current
    );

    const qualifiedTeams = lastRound.groups.flatMap((group) =>
      group.filter((team) => team.isQualified)
    );

    if (qualifiedTeams.length > 0) {
      setChampionData(qualifiedTeams[0]);
    }
  };

  useEffect(() => {
    console.log("championData", championData);
  }, [championData]);

  return (
    <section className="bracket-tab-section">
      <div className="bracket-heading-btn">
        <Row justify="space-around">
          {bracketData?.map((item, index) => (
            <Col span={4} key={index}>
              <button className="round-btn">Round {item.level}</button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "900px",
                  height: "100%",
                  marginLeft: "35px",
                }}
                className={`team-border-${item?.groups?.length}`}
              >
                {renderTeamMembers(item.groups)}
              </div>
            </Col>
          ))}
          <Col span={4}>
            {championData && <button className="round-btn">Champion </button>}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minHeight: "900px",
                height: "100%",
              }}
            >
              {championData && (
                <div className="champion-main-section">
                  <div className="champion-team-members">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={winTropy} alt="champion-img" />
                      <span className="champion">
                        {" "}
                        {t("featuredRegister.champion")}
                      </span>
                    </div>
                    <div className="player-combination-section champion-player">
                      <div className="player-number">{championData?.score}</div>
                      <div className="team-name">{championData?.name}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default BracketTab;
