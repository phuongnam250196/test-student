import React, { Component } from 'react';
import { Container, Row, Col, Form, InputGroupText, InputGroupAddon, Input, InputGroup,
    Label, FormGroup, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';

import './../Student.scss';
import logo from './../../../logo.png';

import StudentService from './../Shared/StudentService';

class CreateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            keyword: '',
            dropdownOpen: false
        }
    }

    onChange = (e) => {
        const { fields } = this.state;
        const target = e.target;
        const name = target.name;
        const value = target.value;
        fields[name] = value;
        this.setState({
            fields
        })
    }

    handleValidation() {
        let { fields } = this.state;
        console.log('fields', fields)
        let errors = {};
        let formIsValid = true;

        // idIntern
        if (!fields["idIntern"]) {
            formIsValid = false;
            errors["idIntern"] = "idIntern Không được để trống";
        }
        if (typeof fields.idIntern !== "undefined") {
            if (!fields.idIntern.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.idIntern = "Chỉ được dùng ký tự";
            }
        }

        
        // fullName
        if (!fields.fullName) {
            formIsValid = false;
            errors["fullName"] = "Không được để trống";
        }
        console.log('typeof fields.fullName ', typeof fields.fullName)
        
        // birthday
        if (!fields.birthday) {
            formIsValid = false;
            errors["birthday"] = "Birthday Không được để trống";
        }


        // sex
        if (!fields.sex) {
            formIsValid = false;
            errors["sex"] = "Không được để trống";
        }

        // homeTown
        if (!fields.homeTown) {
            formIsValid = false;
            errors["homeTown"] = "Bạn chưa chọn quên quán";
        }

        // phone
        if (!fields.phone) {
            formIsValid = false;
            errors["phone"] = "Không được để trống";
        }
        if (typeof fields.phone !== "undefined") {
            if (!fields.phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
                formIsValid = false;
                errors.phone = "Không đúng định dạng điện thoại";
            }
        }

        // school
        if (!fields.school) {
            formIsValid = false;
            errors["school"] = "Bạn chưa chọn trường học";
        }

        // specialized
        if (!fields.specialized) {
            formIsValid = false;
            errors["specialized"] = "Bạn chưa chọn chuyên ngành";
        }

        // position
        if (!fields.position) {
            formIsValid = false;
            errors["position"] = "Vị trí thực tập không được để trống";
        }

        // startDate
        if (!fields.startDate) {
            formIsValid = false;
            errors["startDate"] = "Ngày bắt đầu không được để trống";
        }

        // email
        if (!fields.email) {
            formIsValid = false;
            errors["email"] = "Email không được để trống";
        }
        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email không đúng định dạng";
            }
        }  
        
        // idCard
        if (!fields.idCard) {
            formIsValid = false;
            errors["idCard"] = "idCard không được để trống";
        }
        this.setState({
            errors: errors,
        });
        return formIsValid;
    }

    onAddStudent = (e) => {
        e.preventDefault();

        if (this.handleValidation()) {
            console.log("Thành công", this.state.fields);
            StudentService.createStudent(this.state.fields).then((res) => {
                // console.log('data - create', res.data);
                window.location.assign('http://localhost:3000/app/student')
            }).catch(e => console.log('err', e));
        } else {
            console.log("Thất bại", this.state.errors);
        }
        console.log('data', this.state)
    }

    onChangeSearch = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState({
            keyword: value
        })
    }

    onSearch = () => {
        console.log('keyword', this.state.keyword)
    }

    onResetStudent = () => {
        console.log(2)
    }
    
    render() {
        const toggle = () => {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            })
        }
        let { dropdownOpen, fields, errors } = this.state;
            // console.log('render err', fields["idIntern"], this.state.errors)
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
                            <Input className="header_search_input" onChange={ (e) => this.onChangeSearch(e) } name="keyword" placeholder="Tìm kiếm theo mã, số điện thoại" />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fa fa-microphone btn-search" onClick={this.onSearch} aria-hidden="true"></i></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </Col>
                <Col sm={2}>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-fix">
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
            <Form className="form-parent">
                <Row>
                    <Col xs={6}>
                        <FormGroup row>
                            <Label for="id-intern" sm={3}>Mã TTS</Label>
                            <Col sm={9}>
                                <Input type="text" onChange={(e) => this.onChange(e) } value={ fields["idIntern"] === 'undefined' ? '' : fields["idIntern"] } name="idIntern" id="id-intern" required />
                                <p className="text_err">{ errors.idIntern }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="full-name" sm={3}>Họ tên</Label>
                            <Col sm={9}>
                                <Input type="text" onChange={(e) => this.onChange(e) } value={ fields["fullName"] } name="fullName" id="full-name" />
                                <p className="text_err">{ errors.fullName }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="birthday" sm={3}>Ngày sinh</Label>
                            <Col sm={9}>
                                <Input type="date" onChange={(e) => this.onChange(e) } name="birthday" id="birthday" />
                                <p className="text_err">{ errors.birthday }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={3}>Giới tính</Label>
                            <Col sm={9}>
                                <Input type="radio" onChange={(e) => this.onChange(e) } checked={1} value={1} name="sex" /> Nam {' - '}
                                <Input type="radio" onChange={(e) => this.onChange(e) } value={0} name="sex" /> Nữ
                                <p className="text_err">{ errors.sex }</p>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="home-town" sm={3}>Quê quán</Label>
                            <Col sm={9}>
                                <Input type="select" onChange={(e) => this.onChange(e) } name="homeTown" id="home-town">
                                    <option value="">-- Chọn --</option>
                                    <option value="hn">Hà Nội</option>
                                    <option value="hcm">Hồ Chí Minh</option>
                                </Input>
                                <p className="text_err">{ errors.homeTown }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="phone" sm={3}>Số điện thoại</Label>
                            <Col sm={9}>
                                <Input type="number" onChange={(e) => this.onChange(e) } name="phone" id="phone" />
                                <p className="text_err">{ errors.phone }</p>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs={6}>
                        <FormGroup row>
                            <Label for="school" sm={3}>Trường</Label>
                            <Col sm={9}>
                                <Input type="select" onChange={(e) => this.onChange(e) } name="school" id="school">
                                    <option value="">-- Chọn --</option>
                                    <option value="tlu">TLU</option>
                                    <option value="neu">Kinh tế quốc dân</option>
                                </Input>
                                <p className="text_err">{ errors.school }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="specialized" sm={3}>Chuyên ngành</Label>
                            <Col sm={9}>
                                <Input type="select" onChange={(e) => this.onChange(e) } name="specialized" id="specialized">
                                    <option value="">-- Chọn --</option>
                                    <option value="toan-tin">Toán tin</option>
                                    <option value="kinh-te">Kinh tế</option>
                                    <option value="ngon-ngu-nhat">Ngôn ngữ Nhật</option>
                                    <option value="du-lich">Du lịch</option>
                                </Input>
                                <p className="text_err">{ errors.specialized }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="position" sm={3}>Vị trí thực tập</Label>
                            <Col sm={9}>
                                <Input type="text" onChange={(e) => this.onChange(e) } name="position" id="position" />
                                <p className="text_err">{ errors.position }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="start-date" sm={3}>Ngày bắt đầu</Label>
                            <Col sm={9}>
                                <Input type="date" onChange={(e) => this.onChange(e) } name="startDate" id="start-date" />
                                <p className="text_err">{ errors.startDate }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" onChange={(e) => this.onChange(e) } name="email" id="email" />
                                <p className="text_err">{ errors.email }</p>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={3}>
                                <Input type="select" onChange={(e) => this.onChange(e) } name="idCardType">
                                    <option value="cmnd">CMND</option>
                                    <option value="cccd">CCCD</option>
                                </Input>
                                <p className="text_err">{ errors.idCardType }</p>
                            </Col>
                            <Col sm={9}>
                                <Input type="text" onChange={(e) => this.onChange(e) } name="idCard" />
                                <p className="text_err">{ errors.idCard }</p>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={12} className="btn-sub-block">
                        <Button className="btn-child-delete" onClick={ this.onResetStudent }>Reset</Button>
                        <Button onClick={this.onAddStudent} className="btn-child-add">Thêm</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
        );
    }
}

export default CreateStudent;