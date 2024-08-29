import { useTranslation } from "react-i18next";

import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../../features/login/loginSlice";
import { setLocalStorageData } from "../../shared/commonFunction";
import { login } from "../../services/Api";
import { useEffect, useState } from "react";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import "./Login.scss";

const Login = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.login.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await login(values.email, values.password);
      console.log("response: ", response);
      if (response.success) {
        setLocalStorageData("token", response.token);
        dispatch(setLoginState(true));
        form.resetFields();
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      showToast(error, "error");
      setIsLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-main-box">
        <div>
          <h1 className="login-heading">{t("signUp.login")}</h1>
        </div>
        <div className="login-up-box">
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
              <Input
                placeholder={t("signUp.emailPlaceholder")}
                autoComplete="email"
              />
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
                autoComplete="password"
              />
            </Form.Item>

            <Link to="/forgot-password">
              <p className="forgot-pass">{t("signUp.forgot_Password")}</p>
            </Link>

            <Form.Item>
              <Button
                type="primary"
                loading={isLoading}
                htmlType="submit"
                className="submit-btn"
              >
                {t("signUp.login")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
