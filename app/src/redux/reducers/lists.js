import {ACTION_FETCH_LIST_SUCCESS} from "../action";

const initialState = {
    items: [
        {id: 1, title: "Fridge"},
        {id: 2, title: "Freezer"},
        {id: 3, title: "Pantry"},
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ACTION_FETCH_LIST_SUCCESS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

