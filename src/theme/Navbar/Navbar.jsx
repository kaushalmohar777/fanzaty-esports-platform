import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Drawer, Dropdown, Badge, Space } from "antd";
import { UserOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  clearLocalStorageData,
  getLocalStorageData,
  setLocalStorageData,
} from "../../shared/commonFunction";
import { setLoginState } from "../../features/login/loginSlice";
import { getApiRequest } from "../../services/getApiRequest";
import { END_POINTS } from "../../Helper/Constant";
import { setUser } from "../../features/user/userSlice";
import { setCountry } from "../../features/country/countrySlice";
import { showToast } from "../../shared/sharedComponents/ToasterMessage/ToasterMessage";
import { setLang } from "../../features/language/language";
import logo from "../../assets/images/logo.svg";
import userProfile from "../../assets/icons/user.svg";
import bellIcon from "../../assets/icons/Bell.svg";
import messageIcon from "../../assets/icons/message-icon.svg";
import logOut from "../../assets/icons/logout.svg";
import "./Navbar.scss";
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
import message from "../../assets/images/message.svg";
import { fetchNotificationData } from "../../features/notification/notificationSlice";
import tournamentNotify from "../../assets/images/notify-bell-icon.svg";
import cup from "../../assets/images/cup.svg";

const { Header } = Layout;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation("common");
  const isLogin = useSelector((state) => state.login.isLogin);
  const lang = useSelector((state) => state.language.language);
  const notificationLength = useSelector(
    (state) => state?.notification?.notificationLength
  );
  const data = useSelector((state) => state?.notification?.data);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = getLocalStorageData("token");
    if (token) {
      dispatch(setLoginState(true));
      dispatch(fetchNotificationData());
      fetchUserData();
    }
    fetchCountryData();
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (data) {
      const notificationItems = data?.map((notification) => ({
        icon: <img src={tournamentNotify} alt="tournament-notify-img" />,
        label: (
          <>
            <div className="congratulation">Congratulations!</div>
            <div className="congratulation">{notification.text}</div>
          </>
        ),
        className: "notification-class",
        onClick: () => {
          console.log(`Notification ${notification._id} clicked`);
        },
      }));
      setNotifications(notificationItems);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedLanguage = getLocalStorageData("language");
    dispatch(setLang(storedLanguage || "en"));
  }, [lang, dispatch]);

  const fetchCountryData = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_ALL_COUNTRY_CODE);
      if (response.success) {
        dispatch(setCountry(response.countries));
      }
    } catch (error) {
      console.log(error);
      showToast(error.message, "error");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getApiRequest(END_POINTS.GET_USER_DATA);
      if (response.success) {
        setUserData(response.user);
        dispatch(setUser(response.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeLanguage = (lng) => {
    setLocalStorageData("language", lng);
    i18n.changeLanguage(lng);
    document.body.dir = lng === "ar" ? "rtl" : "ltr";
    if (lng === "ar") {
      document.body.classList.add("font-arabic");
      document.body.classList.remove("font-english");
    } else {
      document.body.classList.add("font-english");
      document.body.classList.remove("font-arabic");
    }
    dispatch(setLang(lng));
  };

  const handleLogout = () => {
    const currentLanguage = getLocalStorageData("language");
    clearLocalStorageData();
    setLocalStorageData("language", currentLanguage);
    dispatch(setLoginState(false));
    navigate("/login");
  };

  const menuItems = [
    { key: "/", label: t("menu.home") },
    { key: "/tournaments", label: t("menu.tournaments") },
    { key: "/leadership-board", label: t("menu.leaderboard") },
    { key: "/academy", label: t("menu.academy") },
    { key: "/contact-us", label: t("menu.contact_us") },
    { key: "/about-us", label: t("menu.about_us") },
    ...(lang === "ar"
      ? [{ key: "/join-our-community", label: t("menu.join_our_community") }]
      : []),
  ];

  const userMenuItems = [
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
      label: <Link to="/profile">{t("dropdown.myProfile")}</Link>,
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
      icon: <img src={cup} alt="avatar-img" className="user-profile-avatar" />,
    },
    {
      label: <Link to="/messages">{t("dropdown.message")}</Link>,
      icon: (
        <img
          src={messageIcon}
          alt="avatar-img"
          className="user-profile-avatar"
        />
      ),
    },
    { type: "divider" },
    {
      label: t("dropdown.logout"),
      icon: (
        <img src={logOut} alt="logout-img" className="user-profile-avatar" />
      ),
      onClick: handleLogout,
    },
  ];

  const [notificationOpen, setNotificationOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === "3") {
      setNotificationOpen(false);
    }
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setNotificationOpen(nextOpen);
    }
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
          onClick={() => setOpen(true)}
          style={menuItemStyle}
        />
      </div>
      <div style={menuItemStyle}>
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
          <div className="noti">
            <Dropdown
              menu={{
                items: notifications,
                onClick: handleMenuClick,
              }}
              onOpenChange={handleOpenChange}
              open={notificationOpen}
              trigger={["click"]}
              arrow
              overlayClassName="notification"
            >
              <Space>
                <Badge count={notificationLength} className="notification-bell">
                  <img src={bellIcon} alt="bell-img" />
                </Badge>
              </Space>
            </Dropdown>
          </div>

          {location.pathname === "/messages" ? (
            <div className="message-img">
              <img src={message} alt="message-img" />
            </div>
          ) : null}

          <Dropdown
            trigger={["click"]}
            overlay={<Menu items={userMenuItems} />}
            className="user-detail-dropdown"
          >
            <Button>
              <Space>
                <div className="user-name-navbar">{userData?.userName}</div>
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
        onClose={() => setOpen(false)}
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
            onClick: () => setOpen(false),
          }))}
        />
      </Drawer>
    </Header>
  );
};

export default Navbar;
