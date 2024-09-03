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
            <div className="main-team-members">
              <div className="team-members">
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
            <div className="second-round-participant-main-section">
              <div className="second-round-section">
                <div className="section-round-participant-section">
                  <div className="second-round-team-members">
                    <div className="player-combination-section">
                      <div className="player-number">01</div>
                      <div className="team-name">Team#1</div>
                    </div>

                    <p className="tournament-date">04March, 2024 07:30pm</p>

                    <div className="player-combination-section">
                      <div className="player-number">05</div>
                      <div className="team-name">Team#5</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="second-round-section">
                <div className="section-round-participant-section second-section">
                  <div className="second-round-team-members">
                    <div className="player-combination-section">
                      <div className="player-number">06</div>
                      <div className="team-name">Team#6</div>
                    </div>

                    <p className="tournament-date">04March, 2024 07:30pm</p>

                    <div className="player-combination-section">
                      <div className="player-number">02</div>
                      <div className="team-name">Team#2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <button className="round-btn">Round 3</button>
            <div className="third-round-participant-main-section">
              <div className="third-round-section">
                <div className="section-round-participant-section second-section">
                  <div className="second-round-team-members">
                    <div className="player-combination-section">
                      <div className="player-number">06</div>
                      <div className="team-name">Team#6</div>
                    </div>

                    <p className="tournament-date">04March, 2024 07:30pm</p>

                    <div className="player-combination-section">
                      <div className="player-number">01</div>
                      <div className="team-name">Team#1</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={4}>
            <button className="round-btn">Round 4</button>
            <div className="champion-main-section">
              <div className="champion-round-section">
                <div className="section-round-participant-section second-section">
                  <div className="champion-team-members">
                    <div className="player-combination-section">
                      <div className="player-number">01</div>
                      <div className="team-name">Team#1</div>
                    </div>
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
