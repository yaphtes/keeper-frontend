import { connect } from 'react-redux';
import Trash from './component';
import { getFilteredCards } from 'reducers';

function mapStateToProps(state) {
    return {
        cards: state.user.cards,
        filteredCards: getFilteredCards(state)
    };
}

export default connect(mapStateToProps)(Trash);
