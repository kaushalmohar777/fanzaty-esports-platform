import { useState } from "react";
import "./UploadResultTab.scss";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import { postApiRequest } from "../../../services/postApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { useParams } from "react-router-dom";

const UploadResultTab = () => {
  const { id } = useParams();
  const issuesList = [
    "The opponent did not accept the match request.",
    "The opponent did not show up for the match.",
    "Repeated disconnections from opponent (deliberate).",
    "Abusive language from the opponent.",
    "Other reason (please specify).",
  ];

  const [selectedIssues, setSelectedIssues] = useState([]);
  const [otherReasonError, setOtherReasonError] = useState(false); // New state for validation

  const handleCheckboxChange = (issue) => {
    if (issue === "Other reason (please specify).") {
      setOtherReasonError(false); // Reset error on checkbox change
      if (!selectedIssues.some((i) => i.startsWith("Other reason:"))) {
        setSelectedIssues([...selectedIssues, "Other reason: "]);
      } else {
        setSelectedIssues(
          selectedIssues.filter((i) => !i.startsWith("Other reason:"))
        );
      }
    } else {
      if (selectedIssues.includes(issue)) {
        setSelectedIssues(selectedIssues.filter((i) => i !== issue));
      } else {
        setSelectedIssues([...selectedIssues, issue]);
      }
    }
  };

  const handleOtherReasonChange = (e) => {
    const otherText = e.target.value;
    setOtherReasonError(false); // Reset error when typing
    setSelectedIssues((prevIssues) => {
      return prevIssues.map((i) =>
        i.startsWith("Other reason:") ? `Other reason: ${otherText}` : i
      );
    });
  };

  const handleSubmit = async () => {
    const otherReason = selectedIssues
      .find((i) => i.startsWith("Other reason:"))
      ?.replace("Other reason: ", "");

    // Check for validation: if 'Other reason' is selected but the text area is empty
    if (
      selectedIssues.some((i) => i.startsWith("Other reason:")) &&
      !otherReason
    ) {
      setOtherReasonError(true); // Set error state
      return;
    }

    const payload = {
      issues: selectedIssues,
      tournamentId: id,
    };

    try {
      const response = await postApiRequest(END_POINTS.REPORT_ISSUE, payload);
      if (response.success) {
        showToast(response?.message, "success");
        setSelectedIssues([]);
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
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
                    checked={
                      issue === "Other reason (please specify)."
                        ? selectedIssues.some((i) =>
                            i.startsWith("Other reason:")
                          )
                        : selectedIssues.includes(issue)
                    }
                    onChange={() => handleCheckboxChange(issue)}
                  />
                  <span className="issues">{issue}</span>
                </label>
              </li>
            ))}
          </ul>
          {selectedIssues.some((i) => i.startsWith("Other reason:")) && (
            <div className="other-reason-input">
              <TextArea
                rows={4}
                placeholder="Please specify your reason"
                value={
                  selectedIssues
                    .find((i) => i.startsWith("Other reason:"))
                    ?.replace("Other reason: ", "") || ""
                }
                onChange={handleOtherReasonChange}
                maxLength={256}
                className="issue-text-area"
              />
              {otherReasonError && (
                <p className="error-message">Please specify the issue.</p> // Display error message
              )}
            </div>
          )}
        </div>
        {selectedIssues.length > 0 && (
          <Button className="issue-submit-btn" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </section>
  );
};

export default UploadResultTab;
