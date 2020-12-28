import React from 'react';
import axios from 'axios';
import Link from 'react-router-dom/Link';

export class Edit extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTicker = this.onChangeTicker.bind(this);
        this.onChangeHoldings = this.onChangeHoldings.bind(this);

        this.state = {
            Logo: '',
            Ticker: '',
            Price: '', 
            Holdings: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/cryptos/' + this.props.match.params.id)
        .then((response) => {
            this.setState({
                _id: response.data._id,
                Ticker: response.data.ticker,
                Price: response.data.price,
                Holdings: response.data.holdings,
                Logo: response.data.logo
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    onChangeTicker(e) {
        this.setState({
            Ticker: e.target.value
        });
    }

    onChangeHoldings(e) {
        this.setState({
            Holdings: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newCrypto = {
            ticker: this.state.Ticker,
            price: this.state.Price,
            holdings: this.state.Holdings,
            _id: this.state._id
        }

        axios.put('http://localhost:4000/api/cryptos/' + this.state._id, newCrypto)
        .then(res => {
            if (res.status == 200) {
                window.location = "/" 
            }
        })
        .catch(err => {
            document.getElementById('invalidInput').innerHTML = "Holdings must be greater than 0!"
            console.log(err)
        });
    }

    render() {
        return(
            <div className='App' style={{backgroundColor: "#303030", color: "white", height: "100vh", fontFamily: "monospace"}}>
                <label id='invalidInput'></label>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" style={{width: "50vw", margin: "auto", paddingTop: "20px"}}>
                        <label>Add Ticker: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Ticker}
                        onChange={this.onChangeTicker}
                        readOnly></input>
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