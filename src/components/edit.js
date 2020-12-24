import React from 'react';
import axios from 'axios';

export class Edit extends React.Component {

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
            logo: this.state.Logo,
            _id: this.state._id
        }

        axios.put('http://localhost:4000/api/cryptos/' + this.state._id, newCrypto)
        .then(res => {
            if (res.status == 200) {
                window.location = "/read" 
            }
        })
        .catch(err => {
            console.log(err)
        });
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
                        onChange={this.onChangeTicker}
                        readOnly></input>
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
                        value='Edit Crypto'
                        className='btn btn-dark'></input>
                    </div>
                </form>
            </div>
        )
    }
}