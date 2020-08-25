// action of store
import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

// ================================================Fetch Products===========================================
export const actFetchProductsRequest = () => {
  return (dispatch) => {
    return callApi('products', 'GET', null).then(res => {
      console.log("FetchProduct", res.data);
      dispatch(actFetchProducts(res.data))
    });
  };
}

export const actFetchProducts = (products) => {
  return {
    type: Types.FETCH_PRODUCTS,
    products
  }
}

// ================================================Delete Product===========================================
export const actDeleteProductRequest = (id) => {
  return dispatch => {
    return callApi(`products/${id}`, 'DELETE', null).then(res => {
      console.log("actDeleteProductRequest -> res", res)
      dispatch(actFetchProductsRequest())
    });
  }
}

export const actDeleteProduct = (id) => {
  return {
    type: Types.DELETE_PRODUCT,
    id
  }
}

// ================================================Add product===========================================
export const actAddProductRequest = (product) => {
  return dispatch => {
    return callApi(`products`, 'POST', product).then(res => {
      return callApi(`products`).then(ress => { // fetch lai sai khi them xong de khoi fai reload
        console.log("AddProduct", ress.data);
        dispatch(actFetchProducts(ress.data));
      })
      // dispatch(actAddProduct(res.data)) // truong ho neu ko can fetch lai
    });
  }
}

export const actAddProduct = (product) => {
  return {
    type: Types.ADD_PRODUCT,
    product
  }
}

// ================================================Get product===========================================
export const actGetProductRequest = (id) => {
  return dispatch => {
    return callApi(`products/${id}`, 'GET', null).then(res => {
      console.log("GetProduct", res.data);
      dispatch(actGetProduct(res.data));
    });
  }
}

export const actGetProduct = (product) => {
  return {
    type: Types.EDIT_PRODUCT,
    product
  }
}

// ================================================Update product===========================================
export const actUpdateProductRequest = (product) => {
  console.log(product)
  return dispatch => {
    return callApi(`products/${product.id}`, 'PUT', product).then(res => {
      console.log("actUpdateProductRequest -> res", res)
      return callApi(`products`).then(ress => { // fetch lai sai khi update xong de khoi fai reload
        dispatch(actFetchProducts(ress.data));
      })
      // dispatch(actUpdateProduct(res.data)) // truong ho neu ko can fetch lai
    });
  }
}

export const actUpdateProduct = (product) => {
  return {
    type: Types.UPDATE_PRODUCT,
    product
  }
}