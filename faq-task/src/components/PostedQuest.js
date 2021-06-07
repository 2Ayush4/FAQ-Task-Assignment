import React , {Component} from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Answers from './Answers';


class PostedQuest extends Component {
    constructor(){
        super()

    }

    render(){
      
        const arr = this.props.quesdetails.answer
        // console.log(arr)

        return (
            <Container fluid >
                <br></br>
                <Row>
                    
                    <Col> <h4> {this.props.quesdetails.question} </h4> <Button>Post your answer</Button></Col>
                    {arr.map(function (data, index) {
                       return <Answers answer = {data} />
                    } ) 
                    }
                
                </Row>
            </Container>
        )
    }


}

export default PostedQuest;