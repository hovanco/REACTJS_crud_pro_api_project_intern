import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      txtName: '',
      txtSku: '',
      txtPrice: '',
      txtQuantity: '',
      txtDescription: '',
      txtCategory_id: ''
    };
  }
  
  componentDidMount(){ 
    var { match } = this.props
    if(match){
      var id = match.params.id;
      this.props.onEditProduct(id);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){
      var {itemEditing} = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtSku: itemEditing.sku,
        txtPrice: itemEditing.price,
        txtQuantity: itemEditing.quantity,
        txtDescription: itemEditing.description,
        txtCategory_id: itemEditing.categories_id
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name] : value
    });
  }

  onSave = (e) => {
    e.preventDefault();
    var {
      id,
      txtName,
      txtSku,
      txtPrice,
      txtQuantity,
      txtDescription,
      txtCategory_id   
    } = this.state;

    var {history} = this.props;
    var product = {
      id : id,
      name: txtName,
      sku: txtSku,
      price: txtPrice,
      quantity: txtQuantity,
      description: txtDescription,
      categories_id: txtCategory_id
    }
    if(id){ //update
      this.props.onUpdateProduct(product); 
    }else{
      this.props.onAddProduct(product); 
    }
    history.goBack();
  }
  render() {
    var {
      txtName,
      txtSku,
      txtPrice,
      txtQuantity,
      txtDescription,
      txtCategory_id
    } = this.state;

    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>

          <div className="form-group">
            <label>Name:</label>
            <input
             type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Sku:</label>
            <input
             type="text"
              className="form-control"
              name="txtSku"
              value={txtSku}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
             type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
             type="number"
             className="form-control"
             name="txtQuantity"
             value={txtQuantity}
             onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
             type="text"
             className="form-control"
             name="txtDescription"
             value={txtDescription}
             onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Categories:</label>
            <input
             type="number"
             className="form-control"
             name="txtCategory_id"
             value={txtCategory_id}
             onChange={this.onChange}
            />
          </div>
          <Link to="/product-list" className = "btn btn-danger mr-10">Cancel</Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    itemEditing : state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
   onAddProduct : (product) => {
     dispatch(actAddProductRequest(product)); // them data
   },
   onEditProduct : (id) => {
     dispatch(actGetProductRequest(id));
   },
   onUpdateProduct : (product) => {
     dispatch(actUpdateProductRequest(product)); // // them data
   }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
