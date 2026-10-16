import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import { Link } from 'react-scroll';
import "./Burger.css"

class Burger extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right>
        <Container>
          <Row>
            <Col>
              <a id="home" href="/">Home</a>
            </Col>
            <Col>
              <a id="contact"  href="/contact">Contact</a>
            </Col>
            <Col >
            <Link to="aboutus" spy={true} smooth={true} offset={-40} duration={500}>About</Link>
            </Col>
            <Col >
              <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
            </Col>
          </Row>
        </Container>
      </Menu>
    );
  }
}

export default Burger