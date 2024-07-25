import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Button, Layout, Drawer } from "antd";
import { UserOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
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
  clearLocalStorageData,
  getLocalStorageData,
  setLocalStorageData,
} from "../../shared/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Dropdown, Space } from "antd";
import bell from "../../assets/icons/Bell.svg";
// import userprofile from "../../assets/images/user-profile-img.svg";
import { setLoginState } from "../../features/login/loginSlice";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import userProfile from "../../assets/icons/user.svg";
import bellIcon from "../../assets/icons/Bell.svg";
import messageIcon from "../../assets/icons/message-icon.svg";
import logOut from "../../assets/icons/logout.svg";

const { Header } = Layout;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [language, setLanguage] = useState(getLocalStorageData("language"));
  const { t, i18n } = useTranslation("common");
  const isLogin = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorageData("token");
    if (token) {
      dispatch(setLoginState(true));
      getUserData();
    }
  }, [isLogin]);

  const getUserData = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_USER_DATA);
      if (response.success) {
        setUserData(response.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleLogout = () => {
    const language = getLocalStorageData("language");
    clearLocalStorageData();
    setLocalStorageData("language", language);
    dispatch(setLoginState(false));
    navigate("/login");
  };

  const items = [
    {
      label: (
        <div className="user-email-username">
          <span>{userData?.email}</span>
          <br />
          <span className="user-name">{userData?.userName}</span>
        </div>
      ),
      icon: (
        <img
          src={userData?.avatarUrl}
          alt="avatar-img"
          className="user-profile-img"
        />
      ),
    },
    {
      label: t("dropdown.myProfile"),
      icon: (
        <img
          src={userProfile}
          alt="avatar-img"
          className="user-profile-avatar"
        />
      ),
      className: "my-profile-item",
    },

    {
      label: t("dropdown.tournament"),
      icon: (
        <img src={bellIcon} alt="avatar-img" className="user-profile-avatar" />
      ),
    },

    {
      label: t("dropdown.message"),
      icon: (
        <img
          src={messageIcon}
          alt="avatar-img"
          className="user-profile-avatar"
        />
      ),
    },
    {
      type: "divider",
    },
    {
      label: t("dropdown.logout"),
      icon: (
        <img src={logOut} alt="logout-img" className="user-profile-avatar" />
      ),
      onClick: handleLogout,
    },
  ];

  const menuProps = {
    items,
  };

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
      {!isLogin ? (
        <Link to="/sign-up">
          <Button
            type="primary"
            icon={<UserOutlined />}
            style={loginButtonStyle}
          >
            {t("menu.sign_up")}
          </Button>
        </Link>
      ) : (
        <div className="noti-join-tou">
          <Link to="/join-tournament">
            <Button
              type="primary"
              icon={<UserOutlined />}
              style={loginButtonStyle}
            >
              {t("menu.join_tournament")}
            </Button>
          </Link>

          <Link to="/notification" className="noti">
            <Badge count={1} className="notification-bell">
              <img src={bell} alt="bell-img-load" />
            </Badge>
          </Link>

          <Dropdown
            trigger={["click"]}
            menu={menuProps}
            className="user-detail-dropdown"
          >
            <Button>
              <Space>
                {userData?.userName}{" "}
                <img
                  src={userData?.avatarUrl}
                  alt="user-profile"
                  className="user-profile-img"
                />
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      )}

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
