import { useParams } from "react-router-dom";
import "./BracketTab.scss";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getApiRequest } from "../../../services/getApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";

const BracketTab = () => {
  const { id } = useParams();
  const [bracketData, setBracketData] = useState([]);

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
      } else {
        showToast("No bracket data available", "info");
      }
    } catch (error) {
      showToast(error?.error?.message, "error");
    }
  };

  const renderTeamMembers = (teams = []) => {
    return teams.map((item, index) => (
      <div className="main-team-members" key={index}>
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
                }}
              >
                {renderTeamMembers(item.groups)}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default BracketTab;
