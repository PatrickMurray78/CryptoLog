import React from 'react';
import Card from 'react-bootstrap/Card';

export class Crypto extends React.Component {

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.crypto.Ticker}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.crypto.Logo} width="100" height="100"></img>
                            <footer className="blockquote-footer">
                                <p>{this.props.crypto.Price}</p>
                                <p>{this.props.crypto.Holdings}</p>
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}