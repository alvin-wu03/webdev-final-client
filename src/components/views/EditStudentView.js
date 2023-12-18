import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

// Create styling for the input form
const useStyles = makeStyles(() => ({
    formContainer: {
        width: '500px',
        backgroundColor: '#f0f0f5',
        borderRadius: '5px',
        margin: 'auto',
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
        textDecoration: 'none'
    },
    customizeAppBar: {
        backgroundColor: '#11153e',
        shadows: ['none'],
    },
    formTitle: {
        backgroundColor: '#c5c8d6',
        marginBottom: '15px',
        textAlign: 'center',
        borderRadius: '5px 5px 0px 0px',
        padding: '3px'
    },
}));


const EditStudentView = (props) => {
    const { handleChange, handleSubmit, campusId } = props;
    const classes = useStyles();
    useEffect(() => {
        if (campusId && campusId !== null) {
          handleChange({
            target: {
              name: 'campusId',
              value: campusId.campusId.campus_id,
            },
          });
        }
      }, [campusId, handleChange]);
    return (
        <div>
            <h1>Edit Student</h1>
            <div className={classes.root}>
                <div className={classes.formContainer}>
                    <div className={classes.formTitle}>
                        <Typography style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e' }}>
                            Enter New Info
                        </Typography>
                    </div>
                    <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
                        <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
                        <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
                        <br />
                        <br />

                        <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
                        <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
                        <br />
                        <br />

                        <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Id: </label>
                        <input type="text" defaultValue={campusId && campusId.campusId.campus_id !== null ? campusId.campusId.campus_id : ''} name="campusId" onChange={(e) => handleChange(e)} />
                        <br />
                        <br />

                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                        <br />
                        <br />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditStudentView;