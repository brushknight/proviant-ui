const initialState = {
    items: [
        {id: 1, title: "Fridge"},
        {id: 2, title: "Freezer"},
        {id: 3, title: "Pantry"},
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

