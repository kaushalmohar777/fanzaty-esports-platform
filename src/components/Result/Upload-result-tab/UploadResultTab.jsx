import "./UploadResultTab.scss";

const UploadResultTab = () => {
  return (
    <section className="upload-result-tab">
      <div className="upload-question-sec">
        <h1 className="issue-question">What is the issue?</h1>
        <div>
          <ul className="answer-ul-list">
            <li className="answer-list">
              1- The opponent did not accept the match request.
            </li>
            <li className="answer-list">
              2- The opponent did not show up for the match.
            </li>
            <li className="answer-list">
              3- Repeated disconnections from opponent (deliberate)..
            </li>
            <li className="answer-list">
              4- Abusive language from the opponent.
            </li>
            <li className="answer-list">
              5- Other reason. If other reason (POP UP for writing the reason
              and sending).
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UploadResultTab;
