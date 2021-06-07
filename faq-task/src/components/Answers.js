import { Button } from 'bootstrap';
import React , {Component} from 'react';
import { Col, Container, Row } from 'react-bootstrap';


class Answers extends Component {
    constructor(){
        super()

    }

    render(){
 

        return (
            <Container fluid >
                <br></br>
                <Row>
              
                    <Col>{this.props.answer}  </Col>
                    
                </Row>
            </Container>
        )
    }


}

export default Answers;