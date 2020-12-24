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
                <table width="100%" style={{textAlign: "right"}}>
                    <tr>
                        <td width="10%">

                        </td>
                        <td width="18%" style={{textAlign: "left"}}>
                            <h5>Name</h5>
                        </td>
                        <td width="18%">
                            <h5>Price</h5>
                        </td>
                        <td width="18%">
                            <h5>Holdings</h5>
                        </td>
                        <td width="18%">
                            <h5>Value</h5>
                        </td>
                        <td width="18%">
                        </td>
                    </tr>
                </table>
                <Cryptos cryptos={this.state.cryptos} ReloadData={this.ReloadData}></Cryptos>
            </div>
        )
    }
}