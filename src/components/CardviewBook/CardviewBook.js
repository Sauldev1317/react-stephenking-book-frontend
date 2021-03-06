import React from "react";
import { Link } from "react-router-dom";
import './CardviewBook.css';

function CardviewBook(props) {
    const book = props.book;
    return (
        <Link
            className="link"
            to={"/Book/" + book.id}>
           <div
            className="card-book">
                <img alt={book.book_name} src={'http://localhost:3001' + book.img_url}/>
                <div className="card-main-body">
                    <div className="card-title">{book.book_name}</div>
                    <div className="card-description">{book.description}</div>
                </div>
             </div>
        </Link>
       
    );
  }

export default CardviewBook;