import { connect } from 'react-redux';
import {
    getUserByToken,
    userDataReceived,
    clearMasonries,
    closeCreateCard
} from 'actions';
import { browserHistory } from 'react-router';
import AppLayout from './component';

function mapStateToProps(state, ownProps) {
    return {
        fetching: state.fetching,
        menuIsOpen: state.ui.menuIsOpen,
        pathname: ownProps.location.pathname
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserByToken() {
            dispatch(getUserByToken());
        },

        checkToken() {
            if (!localStorage.getItem('token')) {
                dispatch(userDataReceived({}));
                browserHistory.replace('/login');
            }
        },

        closeCreateCard() {
            dispatch(closeCreateCard());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);