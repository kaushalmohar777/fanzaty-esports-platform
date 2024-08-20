import { useState, memo } from "react";
import "./RegisterTab.scss";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";

const RegisterTab = () => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState("tab1");
  const [tabContents, setTabContents] = useState({
    tab1: t("tab-1 content"),
    tab2: t("tab-2 content"),
    tab3: t("tab-3 content"),
    tab4: t("tab-4 content"),
    tab5: t("tab-5 content"),
    tab6: t("tab-6 content"),
  });

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  const handleContentChange = (e) => {
    setTabContents({
      ...tabContents,
      [activeTab]: e.target.innerText,
    });
  };

  return (
    <div className="container">
      <div className="tabsection">
        <Tabs activeKey={activeTab} onTabClick={handleTabClick}>
          <Tabs.TabPane tab={t("details")} key="tab1">
            <div
              className="tab-content"
              contentEditable
              onBlur={handleContentChange}
            >
              {tabContents.tab1}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("prize pool")} key="tab2">
            <div
              className="tab-content"
              contentEditable
              onBlur={handleContentChange}
            >
              {tabContents.tab2}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("players")} key="tab3">
            <div
              className="tab-content"
              contentEditable
              onBlur={handleContentChange}
            >
              {tabContents.tab3}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("bracket")} key="tab4">
            <div
              className="tab-content"
              contentEditable
              onBlur={handleContentChange}
            >
              {tabContents.tab4}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("chat")} key="tab5">
            <div
              className="tab-content"
              contentEditable
              onBlur={handleContentChange}
            >
              {tabContents.tab5}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("score submission")} key="tab6">
            <div
              className="tab-content"
              contentEditable
              onBlur={handleContentChange}
            >
              {tabContents.tab6}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default memo(RegisterTab);
