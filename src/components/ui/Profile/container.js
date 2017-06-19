import { connect } from 'react-redux';
import Profile from './component';
import { changeAvatar, loadAvatarByUrl } from 'actions';

function mapStateToProps({ user }) {
    return { user }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAvatar({ userId, file }) {
            dispatch(changeAvatar({ userId, file }));
        },

        loadAvatarByUrl(url) {
            dispatch(loadAvatarByUrl(url));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

