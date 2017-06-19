import { connect } from 'react-redux';
import EntryLayout from './component';

function mapStateToProps(state) {
    return {
        fetching: state.fetching,
    };
}

export default connect(mapStateToProps)(EntryLayout);