const initialState = [
    {id: 1, title: "Milk", stock: "5 x 1 kg", categoryIds: [1,3], listId: 1},
    {id: 2, title: "Pasta", stock: "5 x 1 kg", categoryIds: [2,1], listId: 2},
    {id: 3, title: "Coffee", stock: "5 x 1 kg", categoryIds: [3,2], listId: 3},
]

export default function (state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

