
import { memo } from "react";
import "./consumerProfile.scss";
import { Col, Row } from "antd";
import { Button } from "antd";
import { Table } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Userprofileimg from "../../assets/images/user-profile-img.svg";
import msgimg from "../../assets/icons/msg.svg";
import Thumbimg from "../../assets/icons/thumb.svg";
import Lockbimg from "../../assets/icons/lock.svg";
import userimg from "../../assets/icons/user-rating.svg";
import starimg from "../../assets/icons/star.svg";

/* eslint-disable react-refresh/only-export-components */
const ConsumerProfile = () => {
    const { t } = useTranslation("common");
  const dataSource = [
    {
      age: 10,
      address: 'Win Ratio',
    },
    {
      age: 42,
      address: '10 Downing Street',
    },
    {
        age: 42,
        address: '10 Downing Street',
      },
      {
        age: 42,
        address: '10 Downing Street',
      },
      {
        age: 42,
        address: '10 Downing Street',
      },
  ];
  
  const columns = [
    {
      dataIndex: 'age',
      key: 'age',
    },
    {
      dataIndex: 'address',
      key: 'address',
    },
    
  ];
  
  return (
    <div className="Container-main-box">
    <Row>
    <Col span={7}>
         <div className="section-right-pannel bg-dark-black border-1">
            <div className="user-profile-section">
                 <img className="profile-img" src={Userprofileimg} alt=""/>
                 <h1 className="profile-title">Fanzaty</h1>
                 <h3 className="text-online">Online</h3>
                 <span className="text-date">09 July 8:03 AM</span>
            </div>
            <table className="profile-table">
                <tbody>
                    <tr>
                        <td>Win Ratio</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Games Played</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Win Ratio</td>
                        <td>10%</td>
                    </tr>
                    <tr>
                        <td>Review</td>
                        <td>9.1</td>
                    </tr>
                    <tr>
                        <td>Region </td>
                        <td>Canada</td>
                    </tr>
                </tbody>
            </table>
            {/* <Table className="profile-table" dataSource={dataSource} columns={columns} />; */}
            <div className="border-btn-list">
                <div className="icon-box">
                    <img src={msgimg} alt="" />
                </div>
                <div className="text-box">
                <h3 className="text-bio">Message</h3>
                </div>
            </div>
            <div className="border-btn-list">
                <div className="icon-box">
                    <img src={Thumbimg} alt="" />
                </div>
                <div className="text-box">
                <h3 className="text-bio">Report</h3>
                </div>
            </div>
            <div className="border-btn-list">
                <div className="icon-box">
                    <img src={Lockbimg} alt="" />
                </div>
                <div className="text-box">
                <h3 className="text-bio">Block</h3>
                </div>
            </div>
            <Button type="primary" className="btn-boi">Bio</Button>
         </div>
      </Col>
      <Col span={17}>
         <div className="profile-right-section">
            <Row>
            <Col span={7}>
                <div className="section-right-pannel left-pannel bg-dark-black border-1 ">
                <h2 className="text-invited">UNO ID</h2>
                 <h3 className="text-invited-num">23235</h3>
                     <table className="profile-table table-loses">
                        <tbody>
                            <tr>
                                <td>100</td>
                                <td>Wins</td>
                            </tr>
                            <tr>
                                <td>80</td>
                                <td>Loses</td>
                            </tr>
                        </tbody>
                     </table>
                     <Button type="primary" className="btn-boi btn-invite">Invite</Button>
                </div>  
                </Col>
                <Col span={7}>
                   <div className="section-right-pannel left-pannel bg-dark-black border-1">
                   <h2 className="text-invited">Pubg</h2>
                 <h3 className="text-invited-num">ZZ10</h3>
                     <table className="profile-table table-loses">
                        <tbody>
                            <tr>
                                <td>Wins</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>Loses</td>
                                <td>20</td>
                            </tr>
                        </tbody>
                     </table>
                     <Button type="primary" className="btn-boi btn-invite">Invite</Button>
                    
                   </div>  
                </Col>
                <Col span={7}>
                <div className="section-right-pannel left-pannel bg-dark-black border-1">
                <h2 className="text-invited">FC24</h2>
                 <h3 className="text-invited-num">PS3 XBI</h3>
                     <table className="profile-table table-loses">
                        <tbody>
                            <tr>
                                <td>Wins</td>
                                <td>80</td>
                            </tr>
                            <tr>
                                <td>Loses</td>
                                <td>40</td>
                            </tr>
                        </tbody>
                     </table>
                     <Button type="primary" className="btn-boi btn-invite">Invite</Button>
                </div>  
                </Col>
            </Row>
            <div className="comment-section">
                <Row>
                    <Col span={24}>
                       <div className="section-right-pannel left-pannel bg-dark-black border-1 ">
                           <div className="comment-total-sectipn">
                              <div className="text-comment">
                                <h3>Comments</h3>
                              </div>
                              <div className="total">
                              <h3>Total <span>(3)</span></h3>
                              </div>
                           </div>
                           <div className="ratings-section">
                              <img src={userimg} alt="" />
                              <div className="rating-content">
                                   <h5 className="rating-title">Wilma R. Levan</h5>
                                   <ul className="rating-list">
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                   </ul>
                                <p className="rating-date">
                                    <span>9 Jul 2024 / </span>
                                    <span>3:34AM</span>
                                </p>
                              </div>
                           </div>
                           <div className="ratings-section">
                              <img src={userimg} alt="" />
                              <div className="rating-content">
                                   <h5 className="rating-title">Wilma R. Levan</h5>
                                   <ul className="rating-list">
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                   </ul>
                                <p className="rating-date">
                                    <span>9 Jul 2024 / </span>
                                    <span>3:34AM</span>
                                </p>
                              </div>
                           </div>
                           <div className="ratings-section">
                              <img src={userimg} alt="" />
                              <div className="rating-content">
                                   <h5 className="rating-title">Wilma R. Levan</h5>
                                   <ul className="rating-list">
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                   </ul>
                                <p className="rating-date">
                                    <span>9 Jul 2024 / </span>
                                    <span>3:34AM</span>
                                </p>
                              </div>
                           </div>
                           <div className="ratings-section">
                              <img src={userimg} alt="" />
                              <div className="rating-content">
                                   <h5 className="rating-title">Wilma R. Levan</h5>
                                   <ul className="rating-list">
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                      <li><img src={starimg} alt="" /></li>
                                   </ul>
                                <p className="rating-date">
                                    <span>9 Jul 2024 / </span>
                                    <span>3:34AM</span>
                                </p>
                              </div>
                           </div>
                       </div>
                       
                    </Col>
                </Row>
            </div>
         </div>
      </Col>
      
    </Row>
  </div>
  );
};

export default memo(ConsumerProfile);
