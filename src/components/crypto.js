import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Link from 'react-router-dom/Link';

export class Crypto extends React.Component {

    constructor() {
        super();

        this.DeleteMovie = this.DeleteMovie.bind(this);
    }

    DeleteMovie(e) {
        e.preventDefault();
        console.log("Delete: " + this.props.crypto._id);

        axios.delete("http://localhost:4000/api/cryptos/" + this.props.crypto._id)
        .then(() => {
            this.props.ReloadData();
        })
        .catch();
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>{this.props.crypto.ticker}</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <img src={this.props.crypto.logo} width="100" height="100"></img>
                            <footer className="blockquote-footer">
                                <p>{this.props.crypto.price}</p>
                                <p>{this.props.crypto.holdings}</p>
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={'/edit/' + this.props.crypto._id} className="btn btn-dark">Edit</Link>
                    <Button variant='dark' onClick={this.DeleteMovie}>Delete</Button>
                </Card>
            </div>
        )
    }
}