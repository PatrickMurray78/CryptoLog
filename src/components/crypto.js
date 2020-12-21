import React from 'react';

export class Crypto extends React.Component {

    render() {
        return(
            <div>
                <img src={this.props.crypto.Logo} width="100" height="100"></img>
                <h4>{this.props.crypto.Ticker}</h4>
                <h4>{this.props.crypto.Price}</h4>
                <h4>{this.props.crypto.Holdings}</h4>
                <br></br><br></br><br></br><br></br>
            </div>
        )
    }
}