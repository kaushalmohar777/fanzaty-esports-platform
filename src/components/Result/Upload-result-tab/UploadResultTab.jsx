import { useState } from "react";
import "./UploadResultTab.scss";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";

const UploadResultTab = () => {
  const issuesList = [
    "The opponent did not accept the match request.",
    "The opponent did not show up for the match.",
    "Repeated disconnections from opponent (deliberate).",
    "Abusive language from the opponent.",
    "Other reason (please specify).",
  ];

  const [selectedIssues, setSelectedIssues] = useState([]);
  const [otherReason, setOtherReason] = useState("");

  const handleCheckboxChange = (issue) => {
    console.log("issue: ", issue);
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      issues: selectedIssues,
      otherReason: selectedIssues.includes("Other reason (please specify).")
        ? otherReason
        : null,
    };
    console.log("Sending to API:", payload);
  };

  return (
    <section className="upload-result-tab">
      <div className="upload-question-sec">
        <h1 className="issue-question">What is the issue?</h1>
        <div className="question-division">
          <ul className="answer-ul-list">
            {issuesList.map((issue, index) => (
              <li key={index} className="answer-list">
                <label>
                  <input
                    type="checkbox"
                    className="issue-checkbox"
                    value={issue}
                    checked={selectedIssues.includes(issue)}
                    onChange={() => handleCheckboxChange(issue)}
                  />
                  <span className="issues">{issue}</span>
                </label>
              </li>
            ))}
          </ul>
          {selectedIssues.includes("Other reason (please specify).") && (
            <div className="other-reason-input">
              <TextArea
                rows={4}
                placeholder="Please specify your reason"
                value={otherReason}
                onChange={handleOtherReasonChange}
                maxLength={256}
                className="issue-text-area"
              />
            </div>
          )}
        </div>
        <Button className="issue-submit-btn" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </section>
  );
};

export default UploadResultTab;
