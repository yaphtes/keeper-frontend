import { connect } from 'react-redux';
import Archive from './component';
import { getFilteredCards } from 'reducers';

function mapStateToProps(state) {
    return {
        cards: state.user.cards,
        filteredCards: getFilteredCards(state)
    };
}

export default connect(mapStateToProps)(Archive);