import React from 'react';
import { Cryptos } from './cryptos';
import axios from 'axios';
import Link from 'react-router-dom/Link';

export class Read extends React.Component {

    constructor() {
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    state = {
        portfolioValue: 0,
        cryptos: []
    };


    componentDidMount() {
        axios.get('http://localhost:4000/api/cryptos')
        .then((response) => {
            this.setState({ cryptos: response.data })
            console.log(response.data)
            this.getPortfolioValue(response);
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

    getPortfolioValue(cryptos) {
        // Set total portfolio value
        cryptos.data.forEach(crypto => {
            this.state.portfolioValue += crypto.price * crypto.holdings;
        });
        document.getElementById('portfolioValueID').innerHTML = '$' + Math.round(this.state.portfolioValue * 100) / 100;
    }

    render() {
        return(
            <div style={{backgroundColor: "#303030", minHeight: "100vh", position: "relative"}}>
                <div style={{backgroundColor: "grey", width: "90%", height: "70px", margin: "auto", borderRadius: "15px"}}>
                    <h6 style={{color: "white", fontFamily: "monospace", fontSize: "80%", marginBottom: "5px", paddingTop: "7px"}}>Portfolio Value</h6>
                    <h4 id="portfolioValueID" style={{color: "white", fontFamily: "sans-serif"}}></h4>
                </div>
                <table width="90%" style={{textAlign: "right", color: "rgba(255, 255, 255, 0.5)", marginLeft: "5vw", marginTop: "2vh", marginBottom: "-2vh", fontFamily: "monospace"}}>
                    <tr>
                        <td width="10%"></td>
                        <td width="18%" style={{textAlign: "left"}}>
                            <p>Name</p>
                        </td>
                        <td width="18%">
                            <p>Price</p>
                        </td>
                        <td width="18%">
                            <p>Holdings</p>
                        </td>
                        <td width="18%">
                            <p>Value</p>
                        </td>
                        <td width="18%"></td>
                    </tr>
                </table>
                <Cryptos cryptos={this.state.cryptos} ReloadData={this.ReloadData}></Cryptos>
                <Link to={'/create'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" style={{position: "absolute", bottom: "20px", color: "white"}}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </Link>
            </div>
        )
    }
}