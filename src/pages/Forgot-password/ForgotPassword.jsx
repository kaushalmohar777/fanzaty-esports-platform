import { useTranslation } from "react-i18next";
import "./ForgotPassword.scss";
import { Form, Input, Button, InputNumber } from "antd";
import { forgotPassword } from "../../services/Api";
import { useState } from "react";
import { postApiRequest } from "../../services/postApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation("common");
  const [isShow, setIsShow] = useState(1);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setEmail(values.email);
    try {
      const response = await forgotPassword(
        values?.email ? values?.email : email
      );
      if (response?.success) {
        setIsShow(2);
        form.resetFields();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const onOtpSend = async (values) => {
    try {
      const response = await postApiRequest(END_POINTS.VERIFY_OTP, values);
      if (response?.success) {
        setIsShow(3);
        form.resetFields();
        showToast(response.message, "success");
        setEmail(response?.email);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match!"));
    },
  });

  const submitPassword = async (values) => {
    const paylaod = { ...values, email: email };
    try {
      const response = await postApiRequest(
        END_POINTS.UPDATE_PASSWORD,
        paylaod
      );
      if (response.success) {
        navigate("/login");
        form.resetFields();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <section className="forgot-pass-section">
      <div className="forgot-main-box">
        <div>
          <h1 className="forgot-pass-heading">
            {t("forgot_password.heading")}
          </h1>
          <p className="forgot-pass-para">{t("forgot_password.description")}</p>
          <div className="forgot-up-box">
            {isShow === 1 ? (
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                initialValues={{ prefix: "86" }}
              >
                <Form.Item
                  name="email"
                  label={t("signUp.email")}
                  rules={[
                    {
                      type: "email",
                      message: t("signUp.invalidEmail"),
                    },
                    {
                      required: true,
                      message: t("signUp.requiredField", {
                        field: t("signUp.email"),
                      }),
                    },
                  ]}
                >
                  <Input placeholder={t("signUp.emailPlaceholder")} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-btn"
                  >
                    {t("forgot_password.button")}
                  </Button>
                </Form.Item>
              </Form>
            ) : isShow === 2 ? (
              <Form
                layout="vertical"
                form={form}
                onFinish={onOtpSend}
                style={{ maxWidth: 600 }}
                initialValues={{ prefix: "86" }}
              >
                <Form.Item
                  label="Enter OTP"
                  name="otp"
                  rules={[{ required: true, message: "Please input!" }]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-btn"
                  >
                    {t("forgot_password.button")}
                  </Button>
                  <Button
                    type="primary"
                    onClick={onFinish}
                    className="submit-btn"
                    style={{ marginLeft: "10px" }}
                  >
                    {t("forgot_password.resend")}
                  </Button>
                </Form.Item>
              </Form>
            ) : isShow === 3 ? (
              <>
                <Form
                  name="update_password"
                  onFinish={submitPassword}
                  layout="vertical"
                  className="update-password-form"
                >
                  <Form.Item
                    name="newPassword"
                    label={t("update_password_form.new_password")}
                    rules={[
                      {
                        required: true,
                        message: t("update_password_form.input_new_password"),
                      },
                      {
                        min: 6,
                        message: t("update_password_form.password_min_length"),
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      autoComplete="newPassword"
                      placeholder={t("update_password_form.enter_new_password")}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label={t("update_password_form.confirm_new_password")}
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: t("update_password_form.confirm_new_password"),
                      },
                      validateConfirmPassword,
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      placeholder={t(
                        "update_password_form.confirm_new_password"
                      )}
                      autoComplete="confirmpassword"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="submit-btn"
                      htmlType="submit"
                    >
                      {t("update_password_form.update_password")}
                    </Button>
                  </Form.Item>
                </Form>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
