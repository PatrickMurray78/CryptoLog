import React from 'react';
import axios from 'axios';
import Link from 'react-router-dom/Link';

// The Create class will be used to add new cryptos to portfolio
export class Create extends React.Component {

    constructor() {
        super();

        // Bind new data to corresponding variables
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTicker = this.onChangeTicker.bind(this);
        this.onChangeHoldings = this.onChangeHoldings.bind(this);

        this.state = {
            Ticker: '',
            Price: '',
            Holdings: ''
        }
    }

     // When ticker is changed, set the states ticker to the new one
    onChangeTicker(e) {
        this.setState({
            Ticker: e.target.value
        });
    }

     // When holdings is changed, set the states holdings to the new one
    onChangeHoldings(e) {
        this.setState({
            Holdings: e.target.value
        });
    }

    // When form is submitted, make a post request to the server and pass newCrypto
    onSubmit(e) {
        e.preventDefault();

        const newCrypto = {
            ticker: this.state.Ticker,
            price: this.state.Price,
            holdings: this.state.Holdings
        }

        axios.post('http://localhost:4000/api/cryptos', newCrypto)
        .then((response) => {
            if (response.status == 200) { // Success
                window.location = "/" 
            }
        })
        .catch((err) => {
            if(err.response.status == 404) { // Holdings was an invalid vaue
                document.getElementById('invalidHoldings').innerHTML = "Holdings must be greater than 0!"
            }
            else if(err.response.status == 402) { // Ticker is not currently supported
                document.getElementById('invalidTicker').innerHTML = "Crypto not currently supported!"
            }
        })
    }

    // Inside this render() function we create a form. This form has
    // two input boxes for the ticker and holdings. There is also
    // a submit button at the bottom. Once clicked the data is sent to server
    render() {
        return(
            <div className='App' style={{backgroundColor: "#303030", color: "white", height: "100vh", fontFamily: "monospace"}}>
                <label id='invalidTicker'></label>
                <br></br>
                <label id='invalidHoldings'></label>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{width: "50vw", margin: "auto", paddingTop: "20px"}}>
                        <label>Add Ticker: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Ticker}
                        onChange={this.onChangeTicker}></input>
                    </div>
                    <div className="form-group" style={{width: "50vw", margin: "auto", paddingTop: "20px"}}>
                        <label>Add Holdings: </label>
                        <input type='text'
                        name='holdings'
                        className='form-control'
                        value={this.state.Holdings}
                        onChange={this.onChangeHoldings}></input>
                    </div>
                    <div className="form-group" style={{paddingTop: "30px"}}>
                        <Link onClick={this.onSubmit}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16" style={{color: "white"}}>
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}