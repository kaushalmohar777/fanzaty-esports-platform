import { useTranslation } from "react-i18next";
import "./ForgotPassword.scss";
import { Form, Input, Button } from "antd";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation("common");

  const onFinish = async (values) => {
    console.log("Received values:", values);
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
                <Button type="primary" htmlType="submit" className="submit-btn">
                  {t("forgot_password.button")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
