/* eslint-disable react/no-unescaped-entities */
import "./BracketTab.scss";
import { Col, Row } from "antd";

const BracketTab = () => {
  return (
    <section className="bracket-tab-section">
      <div className="bracket-heading-btn">
        <Row justify="space-around">
          <Col span={4}>
            <button className="round-btn">Round 1</button>
            <div className="team-members">
              <div className="main-team-members">
                <div className="player-combination-section">
                  <div className="player-number">01</div>
                  <div className="team-name">Team#1</div>
                </div>

                <div className="player-combination-section">
                  <div className="player-number">08</div>
                  <div className="team-name">Team#8</div>
                </div>

                <div className="team-members">
                  <div className="player-combination-section">
                    <div className="player-number">05</div>
                    <div className="team-name">Team#5</div>
                  </div>

                  <div className="player-combination-section">
                    <div className="player-number">04</div>
                    <div className="team-name">Team#4</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-team-members">
              <div className="team-members">
                <div className="player-combination-section">
                  <div className="player-number">03</div>
                  <div className="team-name">Team#3</div>
                </div>

                <div className="player-combination-section">
                  <div className="player-number">06</div>
                  <div className="team-name">Team#6</div>
                </div>
              </div>

              <div className="team-members">
                <div className="player-combination-section">
                  <div className="player-number">07</div>
                  <div className="team-name">Team#7</div>
                </div>

                <div className="player-combination-section">
                  <div className="player-number">02</div>
                  <div className="team-name">Team#2</div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <button className="round-btn">Round 2</button>
          </Col>
          <Col span={4}>
            <button className="round-btn">Round 3</button>
          </Col>
          <Col span={4}>
            <button className="round-btn">Round 4</button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default BracketTab;
