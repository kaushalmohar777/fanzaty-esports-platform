import { useParams } from "react-router-dom";
import "./BracketTab.scss";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import winTropy from "../../../assets/images/top-trophy.svg";

const BracketTab = () => {
  const { id } = useParams();
  const [bracketData, setBracketData] = useState([]);

  useEffect(() => {
    getBracketData(id);
  }, [id]);

  const getBracketData = async (id) => {
    try {
      const response = await getApiRequest(
        `${END_POINTS.GET_BRACKET_DATA}/${id}`
      );
      if (response.success) {
        setBracketData(response.brackets); // Store brackets
      }
      console.log("response", response);
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  // Function to render teams for a particular round
  const renderRoundTeams = (roundData) => {
    return roundData.teams.map((team) => (
      <div key={team.teamId} className="player-combination-section">
        <div className="player-number">{team.score}</div>
        <div className="team-name">{team.name}</div>
      </div>
    ));
  };

  return (
    <section className="bracket-tab-section">
      <div className="bracket-heading-btn">
        <Row justify="space-around">
          {/* Loop through each round */}
          {bracketData.map((round) => (
            <Col key={round.level} span={4}>
              <button className="round-btn">Round {round.level}</button>
              <div className="main-team-members">{renderRoundTeams(round)}</div>
            </Col>
          ))}

          {/* Optional: Add final round/champion section */}
          <Col span={4}>
            <button className="round-btn">Final Round</button>
            <div className="champion-main-section">
              <div className="champion-round-section">
                <div className="champion-team-members">
                  <div style={{ display: "flex" }}>
                    <img src={winTropy} alt="champion-img" />
                    <span className="champion">Champion</span>
                  </div>
                  <div className="player-combination-section">
                    <div className="player-number">01</div>
                    <div className="team-name">Team#1</div>{" "}
                    {/* Update based on data */}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default BracketTab;
