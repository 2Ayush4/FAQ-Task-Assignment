import React, {Component} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
// import Login from './Login'

class RegisterPage extends Component {
    constructor(){
        super()
        this.state = {
            userName :"",
            password : "",
            email : ""
        }
    }
    setEmpState = (e) => {

        this.setState ({
            [e.target.name ] : e.target.value
        })
  
    }
    handleLogin = (e) =>{
        e.preventDefault()

        const user = {
            userName : this.state.userName,
            password : this.state.password,
            email : this.state.email
        }
        this.setState ({
            userName :"",
            password : "",
            email : ""
        })
        axios.post('http://localhost:2000/register', {user} )
        .then(res => {

            console.log(res);
            console.log(res.data)
        }).catch(err =>
            console.log(err.response.data)
        )
    }

    render() {
        return (
            <React.Fragment>
            <div className = "container-fluid" >
            <h1 style = {{ "textAlign" : "center"}}>FAQ Tracker</h1>
             <div className = {"login"} style = {{ "textAlign" : "center"}} >
                 Register Yourself !!
             </div>
             
             <div className = "container border border-dark" style = {{width : "700px"}}>
          
                     <div className = "offset-3 col-mod-4">
                         <Form>
                             <Form.Group  controlId = "formBasicUsername">
                                 <Form.Label column sm= "2">
                                     Username
                                 </Form.Label>
                                 <Form.Label column sm= '6' >
                                     <Form.Control type = "input" placeholder = "Enter Username" name = "userName"
                                      onChange = {this.setEmpState}></Form.Control>
                                 </Form.Label>

                             </Form.Group>

                             <Form.Group  controlId = "formBasicPassword">
                                 <Form.Label column sm= "2">
                                     Password
                                 </Form.Label>
                                 <Form.Label column sm= '6' >
                                     <Form.Control type = "password" placeholder = "Enter Password" name = "password" 
                                     onChange = {this.setEmpState}></Form.Control>
                                 </Form.Label>

                             </Form.Group>
                             <Form.Group  controlId = "formBasicUsername">
                                 <Form.Label column sm= "2">
                                     EmailId
                                 </Form.Label>
                                 <Form.Label column sm= '6' >
                                     <Form.Control type = "email" placeholder = "Enter emailId" name = "email" 
                                     onChange = {this.setEmpState}></Form.Control>
                                 </Form.Label>

                             </Form.Group>
                             <br/>
                             <div className = "mx-auto" style={{"width": "400px"}}>
                                     <Button type="submit" onClick = {this.handleLogin}  >
                                         Sign in
                                     </Button>
                             </div>
                             <br/>
                            
                         </Form>

                     {/* <div>
                         Welcome {this.state.}
                     </div> */}

                     </div>

            

             </div>
            </div>
         </React.Fragment>
       ) 
     }
    
}

export default RegisterPage;