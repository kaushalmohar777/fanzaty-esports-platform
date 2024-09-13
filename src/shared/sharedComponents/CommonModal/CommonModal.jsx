import "./CommonModal.scss";
import { Input, Modal } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { putApiRequest } from "../../../services/putApiRequest";
import { END_POINTS } from "../../../Helper/Constant";
import { memo } from "react";

const CommonModal = ({ open, handleClose, onModalClose, data }) => {
  const [inputVal, setInputVal] = useState(null);

  const handleOk = async () => {
    try {
      const response = await putApiRequest(END_POINTS, inputVal);
      if (response.success) {
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
      setInputVal(data.gameId);
    }
  }, [data]);

  return (
    <Modal
      title="Edit Game ID"
      className="custom-modal"
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Enter game id"
        variant="filled"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
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
