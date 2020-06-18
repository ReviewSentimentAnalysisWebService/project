import React, { Component } from "react";
import ApiService from "../ApiService";


class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
      message: null,
      title: null,
    };
  }

  componentDidMount() {
    this.reloadProductList();

  }
  //생성되자마자 -> 한번만 

  reloadProductList = () => {

    ApiService.fetchProduct()
      .then((res) => {
        this.setState({
          product: res.data,

        });
      })
      .catch((err) => {
        console.log("reload error", err);
      });


  };

  deleteProduct = (id) => {
    ApiService.deleteProduct(id)
      .then((res) => {
        this.setState({
          message: " delete success",
        });
        this.setState({
          product: this.state.product.filter((product) => product.id !== id),
        });
      })
      .catch((err) => {
        console.log("reload error", err);
      });
  };

  editProduct = (ID) => {
    window.localStorage.setItem("productID", ID);
    this.props.history.push("./edit-product");
  };

  addProduct = () => {
    window.localStorage.removeItem("productID");
    this.props.history.push("./add-product");
  };




  render() {
    return (
      <div>
        <h2>Product List</h2>
        <button onClick={this.addProduct}>Add Product</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>title</th>
              <th>subtitle</th>
            </tr>
          </thead>
          <tbody>
            {this.state.product.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.subtitle}</td>
                <td>
                  <button onClick={() => this.editProduct(product.id)}>
                    edit
                  </button>
                  <button onClick={() => this.deleteProduct(product.id)}>
                    delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default ProductList;
