import React, { Component } from "react";
import ApiService from "../ApiService";


class DBTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
        };
    }
    componentDidMount() {
        this.reloadProductList();
    }
    //생성되자마자 -> 한번만 
    reloadProductList = () => {
        ApiService.fetchProductList()
            .then((res) => {
                this.setState({
                    productList: res.data,
                });
            })
            .catch((err) => {
                console.log("reload error", err);
            });
    };
    render() {
        return (
            <div>
                <h2>CategoryList</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productList.map((product) => (
                            <tr key={product.name}>
                                <td>{product.name}</td>
                                <td>{product.cat_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default DBTest;
