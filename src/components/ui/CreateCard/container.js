import { connect } from 'react-redux';
import CreateCard from './component';
import { toggleCreateCard, createCard } from 'actions';

function mapDispatchToProps(dispatch) {
    return {
        toggle() {
            dispatch(toggleCreateCard());
        },

        createCard(card) {
            dispatch(createCard(card));
        }
    };
}

function mapStateToProps(state) {
    return {
        isOpen: state.ui.createCardIsOpen,
        userId: state.user._id
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);