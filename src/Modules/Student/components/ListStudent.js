import React, { Component } from 'react';
import { Container, Row, Col, Input, Table  } from 'reactstrap';
import './../Student.scss';
import StudentService from './../Shared/StudentService';
import SearchHeader from './Search/SearchHeader';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class ListStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            data: [],
            keyword: '',
        }
    }

    componentDidMount() {
        const data = StudentService.listStudent().then((res) => {
            // console.log('data - list', res.data);
            this.setState({
                data: res.data
            })
        }).catch(e => console.log('err', e));
    }

    goTo = (url = '') => {
        this.props.history.push(url);
    }

    onSearch = (keyword) => {
        console.log('keyword', keyword);
        this.setState({
            keyword
        });
    }

    onDelete = (e, id) => {
        const { data } = this.state;
        confirmAlert({
            title: 'Xóa sinh viên',
            message: 'Bạn có chắc chắn muốn xóa không?',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: () => {
                    console.log('delete', id)
                    StudentService.deleteStudent(id).then((res) => {
                        // console.log('res', res)
                        for (let i in data) {
                            if (data[i].id === res.data.id) {
                                data.splice(i, 1);
                            }
                        }
                        this.setState({
                            data
                        })
                    }).catch(e => console.log(e))
                }
              },
              {
                label: 'Hủy bỏ',
                onClick: () => console.log('Click No')
              }
            ]
          });
        
    }

    render() {
        const { data, keyword } = this.state;
        // console.log('data render',  data, keyword);
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
                        <div className="d-flex">
                            <button onClick={()=>this.goTo('update?id='+student.id)} className="btn btn-success fix-btn">Sửa</button>
                            <button onClick={(e) => this.onDelete(e, student.id)} className="btn btn-danger fix-btn">Xóa</button>
                        </div>
                    </td>
                </tr>
            );
        });
        return (
            <Container>
                <SearchHeader onSearch={(keyword) => this.onSearch(keyword) } />

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
                                    <th><button onClick={()=>this.goTo('create')} className="btn btn-primary">Thêm mới</button></th>
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