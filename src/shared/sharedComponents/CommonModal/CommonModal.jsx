import "./CommonModal.scss";
import { Input, Modal } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { putApiRequest } from "../../../services/putApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { memo } from "react";
import { showToast } from "../ToasterMessage/ToasterMessage";
import { useTranslation } from "react-i18next";

const CommonModal = ({ open, handleClose, onModalClose, data }) => {
  const [editableGameId, setEditableGameId] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const { t } = useTranslation("common");

  const handleOk = async () => {
    const payload = {
      enrollementId: enrollmentId,
      editableGameId: editableGameId,
    };
    try {
      const response = await putApiRequest(END_POINTS.EDIT_GAME_ID, payload);
      if (response.success) {
        showToast(response?.message, "success");
        handleClose(false);
        onModalClose();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleCancel = () => {
    handleClose(false);
  };

  useEffect(() => {
    if (data) {
      setEditableGameId(data.editableGameId);
      setEnrollmentId(data._id);
    }
  }, [data]);

  return (
    <Modal
      title={t("model.edit_game_id")}
      className="custom-modal"
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("model.modal_ok")} // Translate OK button
      cancelText={t("model.modal_cancel")}
    >
      <Input
        placeholder={t("model.enter_game_id")}
        variant="filled"
        value={editableGameId}
        onChange={(e) => setEditableGameId(e.target.value)}
      />
    </Modal>
  );
};

export default memo(CommonModal);

CommonModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onModalClose: PropTypes.func,
  data: PropTypes.any,
};
