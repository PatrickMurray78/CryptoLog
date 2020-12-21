import React from 'react';

export class Read extends React.Component {

    state = {
        portfolio: [
            {
                "Logo": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=008",
                "Ticker": "Btc",
                "Price": "23000",
                "Holdings": "14.365"
            },
            {
                "Logo": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=008",
                "Ticker": "Eth",
                "Price": "550",
                "Holdings": "184.6"
            },
            {
                "Logo": "https://cryptologos.cc/logos/ocean-protocol-ocean-logo.png?v=008",
                "Ticker": "Ocean",
                "Price": "0.43",
                "Holdings": "225036.3"
            }
        ]
    };

    render() {
        return(
            <div>
                <h1>This is the read component</h1>
            </div>
        )
    }
}