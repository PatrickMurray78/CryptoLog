import React from 'react';
import { Cryptos } from './cryptos';
import axios from 'axios';

export class Read extends React.Component {

    state = {
        cryptos: []
    };

    componentDidMount() {
        axios.get('https://jsonblob.com/api/jsonblob/44a08d5e-445a-11eb-91ad-0bd37d7cb63c')
        .then((response) => {
            this.setState({ cryptos: response.data.Search })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    render() {
        return(
            <div>
                <Cryptos cryptos={this.state.cryptos}></Cryptos>
            </div>
        )
    }
}