
import { memo } from "react";
import "./Regiter-Featured.scss";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FeaturedRegiter = () => {
    const { t } = useTranslation("common");
    return (
         <>
         <div className="featured-banner-section">
          <h1 className="register-title">Register now</h1>
        </div>
        <div className="timeline-section">
           <div className="container">
              <div className="main-box">
                 <div className="timline-content">
                    <h2 className="title-timeline">Timeline</h2>
                    <Row>
                    <Col span={5}>
                       <div className="section-right-pannel bg-dark-black border-green border-1">
                            <h2 className="timeline-box-title">1<small>st</small> March 2024</h2>
                            <p className="timeline-box-content">registration starts </p>
                       </div>
                    </Col>
                    <Col span={5}>
                    <div className="section-right-pannel bg-dark-black border-1 ">
                            <h2 className="timeline-box-title">3<small>st</small> March 2024</h2>
                            <p className="timeline-box-content">registration starts </p>
                       </div>
                    </Col>
                    <Col span={5}>
                    <div className="section-right-pannel bg-dark-black border-green border-1">
                            <h2 className="timeline-box-title">4<small>st</small> March 2024</h2>
                            <p className="timeline-box-content">registration starts </p>
                       </div>
                    </Col>
                    <Col span={5}>
                    <div className="section-right-pannel bg-dark-black border-1 ">
                            <h2 className="timeline-box-title">9<small>st</small> March 2024</h2>
                            <p className="timeline-box-content">registration starts </p>
                       </div>
                    </Col>
                 </Row>
                 </div>
                 
              </div>
           </div>
        </div>
        <div>
        <div>
    </div>
        </div>
         </>
        
       
    );
  };
  
  export default memo(FeaturedRegiter);