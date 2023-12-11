import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk } from "../../store/thunks";
import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    // Get student data from back-end database
    componentDidMount() {
        //getting student ID from url
        this.props.fetchStudent(this.props.match.params.id);
    }

    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            campusId: null,
            redirect: false,
            redirectId: null
        };
    }

    // Capture input data when it is entered
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Take action after user click the submit button
    handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.

        let student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            campusId: this.state.campusId
        };

        // Add new student in back-end database
        let newStudent = await this.props.editStudentThunk(student);//NEED TO CHANGE THIS HERE ERERERERERE

        // Update state, and trigger redirect to show the new student
        this.setState({
            firstname: "",
            lastname: "",
            campusId: null,
            redirect: true,
            redirectId: newStudent.id
        });
    }

    // Render Student view by passing student data as props to the corresponding View component
    render() {
        return (
            <div>
                <Header />
                <EditStudentView student={this.props.student} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
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