import React, { Component } from "react";
import ApiService from "../ApiService";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      subtitle: "",
      message: null,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveProduct = (e) => {
    e.preventDefault();

    let product = {
      id: this.state.id,
      title: this.state.title,
      subtitle: this.state.subtitle,
    };

    ApiService.addProduct(product)
      .then((res) => {
        this.setState({
          message: product.id + "success",
        });
        console.log(this.state.message);
        this.props.history.push("/products");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  render() {
    return (
      <div>
        <h2>Add</h2>
        <form>
          <div>
            <label>id</label>
            <input
              type="text"
              name="id"
              value={this.state.id}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={this.state.subtitle}
              onChange={this.onChange}
            />
          </div>
          <button onClick={this.saveProduct}>Product</button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
