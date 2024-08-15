import "./EditUserProfile.scss";
import { useSelector } from "react-redux";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Spin,
} from "antd";
import { useTranslation } from "react-i18next";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { memo, useEffect } from "react";
import moment from "moment"; // Import your action to fetch country data
import { END_POINTS } from "../../Helper/Constant";
import { putApiRequest } from "../../services/putApiRequest";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { useNavigate } from "react-router-dom";
/* eslint-disable react-refresh/only-export-components */

const EditUserProfile = () => {
  const { t } = useTranslation("common");
  const userData = useSelector((state) => state.user.userData);
  const countryData = useSelector((state) => state.country.countryData);
  const loading = useSelector((state) => state.country.loading);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;

  useEffect(() => {
    console.log("countryData", countryData);
  }, [countryData]);

  useEffect(() => {
    if (userData) {
      const formattedDob = userData?.dob ? moment(userData?.dob) : null;
      form.setFieldsValue({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        nickName: userData?.nickName,
        phone: userData?.phone,
        email: userData?.email,
        gender: userData?.gender ? userData.gender.toLowerCase() : undefined,
        prefix: userData?.prefix || "Select country code",
        dob: formattedDob,
      });
    }
  }, [userData, form]);

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
    const payload = { ...values, dob: moment(values.dob).format("YYYY-MM-DD") };
    try {
      const response = await putApiRequest(END_POINTS.UPDATE_PROFILE, payload);
      if (response?.success) {
        showToast(response?.message, "success");
        form.resetFields();
        navigate("/");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section>
      <div className="container">
        <h1 className="edit-account-heading">
          {t("signUp.edit_user_profile")}
        </h1>
        <div className="edit-user-profile-box">
          <div className="user-avatar">
            <img src={userData?.avatarUrl} alt="loading-user-avatar" />
          </div>
          <p className="fix-user-name">{userData?.userName}</p>

          <div className="edit-user-form">
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

              <Form.Item name="nickName" label={t("signUp.nick_name")}>
                <Input placeholder={t("signUp.nick_name_placeholder")} />
              </Form.Item>

              <Form.Item
                name="phone"
                label={t("signUp.phone")}
                rules={[
                  {
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
                label={t("signUp.date_picker")}
                name="dob"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Space
                  direction="vertical"
                  style={{
                    width: "100%",
                  }}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                      height: "62px",
                      backgroundColor: "#141414",
                      color: "#fff",
                    }}
                    format="YYYY-MM-DD"
                    value={form.getFieldValue("dob")}
                    onChange={(date) => form.setFieldsValue({ dob: date })}
                  />
                </Space>
              </Form.Item>
              <Form.Item
                name="gender"
                label={t("signUp.gender")}
                style={{ textAlign: "start" }}
              >
                <Radio.Group style={{ color: "#fff" }}>
                  <Radio value="male" style={{ color: "#fff" }}>
                    {t("signUp.male")}
                  </Radio>
                  <Radio value="female" style={{ color: "#fff" }}>
                    {t("signUp.female")}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item style={{ textAlign: "start", marginBottom: "36px" }}>
                <Button type="primary" className="submit-btn" htmlType="submit">
                  {t("signUp.update_form")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(EditUserProfile);