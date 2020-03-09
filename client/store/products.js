import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async dispatch => {
    try {
      let { data } = await axios.get('/api/products');
      dispatch(getProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}
