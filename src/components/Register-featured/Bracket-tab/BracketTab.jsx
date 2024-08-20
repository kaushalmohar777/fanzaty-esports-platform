/* eslint-disable react/no-unescaped-entities */
import "./BracketTab.scss";

const BracketTab = () => {
  return (
    <section className="bracket-tab-section">
      <div className="container">
        <div className="bracket-inner-section">
          <h1 className="bracket-tab-section-heading">
            ABOUT 5 FC 24 ULTIMATE TEAM WINTER TOURNAMENT
          </h1>
          <p className="bracket-tab-section-para">
            Please contact the tournament organizer on Discord for any questions
            or issues regarding gameplay, results, match schedules, Registration
            status, game ID, and more.
          </p>
          <p className="bracket-tab-section-para">Discord link:</p>
          <p className="bracket-tab-section-link">
            <a href="#">https://discord.gg/8WgwNNAjus</a>
          </p>

          <div className="plateform-details">
            <div className="section1">
              <p>Platforms: </p>
              <p>PlayStation 5 </p>
              <p>xbox s </p>
              <p>Xbox</p>
            </div>
            <div className="section2">
              <p>Computer</p>
              <p>Tournament</p>
              <p>rules:</p>
            </div>
          </div>

          <div>
            <p className="bracket-tab-section-para">
              Playing in EAFC 24 Ultimate Team mode The winner is determined
              from one match
            </p>
            <p className="player-detail-para">
              The player's EA ID must match the ID in the tournament table: if
              it is wrong, you will be disqualified If an opponent disconnects
              in the middle of the game, create a new game and continue where
              the game left off (a screenshot of where the game left off must be
              provided)
            </p>
            <p className="bracket-tab-section-para">
              When a specific time is not agreed upon, the game will be played
              on the official date and time set by the organizers. Competitors
              communicate via the game only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BracketTab;
