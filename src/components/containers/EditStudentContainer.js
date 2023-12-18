import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import EditStudentView from '../views/EditStudentView';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    componentDidMount() {
        //getting student ID from url
        this.props.fetchStudent(this.props.match.params.id);
    }

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    //the student id is undefined
    // Capture input data when it is entered
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Take action after user click the submit button
    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.
        let { student } = this.props;

        student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId,
            id: student.id
        };

        // Edit student
        await this.props.editStudent(student);
        this.setState({
            redirect: true
        });
    }

    // Render Student view by passing student data as props to the corresponding View component
    render() {
        const { student } = this.props;

        if (this.state.redirect) {
            return (<Redirect to={`/students`} />)
        }

        return (
            <div>
                <Header />
                <EditStudentView campusId = {this.props.location.query} student={student} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
    return {
        student: state.student,  // Get the State object from Reducer "student"
    };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return {
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student))
    };
};

export default connect(mapState, mapDispatch)(EditStudentContainer) 