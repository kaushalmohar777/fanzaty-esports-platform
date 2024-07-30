import "./Footer.scss";
import { Col, Row, Menu } from "antd";
import footerLogo from "../../assets/images/footer-logo.svg";
import footerLogo2 from "../../assets/images/footer-logo2.svg";
import { useTranslation } from "react-i18next";
import { activeStyle, menuItemStyle, menuStyle } from "../Navbar/NavbarStyles";
import { Link } from "react-router-dom";
import facebook from "../../assets/icons/facebook.svg";
import tiktok from "../../assets/icons/tiktok.svg";
import instagram from "../../assets/icons/Instagram.svg";
import message from "../../assets/icons/message.svg";
import socialYoutube from "../../assets/icons/social-youtube.svg";
import twitter from "../../assets/icons/twitter.svg";
import { useEffect, useState } from "react";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../shared/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../../features/language/language";

const Footer = () => {
  const { t, i18n } = useTranslation("common");
  const lang = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  const menuItems = [
    { key: "/", label: t("menu.home") },
    { key: "/tournaments", label: t("menu.tournaments") },
    { key: "/about-us", label: t("menu.about_us") },
    { key: "/contact-us", label: t("menu.contact_us") },
  ];

  const socialItems = [
    { href: "", image: twitter },
    { href: "", image: socialYoutube },
    { href: "", image: facebook },
    { href: "", image: instagram },
    { href: "", image: tiktok },
    { href: "", image: message },
  ];

  const [language, setLanguage] = useState(getLocalStorageData("language"));

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    document.body.dir = lng === "ar" ? "rtl" : "ltr";
    setLocalStorageData("language", lng);
    dispatch(setLang(lng));
  };

  useEffect(() => {
    const language = getLocalStorageData("language");
    setLanguage(language);
    dispatch(setLang(language));
  }, [language]);

  return (
    <section className="footer-section">
      <div className="container">
        <Row>
          <Col span={6}>
            <div>
              <img src={footerLogo} alt="footer-logo" />
            </div>
          </Col>
          <Col span={12}>
            <div className="footer-description">{t("footer.description")}</div>
            <div className="footer-menu-icons">
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                style={menuStyle}
                items={menuItems.map((item) => ({
                  key: item.key,
                  label: <Link to={item.key}>{item.label}</Link>,
                  style:
                    location.pathname === item.key
                      ? activeStyle
                      : menuItemStyle,
                }))}
              />
            </div>

            <div className="social-icons">
              {socialItems &&
                socialItems?.map((item, index) => {
                  return (
                    <div key={index}>
                      <a href={item.href}>
                        <img src={item.image} alt="" />
                      </a>
                    </div>
                  );
                })}
            </div>

            <div>
              <p className="copy-write">{t("footer.copyright")}</p>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <img src={footerLogo2} alt="footer-logo" />
            </div>

            <div className="footer-login-buttons">
              <Link to="/login" className="login-btn">
                {t("buttons.login")}
              </Link>
              <Link to="/sign-up" className="sign-up-btn">
                {t("buttons.sign_up")}
              </Link>
              <span
                className={lang === "ar" ? `selected-language` : `language`}
                onClick={() => changeLanguage("ar")}
              >
                Ar
              </span>
              /
              <span
                className={lang === "en" ? `selected-language` : `language`}
                onClick={() => changeLanguage("en")}
              >
                En
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Footer;
