import React, { Compoent } from 'react';


class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: '',
            completed: 0,
            searchKeyword: ''
        }
        this.stateRefresh = this.stateRefresh.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this)
    }



    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }



}

export default Input;