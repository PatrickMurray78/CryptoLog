import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Link from 'react-router-dom/Link';

export class Crypto extends React.Component {

    constructor() {
        super();

        this.DeleteCrypto = this.DeleteCrypto.bind(this);
    }

    DeleteCrypto(e) {
        e.preventDefault();
        console.log("Delete: " + this.props.crypto._id);

        axios.delete("http://localhost:4000/api/cryptos/" + this.props.crypto._id)
        .then(() => {
            console.log("Successfully deleted")
            this.props.ReloadData();
        })
        .catch();
    }

    render() {
        return (
            <table style={{width: "90%", marginLeft: "5vw", textAlign: "right", borderTop: "1px solid rgba(255, 255, 255, 0.3", color: "white", fontFamily: "sans-serif"}}>
                <tr>
                    <td width="10%">
                        <img src={this.props.crypto.logo} style={{height: "30px",  width: "30px", marginRight: "10px"}}></img>
                    </td>
                    <td width="18%" style={{textAlign: "left"}}>
                        <h5>{this.props.crypto.ticker}</h5>
                    </td>
                    <td width="18%">
                        <h5>${this.props.crypto.price}</h5>
                    </td>
                    <td width="18%">
                        <h5>{this.props.crypto.holdings}</h5>
                    </td>
                    <td width="18%">
                        <h5>${Math.round((this.props.crypto.holdings * this.props.crypto.price)*100)/100}</h5>
                    </td>
                    <td width="18%" style={{textAlign: "center"}}>
                        <Link to={'/edit/' + this.props.crypto._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" style={{paddingRight:"10px", color: "white"}}>
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </Link>
                        <Link onClick={this.DeleteCrypto}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style={{paddingLeft:"20px", color: "white"}}>
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </Link>
                    </td>
                </tr>
            </table>
        )
    }
}