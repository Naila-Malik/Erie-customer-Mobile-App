
export const Order_Redux = 'Order_Redux';


export const setOrderRedux = orderRedux => dispatch => {
    dispatch({
        type: Order_Redux,
        payload: orderRedux,
    });
};

