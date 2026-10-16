import React, { useRef, useEffect } from 'react';
import { Container, Row, Col, CardImg } from 'reactstrap';
import Fard from "../images/fardin.png"

function HoverableDiv() {
  const myDiv = useRef(null);

  useEffect(() => {
    console.log(myDiv.current.offsetLeft, myDiv.current.offsetTop);
  }, []);
  return (
    <Container>
    <div className='mt-5'
      ref={myDiv}
    >
      <Row className="mb-1 mt-2 box1">
          <Col md={4}>
            <CardImg src={Fard} 
            className="denim"/>
          </Col>
      </Row>
          <div className='box2'>
            <div style={{position: 'absolute',right: 125}}>Here's the div on the left!</div>
{/*             <div style={{position: 'absolute', top: myDiv.current.offsetTop - 30, left: myDiv.current.offsetLeft - 90}}>Here's the div on the right!</div>
            <div style={{position: 'absolute', top: myDiv.current.offsetTop + 220, left: myDiv.current.offsetLeft - 90}}>Here's the div on the bottom!</div>
            <div style={{position: 'absolute', top: myDiv.current.offsetTop - 30, left: myDiv.current.offsetLeft + 90}}>Here's the div on the bottom!</div> */}
          </div>
    </div>
    </Container>
  );
}

export default HoverableDiv;
