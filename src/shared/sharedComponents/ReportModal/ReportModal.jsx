import { memo, useEffect, useState } from "react";
import "./ReportModal.scss";
import { Modal, Checkbox, Input, Button, Form } from "antd";
import PropTypes from "prop-types";
import { postApiRequest } from "../../../services/postApiRequest";
import { showToast } from "../ToasterMessage/ToasterMessage";
import { END_POINTS } from "../../../Helper/Constant";

const ReportModal = ({ visible, onClose, id }) => {
  const [form] = Form.useForm();
  const [showOtherInput, setShowOtherInput] = useState(false);

  const onOtherCheckboxChange = (e) => {
    setShowOtherInput(e.target.checked);
    if (!e.target.checked) {
      form.setFieldsValue({ otherReason: "" });
    }
  };

  useEffect(() => {
    console.log("id", id);
  }, [id]);

  const handleSubmit = async (values) => {
    if (showOtherInput && !values.otherReason) {
      form.setFields([
        {
          name: "otherReason",
          errors: ["Please specify the other reason."],
        },
      ]);
    } else {
      try {
        const payload = {
          userId: id,
          issues: values.report,
        };
        const response = await postApiRequest(END_POINTS.REPORT_USER, payload);
        if (response.success) {
          showToast(response.message, "success");
          form.resetFields();
          setShowOtherInput(false);
          onClose();
        }
      } catch (error) {
        console.log("error: ", error);
        showToast(error?.error?.message, "error");
      }
    }
  };

  return (
    <Modal open={visible} title="Report User" onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="report"
          rules={[{ required: true, message: "Please select a reason" }]}
        >
          <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Checkbox value="spam" style={{ fontSize: "16px" }}>
                Spam
              </Checkbox>
            </div>
            <div>
              <Checkbox value="abusive" style={{ fontSize: "16px" }}>
                Abusive Language
              </Checkbox>
            </div>
            <div>
              <Checkbox value="harassment" style={{ fontSize: "16px" }}>
                Harassment
              </Checkbox>
            </div>
            <div>
              <Checkbox
                onChange={onOtherCheckboxChange}
                style={{ fontSize: "16px" }}
              >
                Other
              </Checkbox>
            </div>
          </Checkbox.Group>
        </Form.Item>

        {showOtherInput && (
          <Form.Item
            name="otherReason"
            rules={[{ required: true, message: "Please specify the reason" }]}
          >
            <Input.TextArea placeholder="Please specify" />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            className="report-submit-btn"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

ReportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default memo(ReportModal);
