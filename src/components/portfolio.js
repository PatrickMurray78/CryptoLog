import React from 'react';
import { Cryptos } from './cryptos';
import axios from 'axios';
import Link from 'react-router-dom/Link';

// The Read class reads in the stored cryptos and sends them to the cryptos component
export class Read extends React.Component {

    constructor() {
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    // state contains an empty array 'cryptos' which will contain all the stored cryptos to be displayed.
    // The total portfolioValue is also stored here which I have initialised to 0.
    state = {
        portfolioValue: 0,
        cryptos: []
    };

    // This function uses axios which is a promise based HTTP client
    // We then use it to create a lifecycle hook that returns the JSON data
    componentDidMount() {
        axios.get('http://localhost:4000/api/cryptos')
        .then((response) => {
            this.setState({ cryptos: response.data })
            this.getPortfolioValue(response);

            //setInterval(this.ReloadData, 30000);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    // This function uses axios to create a lifecycle hook that returns the JSON data.
    // Similar to componentDidMount which only gets ran once. This function gets ran whenever
    // a movie is deleted/edited to update the portfolio. It is also called every 30 seconds
    // to ensure the prices are constantly updating.
    ReloadData() {
        axios.get('http://localhost:4000/api/cryptos')
        .then((response) => {
            this.setState({ cryptos: response.data })
            this.getPortfolioValue(response);
        })
        .catch((error) => {
            console.log(error)
        });
    }

    // This function gets the total portfolio value of our portfolio, by iterating
    // through the cryptos array and adding the total value of each crypto to the
    // portfolioValue variable. Updated every 30 seconds
    getPortfolioValue(cryptos) {
        // Set total portfolio value
        this.state.portfolioValue = 0;
        cryptos.data.forEach(crypto => {
            this.state.portfolioValue += crypto.price * crypto.holdings;
        });

        // Set the portfolioValueID label to the current portfolio value
        document.getElementById('portfolioValueID').innerHTML = '$' + parseFloat(this.state.portfolioValue).toFixed(2);//Math.round(this.state.portfolioValue);
    }

    // This function creates our user interface for the portfolio component. 
    // Each crypto is then read in from the cryptos component and displayed
    // in the table.
    render() {
        return(
            <div style={{backgroundColor: "#303030", minHeight: "100vh", position: "relative"}}>
                <div style={{backgroundColor: "grey", width: "90%", height: "70px", margin: "auto", borderRadius: "15px"}}>
                    <h6 style={{color: "white", fontFamily: "monospace", fontSize: "80%", marginBottom: "5px", paddingTop: "7px"}}>Portfolio Value</h6>
                    <h3 id="portfolioValueID" style={{color: "white", fontFamily: "sans-serif"}}></h3>
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