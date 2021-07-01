import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

import UserService from './../Shared/UserService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleValidation() {
        let { username, password } = this.state;
        let errors = {};
        let formIsValid = true;

        // Username
        if (!username) {
            formIsValid = false;
            errors["username"] = "Không được để trống";
        }

        // password
        if (!password) {
            formIsValid = false;
            errors["password"] = "Không được để trống";
        }
        
       
        this.setState({
            errors: errors,
        });
        return formIsValid;
    }

    onSubmitRegister = () => {
        const { username, password } = this.state;
        const data = {
            username,
            password
        }
        const check = this.handleValidation();
        if (check) {
            console.log("THông tin đầy đủ");
            UserService.loginUser(data).then(res => {
                if (res.data.accessToken !== "null") {
                    localStorage.setItem('token', res.data.accessToken);
                    console.log(res.data.accessToken);
                }
                // this.props.onLogin(true);
            }).catch(e => console.log(e))
        } else {
            console.log("Bạn chưa nhập đầy đủ thông tin.");

        }
    }

    render() {
        const { username, password, errors } = this.state;
        return (
            <Container>
                <Row>
                    <Col md={{'size': 6, 'offset': 3}} style={{ marginTop: "100px" }}>
                        <Form style={{ background: "lightblue", padding: "30px 15px", borderRadius: "10px" }}>
                            <FormGroup>
                                <Label>Tài khoản</Label>
                                <Input type="text" onChange={(e) => this.onChange(e)} value={ username } name="username" placeholder="Tài khoản" />
                                <p style={{ fontSize: "11px", color: "red", position: "absolute", marginBottom: 0 }}>{errors.username}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label>Mật khẩu</Label>
                                <Input type="password" onChange={(e) => this.onChange(e)} value={ password } name="password" />
                                <p style={{ fontSize: "11px", color: "red", position: "absolute", marginBottom: 0 }}>{errors.password}</p>
                            </FormGroup>
                            <div style={{ textAlign: "right" }}>
                                <Button onClick={ this.onSubmitRegister } className="btn" color="primary">Đăng nhập</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;