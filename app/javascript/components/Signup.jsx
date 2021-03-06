import  React  from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import validator from 'validator'
import photo from '../../assets/images/lecturephoto.png'
class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "Email",
            passwordValid: true,
            password: "Password", 
            passSubText: "Password must contain a mix of numbers and capital letters",
            phoneSubText: "Please enter a valid phone number",
            numCoursesDisplay: 1
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this)
    }

    //if I need this later 
    handleEmailChange(event) {
        let val = event.target.value
        console.log(val)
    }
    handlePasswordChange(event){
        const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
        this.state.passwordValid= re.test(event.target.value);
        console.log(this.state.passwordValid)
        this.state.password  = event.target.value
        if(this.state.password!="" && !this.passwordValid){
            this.state.passSubText = "Weak Password! please include numbers, capital letters and lower letters"
        }
        else if(this.state.password!=""  && this.passwordValid){
            this.state.passSubText = "Strong Password!"
        }
    }

    validatePhoneNumber(event){
        const isValidPhoneNumber = validator.isMobilePhone(event.target.value)
        console.log(isValidPhoneNumber)
        if(isValidPhoneNumber){
            this.state.phoneSubText = ""
           lec
        }
        
    }
    handleSubmit(event){
        let course = event.target[3].value + " " + event.target[4].value + " " + event.target[5].value + ","
        const createuser = {
            name: event.target[0].value,
            email_address: event.target[0].value,
            password_digest: event.target[1].value,
            phone_number: event.target[2].value,
            courses: course, 
            string: ""
        }
        const token = document.querySelector('meta[name="csrf-token"]').content;
        console.log(createuser)
        const requestOptions = {
            method: 'post',
            headers: {"X-CSRF-Token": token,
            "Content-Type": "application/json"},
            body: JSON.stringify(createuser)
        }
        console.log(requestOptions)
        fetch('http://localhost:3000/api/v1/users/create',requestOptions)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          //.then(response => this.props.history.push(`/user/${response.id}`)) uncoment to push to user profile 
          .catch(error => console.log(error.message));
    
        
    }
    render() {
        // let i = 0; 
        // let courses = Array(this.state.numCoursesDisplay).map(() => {
        //     return 
        // })
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control onChange={this.handleEmailChange.bind(this)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.handlePasswordChange.bind(this)} type="password" placeholder="Password" />
                    <Form.Text>{this.state.passSubText}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Phone Number" onChange={this.validatePhoneNumber}/>
                    <Form.Text>{this.state.phoneSubText}</Form.Text>
                </Form.Group>                
                <Form.Group>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control  type="text" placeholder="I.e CPSC, COMM, PSYC" />
                    <Form.Text>{this.state.passSubText}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Course Number</Form.Label>
                    <Form.Control  type="text" placeholder="I.e 410, 400, 201" />
                    <Form.Text>{this.state.passSubText}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Section</Form.Label>
                    <Form.Control  type="text" placeholder="I.e 101, 102, 103" />
                    <Form.Text>{this.state.passSubText}</Form.Text>
                </Form.Group>
                <Button  variant="primary" type="submit">
                    Submit
  </Button>
            </Form>
        )
    }
}
export default Signup;