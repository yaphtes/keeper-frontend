import { connect } from 'react-redux';
import Login from './component';
import { login } from 'actions';

function mapDispatchToProps(dispatch) {
    return {
        handleGetUser(payload) {
            console.log('Login form will get user:\n', payload);
            dispatch(login(payload));
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);