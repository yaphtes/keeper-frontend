import { connect } from 'react-redux';
import Registration from './component';
import { postUser } from 'actions';

function mapDispatchToProps(dispatch) {
    return {
        handlePostUser(payload) {
            console.log('Registration form will post user: \n', payload);
            dispatch(postUser(payload));
        }
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);