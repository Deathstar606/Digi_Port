import React from 'react';
import { CardImg, Row, Col } from 'reactstrap';
import { StaggeredText } from './TextAnimate';
import { motion } from 'framer-motion';
import gal1 from "../images/Brand Images/icons8-google-100.png"
import gal2 from "../images/Brand Images/icons8-kfc-chicken-100.png"
import gal3 from "../images/Brand Images/icons8-microsoft-50.png"
import gal4 from "../images/Brand Images/icons8-nissan-titan-96.png"
import gal5 from "../images/Brand Images/icons8-amazon-50.png"
import gal6 from "../images/Brand Images/icons8-discord-50.png"
import gal7 from "../images/Brand Images/icons8-nvidia-50.png"
import gal8 from "../images/Brand Images/icons8-amd-50.png"
import gal9 from "../images/Brand Images/icons8-ups-80.png"
import "../components/Brands.css"

function Brands() {
  
    return (
      <Row className='pt-5 pb-5 mb-5'>
        <Col md={4}>
            <motion.div
                className="pb-5"
                style={{backgroundColor: "black", paddingTop: "5%"}}
                initial = {{x: -100, opacity: 0}}
                transition={{duration: 1, type: "tween", ease: "easeIn"}}
                whileInView={{x: 0, opacity: 1}}
                viewport={{ once: true }}>
                <div>
                    <h1 className="m-5 text-white text-center"><StaggeredText text="Recognation"/></h1>
                </div>
            </motion.div>
        </Col>
        <Col md={8}>
            <div className='d-flex logos' style={{marginTop: '5%'}}>
                <div className="d-flex logos-slide" style={{position: "relative"}}>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal1}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal2}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal3}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal4}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal5}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal6}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal7}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal8}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal9}/>
                </div>
                <div className="d-flex logos-slide" style={{position: "relative"}}>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal1}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal2}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal3}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal4}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal5}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal6}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal7}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal8}/>
                    <CardImg style={{position: "relative", width: "120px", marginRight: "20px"}} src={gal9}/>
                </div>
            </div>
        </Col>
      </Row>
    )
  }

function ShowBrand() {
    return (
        <div className='pb-2 pt-1' style={{overflow: "hidden"}}>
            <Brands/>
        </div>
    )
}

export default ShowBrand