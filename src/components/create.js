import React from 'react';

export class Create extends React.Component {

    constructor() {
        super();

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeTicker = this.onChangeTicker.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeHoldings = this.onChangeHoldings.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);

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

    onChangeLogo(e) {
        this.setState({
            Logo: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        alert(this.state.Ticker + ' added');
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
                        <label>Add Logo: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Logo}
                        onChange={this.onChangeLogo}></input>
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