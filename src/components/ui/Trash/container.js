import { connect } from 'react-redux';
import Trash from './component';
import { getFilteredCards } from 'reducers';
import { clearTrash } from 'actions';

function mapStateToProps(state) {
    return {
        cards: state.user.cards,
        filteredCards: getFilteredCards(state)
    };
}

function mapDispathToProps(dispatch) {
    return {
        handleClearTrash(event) {
            console.log(event);
            dispatch(clearTrash());
        }
    };
}

export default connect(mapStateToProps, mapDispathToProps)(Trash);
