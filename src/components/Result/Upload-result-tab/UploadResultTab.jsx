import { useState } from "react";
import "./UploadResultTab.scss";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import { postApiRequest } from "../../../services/postApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UploadResultTab = () => {
  const { id } = useParams();
  const { t } = useTranslation("common");

  const issuesList = [
    t("uploadResultTab.opponentNoAccept"),
    t("uploadResultTab.opponentNoShow"),
    t("uploadResultTab.disconnections"),
    t("uploadResultTab.abusiveLanguage"),
    t("uploadResultTab.otherReason"),
  ];

  const [selectedIssues, setSelectedIssues] = useState([]);
  const [error, setError] = useState(false);

  const handleCheckboxChange = (issue) => {
    setError(false);
    if (issue === t("uploadResultTab.otherReason")) {
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
    setSelectedIssues((prevIssues) => {
      return prevIssues.map((i) =>
        i.startsWith("Other reason:") ? `Other reason: ${otherText}` : i
      );
    });
  };

  const handleSubmit = async () => {
    if (
      selectedIssues.includes("Other reason: ") ||
      selectedIssues.includes(t("uploadResultTab.otherReason"))
    ) {
      const otherReason = selectedIssues.find((issue) =>
        issue.startsWith("Other reason:")
      );
      if (!otherReason || otherReason === "Other reason: ") {
        setError(true);
        return;
      }
    }

    const payload = {
      issues: selectedIssues,
      tournamentId: id,
    };
    try {
      const response = await postApiRequest(END_POINTS.REPORT_ISSUE, payload);
      console.log("response: ", response);
    } catch (error) {
      console.log("error: ", error);
      showToast(error?.error?.message, "error");
    }
  };

  return (
    <section className="upload-result-tab">
      <div className="upload-question-sec">
        <h1 className="issue-question">
          {t("uploadResultTab.whatIsTheIssue")}
        </h1>
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
                      issue === t("uploadResultTab.otherReason")
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
                placeholder={t("uploadResultTab.pleaseSpecifyIssue")}
                value={
                  selectedIssues
                    .find((i) => i.startsWith("Other reason:"))
                    ?.replace("Other reason: ", "") || ""
                }
                onChange={handleOtherReasonChange}
                maxLength={256}
                className="issue-text-area"
              />
              {error && (
                <div className="error-message">
                  {t("uploadResultTab.pleaseSpecifyIssue")}
                </div>
              )}
            </div>
          )}
        </div>
        {selectedIssues.length > 0 && (
          <Button className="issue-submit-btn" onClick={handleSubmit}>
            {t("uploadResultTab.submit")}
          </Button>
        )}
      </div>
    </section>
  );
};

export default UploadResultTab;
