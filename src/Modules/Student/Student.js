import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateStudent from './Components/CreateStudent';
import ListStudent from './Components/ListStudent';

class Student extends Component {
    render() {
        const { path } = this.props.match;
        return (
            <div className="Student">
                <Switch>
                    <Route path={`${path}/update`} component={CreateStudent} />
                    <Route path={`${path}/create`} component={CreateStudent} />
                    <Route path={`${path}`} component={ListStudent} />
                   
                </Switch>
            </div>
        );
    }
}

export default Student;