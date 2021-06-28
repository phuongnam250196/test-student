import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import ListStudent from './components/ListStudent';

class Student extends Component {
    render() {
        const { path } = this.props.match;
        return (
            <div className="Exam">
                <Switch>
                    <Route path={`${path}`} component={ListStudent} />
                    <Route path={`${path}`} component={CreateStudent} />
                </Switch>
            </div>
        );
    }
}

export default Student;