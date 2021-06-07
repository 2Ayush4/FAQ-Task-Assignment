import React , {Component} from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap'
import PostedQuest from './PostedQuest'
import datas from './qa.json'


class FAQ extends Component {
    constructor(){
        super()
    }

    render(){
        return (
            <div className = "container-fluid">
                <h1 style = {{ "textAlign" : "center"}}>Post a Question</h1>
                <InputGroup className = "mb-3" >
                    <InputGroup.Prepend>
                        <Button variant = "outline-secondary"> Post</Button>
                    </InputGroup.Prepend>
                    <FormControl aria-describedby= "basic-addon1" /> 
                </InputGroup>
                <Button variant="outline-primary">Search your posted Question</Button>
                <Button variant="outline-primary">Search question by category</Button>
                {datas.map(function (data, index) {
                    return <PostedQuest quesdetails = {data} key = {data.number} />
                } )}
            </div>
        )
    }
}

export default FAQ;