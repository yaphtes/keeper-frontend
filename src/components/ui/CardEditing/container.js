import { connect } from 'react-redux';
import CardEditing from './component';
import { closeEditingCard, updateCard } from 'actions';

function mapStateToProps(state) {
    return {
        data: state.editingCard.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        closeEditingCard() {
            dispatch(closeEditingCard());
        },

        updateCard(card) {
            return new Promise((resolve, reject) => {
                dispatch(updateCard(card))
                    .then(resolve);
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardEditing);