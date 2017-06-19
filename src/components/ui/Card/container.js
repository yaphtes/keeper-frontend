import { connect } from 'react-redux';
import Card from './component';
import {
    toggleCard,
    toHomeCard,
    toArchiveCard,
    toTrashCard,
    deleteForeverCard,
    makeCopyOfCard,
    changeBgColor,
    openEditingCard
} from 'actions';

function mapDispatchToProps(dispatch) {
    return {
        toggle(id) {
            dispatch(toggleCard(id));
        },

        toArchive(id) {
            dispatch(toArchiveCard(id))
        },

        toHome(id) {
            dispatch(toHomeCard(id));
        },

        toTrash(id) {
            dispatch(toTrashCard(id));
        },

        deleteForever(id) {
            dispatch(deleteForeverCard(id));
        },

        makeCopy(data) {
            dispatch(makeCopyOfCard(data));
        },

        changeBgColor(card) {
            return new Promise((resolve, reject) => {
                dispatch(changeBgColor(card))
                    .then(resolve);
            });
        },

        openEditingCard(card) {
            dispatch(openEditingCard(card));
        }
    };
}

export default connect(null, mapDispatchToProps)(Card);