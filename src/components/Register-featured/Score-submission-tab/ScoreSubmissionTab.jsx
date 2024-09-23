import { useRef, useEffect, useState } from "react";
import "./ScoreSubmissionTab.scss";
import image76 from "../../../assets/avatar-image/image76.svg";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fileUploadApi } from "../../../services/fileUpload";
import { END_POINTS } from "../../../Helper/Constant";
import { showToast } from "../../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { postApiRequest } from "../../../services/postApiRequest";
import Swal from "sweetalert2";
import { fetchData } from "../../../features/tournament/tournamentSlice";

const ScoreSubmissionTab = () => {
  const { t } = useTranslation("common");
  const data = useSelector((state) => state?.tournament?.data);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(file);
      const payload = {
        scoreImage: file,
        tournamentId: data?._id,
      };
      try {
        const response = await fileUploadApi(
          END_POINTS.SCORE_SUBMISSION,
          payload
        );
        if (response.success) {
          showToast(response?.message, "success");
          setScreenshot(null);
        }
        console.log("response", response);
      } catch (error) {
        console.log("error: ", error);
        showToast(error?.error?.message, "error");
      }
    }
  };

  const handleRegister = async (id, name) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: t("sweet_alert.title"),
        text: t("sweet_alert.text_message")?.replace(
          t("sweet_alert.name"),
          name
        ),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("sweet_alert.confirm"),
        cancelButtonText: t("sweet_alert.cancel"),
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          try {
            const response = await postApiRequest(
              END_POINTS.REGISTER_TOURNAMENT,
              {
                tournamentId: id,
              }
            );
            if (response.success) {
              setLoading(false);
              swalWithBootstrapButtons.fire(
                t("sweet_alert.registered"),
                response?.message,
                "success"
              );
              dispatch(fetchData(id));
            } else {
              throw new Error(
                response?.error?.message || "Registration failed"
              );
            }
          } catch (error) {
            console.log("error: ", error);
            setLoading(false);
            swalWithBootstrapButtons.fire(
              "Error!",
              error?.message || "Something went wrong",
              "error"
            );
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            t("sweet_alert.cancelled"),
            t("sweet_alert.cancel_message"),
            "error"
          );
        }
      });
  };

  const handleAddScreenshotClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    console.log("score submission data", data);
  }, [data]);

  return (
    <>
      {data?.isRegistered ? (
        <section className="registered-section">
          <div className="register-score-section">
            <h1 className="register-heading">
              {t("score_submission.score_submission")}
            </h1>

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="score-submission-partison"
            >
              <Col className="gutter-row" span={12}>
                <div className="score-submission-winner-list">
                  <div className="score-submission-score">03</div>
                  <div className="winner-name-img">
                    <img
                      src={image76}
                      alt="loading-winner-img"
                      className="winner-image"
                    />
                    <p className="winner-user-name">
                      {t("score_submission.user")}
                    </p>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="score-submission-winner-list">
                  <div className="score-submission-score">03</div>
                  <div className="winner-name-img">
                    <img
                      src={image76}
                      alt="loading-winner-img"
                      className="winner-image"
                    />
                    <p className="winner-user-name">
                      {t("score_submission.user")}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Winner Section */}
            <div className="winner-score">
              <h4 className="winner-heading">{t("score_submission.winner")}</h4>
              <Row>
                <Col span={12} offset={6}>
                  <div className="score-submission-winner-list">
                    <div className="winner-name-img">
                      <img
                        src={image76}
                        alt="loading-winner-img"
                        className="winner-image"
                      />
                      <p className="winner-user-name">
                        {t("score_submission.user")}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Action Buttons */}
            {data?.status !== "Past_Tournament" ? (
              <div>
                <button
                  className="add-screenshot-btn"
                  onClick={handleAddScreenshotClick}
                >
                  {t("score_submission.add_screenshot")}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <Link className="report-issue-btn" to={`/result/${data?._id}`}>
                  {t("score_submission.report_issue")}
                </Link>
              </div>
            ) : null}

            {screenshot && (
              <div className="screenshot-preview">
                <p>{screenshot.name}</p>
                {/* Optionally, show a preview of the image */}
                <img
                  src={URL.createObjectURL(screenshot)}
                  alt="Screenshot Preview"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className="unregistered-section">
            <h1 className="unregistered-heading">
              {t("score_submission.sorry")}
            </h1>
            <p className="unregistered-msg">
              {t("score_submission.cant_submit")}
            </p>

            <Button
              className="register-here-btn"
              onClick={() => handleRegister(data?._id, data?.name)}
              loading={loading}
            >
              {t("score_submission.register_here")}
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default ScoreSubmissionTab;
