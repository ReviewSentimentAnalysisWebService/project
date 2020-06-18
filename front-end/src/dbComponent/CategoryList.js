import React, { Component } from "react";
import ApiService from "../ApiService";
import { browserHistory } from 'history';

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            message: null,
            title: null,
        };
    }

    componentDidMount() {
        this.reloadCategoryList();

    }
    //생성되자마자 -> 한번만 

    reloadCategoryList = () => {
        ApiService.fetchCategory()
            .then((res) => {
                this.setState({
                    product: res.data,
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
                            <th>subtitle</th>
                            <th>subtitle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.product.map((product) => (
                            <tr key={product.cat_id}>
                                <td>{product.cat_id}</td>
                                <td>{product.first}</td>
                                <td>{product.second}</td>
                                <td>{product.third}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default CategoryList;
