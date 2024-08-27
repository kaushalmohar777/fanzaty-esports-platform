/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input, Select, message } from "antd";
import { useTranslation } from "react-i18next";
import "./SignUp.scss";
import { useEffect, useState } from "react";
import plusIcon from "../../assets/images/plus-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { fileUploadApi } from "../../services/fileUpload";
import { useSelector } from "react-redux";

const SignUp = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isFormShow, setIsFormShow] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [allAvatarImages, setAllAvatarImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const countryData = useSelector((state) => state.country.countryData);
  const isLogin = useSelector((state) => state.login.isLogin);

  useEffect(() => {
    getAllAvatarImages();
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  const getAllAvatarImages = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_AVATAR_IMAGES);
      setAllAvatarImages(response.avtarurl);
    } catch (error) {
      console.log(error);
      showToast(error.error.message, "error");
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        showSearch
        style={{ width: 150 }}
        placeholder={t("signUp.selectCountryCode")}
        optionFilterProp="children"
        filterOption={(input, option) => {
          const countryData = option["data-country"];
          if (!countryData) return false;

          const searchValue = input.toLowerCase();
          return (
            countryData.callingCode.toLowerCase().includes(searchValue) ||
            countryData.name.toLowerCase().includes(searchValue)
          );
        }}
      >
        {countryData &&
          countryData?.map((item, index) => (
            <Option
              value={item.callingCode}
              key={index}
              className="country-option"
              data-country={item}
            >
              <span>{item.callingCode}</span>
              <img
                src={item.flag}
                alt={`${item.name} flag`}
                className="flag-img"
              />
            </Option>
          ))}
      </Select>
    </Form.Item>
  );

  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject(
        t("signUp.requiredField", { field: t("signUp.phone") })
      );
    }

    const prefix = form.getFieldValue("prefix");
    const fullPhoneNumber = `${prefix}${value}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

    if (phoneNumber && phoneNumber.isValid()) {
      return Promise.resolve();
    }
    return Promise.reject(t("signUp.invalidPhoneNumber"));
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    const payload = { ...values, avatarUrl: selectedAvatar };
    try {
      const response = await fileUploadApi(END_POINTS.SIGN_UP, payload);
      if (response.data.success) {
        form.resetFields();
        setIsLoading(false);
        showToast(response.data.message, "success");
        navigate("/login");
      }
    } catch (error) {
      message.error(t("signUp.formSubmissionFailed"));
      setIsLoading(false);
    }
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  return (
    <section className="sign-up-section">
      <div className="signup-main-box">
        <div>
          <h1 className="sign-up-heading">{t("signUp.heading")}</h1>
        </div>
        <div className="sign-up-box">
          {isFormShow && isFormShow ? (
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              initialValues={{ prefix: "Select country code" }}
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
                name="userName"
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
                    validator: validatePhoneNumber,
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
              <div className="avatar-select-img">
                <p>{t("signUp.select_avatar")}</p>
                <img
                  src={plusIcon}
                  alt="select-file-img"
                  onClick={() => setIsFormShow(false)}
                />
              </div>
              {selectedAvatar && selectedAvatar !== null ? (
                <>
                  <img
                    src={selectedAvatar}
                    alt="loading-avatar"
                    className="selected-avatar"
                  />
                </>
              ) : null}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-btn"
                  block
                  loading={isLoading}
                >
                  {t("signUp.submit")}
                </Button>
              </Form.Item>
              <p className="already-have-account">
                {t("signUp.already_account")}
                <Link to="/login" className="login-txt">
                  {t("buttons.login")}
                </Link>
              </p>
            </Form>
          ) : (
            <>
              <div className="avatar-img-box">
                {allAvatarImages.map((item, index) => (
                  <img
                    src={item}
                    alt="avatar"
                    key={index}
                    className={`avatar-img ${
                      selectedAvatar === item ? "selected" : ""
                    }`}
                    onClick={() => handleAvatarClick(item)}
                  />
                ))}
              </div>
              <Form.Item>
                <Button
                  type="primary"
                  className="submit-btn"
                  block
                  onClick={() => setIsFormShow(true)}
                >
                  {t("signUp.select")}
                </Button>
              </Form.Item>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
