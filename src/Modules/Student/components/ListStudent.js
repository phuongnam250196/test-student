import React, { Component } from 'react';
import { Container, Row, Col, InputGroupText, InputGroupAddon, Input, InputGroup,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table  } from 'reactstrap';
import './../Student.scss';

import logo from './../../../logo.png';

import StudentService from './../Shared/StudentService';
class ListStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            data: [],
        }
    }

    componentDidMount() {
        const data = StudentService.listStudent().then((res) => {
            console.log('data - list', res.data);
            this.setState({
                data: res.data
            })
        }).catch(e => console.log('err', e));
    }

    goTo = (url = '') => {
        window.location.assign('http://localhost:3000/app/student/create')
    }

    render() {
        const toggle = () => {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            })
        }
        const { data } = this.state;
        console.log('data render',  data);
        let listStudent = data.map((student, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{ student.idIntern}</th>
                    <td>{ student.fullName }</td>
                    <td>{ student.birthday }</td>
                    <td>{ student.phone }</td>
                    <td>{ student.position }</td>
                    <td>{ student.startDate }</td>
                    <td><Input type="checkbox" /></td>
                    <td>
                        <button className="btn btn-success fix-btn">Sửa</button>
                        <button className="btn btn-danger fix-btn">Xóa</button>
                    </td>
                </tr>
            );
        });
        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        <img src={logo}  alt="" className="header_logo" />
                    </Col>
                    <Col sm={8}>
                        <div className="header_search">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><i className="fa fa-search" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                                <Input className="header_search_input" placeholder="Tìm kiếm theo mã, số điện thoại" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><i className="fa fa-microphone" aria-hidden="true"></i></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={toggle} className="dropdown-fix">
                            <DropdownToggle caret>
                                Chào, Nam
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Đổi mật khẩu</DropdownItem>
                                <DropdownItem>Thông tin</DropdownItem>
                                <DropdownItem>Đăng xuất</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Table bordered striped hover className="table-list">
                            <thead>
                                <tr>
                                    <th>Mã TTS</th>
                                    <th>Họ tên <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Năm sinh <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Số điện thoại</th>
                                    <th>Vị trí <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Ngày bắt đầu <i className="fa fa-caret-down" aria-hidden="true"></i></th>
                                    <th>Đóng phụ phí</th>
                                    <th><button onClick={()=>this.goTo('create')} className="btn btn-primary">Create Student</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                { listStudent }
                                
                            </tbody>
                        </Table>
                    </Col>
                    
                </Row>
            </Container>
        );
    }
}

export default ListStudent;