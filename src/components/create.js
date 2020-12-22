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

    render() {
        return(
            <div>
                <h1>This is the create component</h1>
            </div>
        )
    }
}