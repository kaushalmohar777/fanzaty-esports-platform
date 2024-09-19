import { Tabs } from "antd";
import "./Result.scss";
import UploadResultTab from "./Upload-result-tab/UploadResultTab";
// import PlayersTab from "./Players-tab/PlayersTab";
// import TheDivisionTab from "./The-division-tab/TheDivisionTab";
// import MatchResultTab from "./Match-result-tab/MatchResultTab";
// import DetailsAwardTab from "./Details-award-tab/DetailsAwardTab";
import { useTranslation } from "react-i18next";

const Result = () => {
  const { t } = useTranslation("common");

  const items = [
    {
      key: "Upload results",
      label: t("upload_result.Upload results"),
      children: <UploadResultTab />,
    },
    // {
    //   key: "players",
    //   label: t("upload_result.players"),
    //   children: <PlayersTab />,
    // },
    // {
    //   key: "The division",
    //   label: t("upload_result.The division"),
    //   children: <TheDivisionTab />,
    // },
    // {
    //   key: "Match results",
    //   label: t("upload_result.Match results"),
    //   children: <MatchResultTab />,
    // },
    // {
    //   key: "Details Awards",
    //   label: t("upload_result.Details Awards"),
    //   children: <DetailsAwardTab />,
    // },
  ];

  return (
    <>
      <div className="result-banner-section">
        <h1 className="result-now-title">
          <span className="score-submission-score">03</span>{" "}
          <span>{t("upload_result.vs")}</span>
          <span className="score-submission-score">01</span>
        </h1>
      </div>

      <div className="result-tab-section">
        <div className="container">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </>
  );
};

export default Result;
