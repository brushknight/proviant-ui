const initialState = {
    items: [
        {id: 1, title: "Pharmacy"},
        {id: 2, title: "Grocery"},
        {id: 3, title: "House cleaning"},
        {id: 4, title: "Personal hygiene"},
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

