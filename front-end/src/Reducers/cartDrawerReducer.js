export const cartDrawerReducer = (state= false, action) =>
{
    switch(action.type)
    {
        case "SET_DRAWER":
            return action.payload;

        default:

            return state;
    }


}