import React, { Component } from 'react';
import { InputGroupText, InputGroupAddon, Input, InputGroup } from 'reactstrap';


class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChangeSearch = (e) => {
        const target = e.target;
        const value = target.value;
        this.setState({
            keyword: value
        })
    }

    onSearch = () => {
        console.log('keyword', this.state.keyword);
        this.props.onSearch(this.state.keyword)
    }

    render() {
        return (
            <div className="header_search">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-search" aria-hidden="true"></i></InputGroupText>
                    </InputGroupAddon>
                    <Input className="header_search_input" onChange={ (e) => this.onChangeSearch(e) } name="keyword" placeholder="Tìm kiếm fullname, vị trí thực tập" />
                    <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-microphone btn-search" onClick={this.onSearch} aria-hidden="true"></i></InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default SearchForm;