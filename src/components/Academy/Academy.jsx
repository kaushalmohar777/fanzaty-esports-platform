/* eslint-disable react-refresh/only-export-components */
import { Button, Form, Input, message, Select } from "antd";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postApiRequest } from "../../services/postApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "./Academy.scss";

const Academy = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const countryData = useSelector((state) => state.country.countryData);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        showSearch
        style={{ width: 150 }}
        placeholder={t("joinAcademy.selectCountryCode")}
        optionFilterProp="children"
        filterOption={(input, option) => {
          const countryData = option["data-country"];
          if (!countryData) return false;

          const searchValue = input.toLowerCase();
          return (
            countryData.callingCode.toLowerCase().includes(searchValue) ||
            countryData.name.toLowerCase().includes(searchValue) ||
            countryData.alpha2Code.toLowerCase().includes(searchValue)
          );
        }}
      >
        {countryData &&
          countryData.map((item, index) => (
            <Select.Option
              value={item.callingCode}
              key={index}
              data-country={item}
            >
              <img
                src={item.flag}
                alt={`${item.name} flag`}
                className="flag-img"
              />
              <span className="calling-code">{item.callingCode}</span>
              <span className="alpha-calling-code">{item.alpha2Code}</span>
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );

  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject(
        t("joinAcademy.requiredField", { field: t("joinAcademy.phone") })
      );
    }
    const prefix = form.getFieldValue("prefix");
    const fullPhoneNumber = `${prefix}${value}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
    if (phoneNumber && phoneNumber.isValid()) {
      return Promise.resolve();
    }
    return Promise.reject(t("joinAcademy.invalidPhoneNumber"));
  };

  const onFinish = async (values) => {
    try {
      const response = await postApiRequest(END_POINTS.JOIN_ACADEMY, values);
      if (response.data.success) {
        showToast(response.data.message, "success");
        navigate("/confirmation");
      }
    } catch (error) {
      message.error(t("joinAcademy.formSubmissionFailed"));
      showToast(error?.response?.data?.message, "error");
    }
  };

  return (
    <section className="join-academy-section">
      <div className="signup-main-box">
        <h1 className="sign-up-heading">{t("joinAcademy.heading")}</h1>
        <div className="sign-up-box">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{ prefix: "Select country code" }}
          >
            <Form.Item
              name="firstName"
              label={t("joinAcademy.firstName")}
              rules={[
                {
                  required: true,
                  message: t("joinAcademy.requiredField", {
                    field: t("joinAcademy.firstName"),
                  }),
                },
              ]}
            >
              <Input placeholder={t("joinAcademy.firstNamePlaceholder")} />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={t("joinAcademy.lastName")}
              rules={[
                {
                  required: true,
                  message: t("joinAcademy.requiredField", {
                    field: t("joinAcademy.lastName"),
                  }),
                },
              ]}
            >
              <Input placeholder={t("joinAcademy.lastNamePlaceholder")} />
            </Form.Item>

            <Form.Item
              name="email"
              label={t("joinAcademy.email")}
              rules={[
                {
                  type: "email",
                  message: t("joinAcademy.invalidEmail"),
                },
                {
                  required: true,
                  message: t("joinAcademy.requiredField", {
                    field: t("joinAcademy.email"),
                  }),
                },
              ]}
            >
              <Input placeholder={t("joinAcademy.emailPlaceholder")} />
            </Form.Item>

            <Form.Item
              name="phone"
              label={t("joinAcademy.phone")}
              rules={[
                {
                  required: true,
                  validator: validatePhoneNumber,
                },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="submit-btn"
                block
              >
                {t("joinAcademy.submit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default memo(Academy);
