import React from 'react';
import {connect} from 'react-redux';
import {userValidation} from '../../redux/Auth/action'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user : "",
            password : ""
        }
    }

    // handleChange = e => {
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     })
    // }
    // handleSubmit = e => {
    //     e.preventDefault()
    //     this.props.userValidation([{ data:"data" }])
    // }

    render(){
        console.log(this.props)
        const { primaryData } = this.props
        console.log(primaryData)
        return(
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col>
                        <Card className="p-3 pt-5 shadow-sm border-green">
                            <Card.Body>
                                <Form >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control value={this.state.user}  type="text" placeholder="Username" name="user" ></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control value={this.state.password} type="password" placeholder="Password" name= "password" ></Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="success">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }


}


const mapDispatchToProps = dispatch => {
    return { userValidation : payload => dispatch(userValidation(payload)) }
}

const mapStateToProps = state => {
    return{
        primaryData : state.primaryData
    }
} 
export default connect(mapStateToProps,mapDispatchToProps)(Login)
