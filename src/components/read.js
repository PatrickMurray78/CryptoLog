import React from 'react';
import { Cryptos } from './cryptos';

export class Read extends React.Component {

    state = {
        cryptos: [
            {
                "Logo": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=008",
                "Ticker": "BTC",
                "Price": "$23000",
                "Holdings": "14.365"
            },
            {
                "Logo": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=008",
                "Ticker": "ETH",
                "Price": "$550",
                "Holdings": "184.6"
            },
            {
                "Logo": "https://cryptologos.cc/logos/ocean-protocol-ocean-logo.png?v=008",
                "Ticker": "OCEAN",
                "Price": "$0.43",
                "Holdings": "225036.3"
            }
        ]
    };

    render() {
        return(
            <div>
                <Cryptos cryptos={this.state.cryptos}></Cryptos>
            </div>
        )
    }
}