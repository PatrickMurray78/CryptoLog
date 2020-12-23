import React from 'react';
import { Cryptos } from './cryptos';
import axios from 'axios';

export class Read extends React.Component {

    constructor() {
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        cryptos: []
    };

    componentDidMount() {
        axios.get('http://localhost:4000/api/cryptos')
        .then((response) => {
            this.setState({ cryptos: response.data })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    ReloadData() {
        axios.get('http://localhost:4000/api/cryptos')
        .then((response) => {
            this.setState({ cryptos: response.data })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    render() {
        return(
            <div>
                <Cryptos cryptos={this.state.cryptos} ReloadData={this.ReloadData}></Cryptos>
            </div>
        )
    }
}