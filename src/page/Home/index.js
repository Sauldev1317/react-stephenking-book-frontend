import React, { Component } from "react";
import './index.css';
import BooksDataService from "../../services/books.service";
import CardviewBook from "../../components/CardviewBook/CardviewBook"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          books: [],
          inputSearch: ""
        };
        this.retrieveBooks = this.retrieveBooks.bind(this);
        this.searchBook = this.searchBook.bind(this);
        this.onChangeInputSearch = this.onChangeInputSearch.bind(this);
      }

    componentDidMount() {
      this.retrieveBooks();
    }

    onChangeInputSearch(e) {
      this.setState ({
        inputSearch: e.target.value
      });
    }

    retrieveBooks() {
        BooksDataService.getAll()
          .then(response => {
            this.setState({
              books: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
    }

    searchBook() {
      const inputSearch = this.state.inputSearch;
      console.log(inputSearch)
      if(inputSearch == ""){
        this.retrieveBooks();
      }else{
        BooksDataService.findByTitle(inputSearch)
        .then(response => {
          this.setState({
            books: response.data
          });
        })
        .catch(e => {
          console.log(e);
        });
      }

      
  }
   
    render() {
        const { books } = this.state;
        const booksList = books.map((book, index) => {
          return ( <CardviewBook key={index} book= {book}/>);
        });

        return(
          <div className="home-container">
            <div className="search-content">

              <input
                className="input-search"
                type="text"
                placeholder="Busca tu libro"
                value={this.state.inputSearch}
                onChange={this.onChangeInputSearch}
              />

              <button 
                className="btn-search"
                onClick={this.searchBook}>Buscar</button>

            </div>
           
              { 
                books.length ? (
                  <div className="book-list-container">
                    {booksList} 
                  </div>
                ) : (
                  <div className="empty-book-list">No se encontro ningún resultado...</div>
              )} 

          </div>

        );
    }
}