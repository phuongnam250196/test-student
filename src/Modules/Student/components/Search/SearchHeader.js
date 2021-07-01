import React, { Component } from 'react';
import SearchForm from './SearchForm';
import logo from './../../../../logo.png';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class SearchHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            keyword: '',
        }
    }

    onSearch = (keyword) => {
        this.props.onSearch(keyword);
    }

    render() {
        const toggle = () => {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            })
        }

        return (
            <Row>
                <Col sm={2}>
                    <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                        <img src={logo}  alt="" className="header_logo" />
                    </div>
                </Col>
                <Col sm={8}>
                    <SearchForm onSearch={ (keyword)=>this.onSearch(keyword) } />
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
        );
    }
}

export default SearchHeader;