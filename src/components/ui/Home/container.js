import { connect } from 'react-redux';
import Home from './component';
import { closeCreateCard } from 'actions';
import { getFilteredCards } from 'reducers';

function mapStateToProps(state) {
    return {
        user: state.user,
        cardEditing: state.editingCard,
        filteredCards: getFilteredCards(state)
    };
}

export default connect(mapStateToProps)(Home);