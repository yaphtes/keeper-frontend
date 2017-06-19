import { connect } from 'react-redux';
import ProfileEdit from './component';
import { updateUserProfile } from 'actions';


function mapStateToProps({ user }) {
    return { user };
}

function mapDispatchToProps(dispatch) {
    return {
        handleUpdateProfile(user) {
            console.log('ProfileEdit component will handleUpdateProfile:\n', user);
            dispatch(updateUserProfile(user));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);