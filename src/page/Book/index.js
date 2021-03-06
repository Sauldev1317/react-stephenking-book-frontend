import React, { Component } from "react";
import { Redirect } from 'react-router'
import './index.css';
import BooksDataService from "../../services/books.service";
import DialogConfirm from "../../components/DialogConfirm/DialogConfirm";

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
          book: "",
          showDialog: false,
          redirect: false 
        };
        this.getBook = this.getBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.showDialog = this.showDialog.bind(this);
      }

    componentDidMount() {
        this.getBook();
    }

    getBook(){
        BooksDataService.get(this.props.match.params.id)
        .then(response => {
            this.setState({
                book: response.data
            });
            console.log(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    deleteBook(res){
        if(res){
            BooksDataService.delete(this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({ 
                    redirect: true 
                });
            }).catch(err => {
                console.log(err);
            });
        }
        this.showDialog();
    }

    updateBook(){

    }

    showDialog(){
        this.setState({
            showDialog: !this.state.showDialog
        });
    }

    render() {
        const { book, redirect } = this.state; 
        if (redirect) {
            return <Redirect to='/home'/>;
        }
        return(
            <div 
                className="container">
                    <div className="container-img">
                        <img className="img-book" alt={book.book_name} src={'http://localhost:3001' + book.img_url}/>
                    </div>
                    <div className="container-description">
                        <div className="book-title">{book.book_name}</div>
                        <div className="book-description">{book.description}</div>
                        <div className="book-date">Fecha: {book.release_date} </div>
                        <button className="btn btn-update">Update</button>
                        <button className="btn btn-eliminar" onClick={this.showDialog}>Eliminar</button>
                    </div>
                    {
                        this.state.showDialog ? 
                        <DialogConfirm 
                            dialogTitle = "Eliminar Libro"
                            dialogDescription = "¿Seguro que quieres eliminar este boton?"
                            callback={this.deleteBook} /> : null
                    }
            </div>
        );
    }
}

export default Book;