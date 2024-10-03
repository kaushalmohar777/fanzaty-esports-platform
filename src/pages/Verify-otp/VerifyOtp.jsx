import { useTranslation } from "react-i18next";
import "./VerifyOtp.scss";
import { Form, Button, InputNumber } from "antd";
import { postApiRequest } from "../../services/postApiRequest";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { END_POINTS } from "../../Helper/Constant";
import { forgotPassword } from "../../services/Api";
import { useState } from "react";
import { getLocalStorageData } from "../../shared/commonFunction";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation("common");
  const [email] = useState(getLocalStorageData("email"));
  const navigate = useNavigate();

  const onOtpSend = async (values) => {
    try {
      const response = await postApiRequest(END_POINTS.VERIFY_OTP, values);
      if (response?.success) {
        form.resetFields();
        showToast(response.message, "success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error?.message);
      showToast(error?.error?.message, "success");
    }
  };

  const resendotp = async () => {
    try {
      const response = await forgotPassword(email);
      if (response?.success) {
        form.resetFields();
        showToast(response.message, "success");
      }
    } catch (error) {
      console.log(error?.message);
      showToast(error?.error?.message, "error");
    }
  };

  return (
    <section className="forgot-pass-section">
      <div className="forgot-main-box">
        <div>
          <h1 className="forgot-pass-heading">
            {t("forgot_password.otp_heading")}
          </h1>
          <div className="forgot-up-box">
            <Form
              layout="vertical"
              form={form}
              onFinish={onOtpSend}
              style={{ maxWidth: 600 }}
              initialValues={{ prefix: "86" }}
            >
              <Form.Item
                label={t("forgot_password.enter_otp")}
                name="otp"
                rules={[
                  {
                    required: true,
                    message: t("forgot_password.otp_validation"),
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter otp"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="submit-btn">
                  {t("forgot_password.button")}
                </Button>
                <Button
                  type="primary"
                  onClick={resendotp}
                  className="submit-btn"
                  style={{ marginLeft: "10px" }}
                >
                  {t("forgot_password.resend")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyOtp;
