import Header from './component';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { userDataReceived } from 'actions';
import { toggleMenu, changeFilter, clearFilter, loadAvatarByUrl } from 'actions';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogout() {
            dispatch(userDataReceived({}));
            localStorage.clear();
            browserHistory.replace('/login');
        },

        handleToggleMenu() {
            dispatch(toggleMenu());
        },

        changeFilter(value) {
            dispatch(changeFilter(value));
        },

        clearFilter() {
            dispatch(clearFilter());
        },

        loadAvatarByUrl(url) {
            dispatch(loadAvatarByUrl(url));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);