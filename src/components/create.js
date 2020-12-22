import React from 'react';

export class Create extends React.Component {

    constructor() {
        this.super();

        this.state = {
            Logo: '',
            Ticker: '',
            Price: '',
            Holdings: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Logo: </label>
                        <input type='text'
                        className='form-control'
                        value={this.state.Logo}
                        onChange={this.onChangeLogo}></input>
                    </div>
                </form>
            </div>
        )
    }
}