/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import "./SignUp.scss";

const SignUp = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values) => {
    console.log("Received values:", values);
    try {
      // const response = await axios.post("/api/your-endpoint", values);
      message.success(t("signUp.formSubmitted"));
      // console.log(response.data);
    } catch (error) {
      message.error(t("signUp.formSubmissionFailed"));
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <section className="sign-up-section">
      <div className="signup-main-box">
        <div>
          <h1 className="sign-up-heading">{t("signUp.heading")}</h1>
        </div>
        <div className="sign-up-box">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            initialValues={{ prefix: "86" }}
          >
            <Form.Item
              name="firstName"
              label={t("signUp.firstName")}
              rules={[
                {
                  required: true,
                  message: t("signUp.requiredField", {
                    field: t("signUp.firstName"),
                  }),
                },
              ]}
            >
              <Input placeholder={t("signUp.firstNamePlaceholder")} />
            </Form.Item>
            <Form.Item
              name="lastName"
              label={t("signUp.lastName")}
              rules={[
                {
                  required: true,
                  message: t("signUp.requiredField", {
                    field: t("signUp.lastName"),
                  }),
                },
              ]}
            >
              <Input placeholder={t("signUp.lastNamePlaceholder")} />
            </Form.Item>
            <Form.Item
              name="username"
              label={t("signUp.username")}
              rules={[
                {
                  required: true,
                  message: t("signUp.requiredField", {
                    field: t("signUp.username"),
                  }),
                },
                {
                  min: 4,
                  message: t("signUp.minLengthField", {
                    field: t("signUp.username"),
                    length: 4,
                  }),
                },
              ]}
            >
              <Input
                placeholder={t("signUp.usernamePlaceholder")}
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label={t("signUp.phone")}
              rules={[
                {
                  required: true,
                  message: t("signUp.requiredField", {
                    field: t("signUp.phone"),
                  }),
                },
                {
                  pattern: /^\d{10,15}$/,
                  message: t("signUp.invalidPhoneNumber"),
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>
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
            <Form.Item
              name="password"
              label={t("signUp.password")}
              rules={[
                {
                  required: true,
                  message: t("signUp.requiredField", {
                    field: t("signUp.password"),
                  }),
                },
                {
                  min: 6,
                  message: t("signUp.minLengthField", {
                    field: t("signUp.password"),
                    length: 6,
                  }),
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder={t("signUp.passwordPlaceholder")}
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                block
              >
                {t("signUp.submit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
