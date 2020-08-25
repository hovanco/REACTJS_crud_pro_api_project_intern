import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { API_URL_IMG } from '../../constants/Config';
import "./CSS_ProductItem.css";

class ProductItem extends Component {
  
  onDelete = (id) => {
    if (confirm('ban muon xoa?')) {//eslint-disable-line
      this.props.onDelete(id)
    }
  }

  onSelectProduct = id => {
    this.props.onSelect(id)
  }

  render() {
    var { product, index } = this.props;
    return (
      <tr>
        <td>
          <input type="checkbox"
            className="delid[]"
            checked={this.props.checked}
            onChange={() => this.onSelectProduct(product.id)} 
          />
        </td>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.sku}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td>{product.description}</td>
        <td>
        {/* <img src={API_URL_IMG+product.image}  alt="" /> */}
        </td>
        <td>{product.categories_id}</td>
        <td>
          <Link to={`/product/${product.id}/edit`} className="btn btn-warning mr-10">Update</Link>
        </td>
      </tr>
    )
  }
}
export default ProductItem;
