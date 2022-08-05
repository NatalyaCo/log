import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


const Footer = () => {
  return (
    <Footer
    style={{
      width: "100%",
      position: "relative",
      bottom: "0",
      display: "flex",
      justifyContent: "center",
    }}
    > 
    <Container>
      <Row>
        <Col className = "text-center py-3">Life is Better with JAZZERCISE        </Col>
      </Row>
    </Container>
    
    </Footer>
  );
};

export default Footer