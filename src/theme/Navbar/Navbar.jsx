import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Button, Layout, Drawer } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.svg";
import {
  headerStyle,
  logoStyle,
  logoImageStyle,
  menuDesktopStyle,
  menuMobileStyle,
  loginButtonStyle,
  menuStyle,
  menuItemStyle,
  activeStyle,
  drawerBodyStyle,
} from "./NavbarStyles";
import "./Navbar.scss";
import { useTranslation } from "react-i18next";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../shared/commonFunction";

const { Header } = Layout;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [language, setLanguage] = useState(getLocalStorageData("language"));
  const { t, i18n } = useTranslation("common");

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    document.body.dir = lng === "ar" ? "rtl" : "ltr";
    setLocalStorageData("language", lng);
  };

  useEffect(() => {
    const language = getLocalStorageData("language");
    setLanguage(language);
  }, [language]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { key: "/", label: t("menu.home") },
    { key: "/tournaments", label: t("menu.tournaments") },
    { key: "/leadership-board", label: t("menu.leaderboard") },
    { key: "/academy", label: t("menu.academy") },
    { key: "/contact-us", label: t("menu.contact_us") },
    { key: "/about-us", label: t("menu.about_us") },
    { key: "/join-our-community", label: t("menu.join_our_community") },
  ];

  return (
    <Header style={headerStyle}>
      <div className="logo" style={logoStyle}>
        <Link to="/">
          <img src={logo} alt="Company Logo" style={logoImageStyle} />
        </Link>
      </div>
      <div className="menu-desktop" style={menuDesktopStyle}>
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={menuStyle}
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>,
            style: location.pathname === item.key ? activeStyle : menuItemStyle,
          }))}
        />
      </div>
      <div className="menu-mobile" style={menuMobileStyle}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          style={menuItemStyle}
        />
      </div>
      <div style={menuItemStyle}>
        <span
          className={language === "ar" ? `selected-language` : `language`}
          onClick={() => changeLanguage("ar")}
        >
          Ar
        </span>
        /
        <span
          className={language === "en" ? `selected-language` : `language`}
          onClick={() => changeLanguage("en")}
        >
          En
        </span>
      </div>
      <Link to="/sign-up">
        <Button type="primary" icon={<UserOutlined />} style={loginButtonStyle}>
          {t("menu.sign_up")}
        </Button>
      </Link>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
        styles={{ body: drawerBodyStyle }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          style={menuStyle}
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link to={item.key}>{item.label}</Link>,
            style: location.pathname === item.key ? activeStyle : menuItemStyle,
            onClick: onClose,
          }))}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
