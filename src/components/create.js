import React from 'react';
import axios from 'axios';

export class Create extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTicker = this.onChangeTicker.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeHoldings = this.onChangeHoldings.bind(this);

        this.state = {
            Logo: '',
            Ticker: '',
            Price: '',
            Holdings: ''
        }
    }

    onChangeTicker(e) {
        this.setState({
            Ticker: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            Price: e.target.value
        });
    }

    onChangeHoldings(e) {
        this.setState({
            Holdings: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        //alert(this.state.Holdings + ' ' + this.state.Ticker + ' added at ' + this.state.Price);

        const newCrypto = {
            ticker: this.state.Ticker,
            price: this.state.Price,
            holdings: this.state.Holdings,
            logo: this.state.Logo
        }

        axios.post('http://localhost:4000/api/cryptos', newCrypto)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return(
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Ticker: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Ticker}
                        onChange={this.onChangeTicker}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Price: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Price}
                        onChange={this.onChangePrice}></input>
                    </div>
                    <div className="form-group">
                        <label>Add Holdings: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Holdings}
                        onChange={this.onChangeHoldings}></input>
                    </div>
                    <div className="form-group">
                        <input type='submit'
                        value='Add Crypto'
                        className='btn btn-dark'></input>
                    </div>
                </form>
            </div>
        )
    }
}