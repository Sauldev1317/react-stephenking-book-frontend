import React, { Component } from "react";
import { Redirect } from 'react-router';
import moment from 'moment'
import BooksDataService from "../../services/books.service";
import './index.css';

export default class AddBook extends Component {

    constructor(props) {
        super(props);        
        this.state = {
          id: 0,
          name: "",
          release_date: moment().format('YYYY-MM-DD'),
          description: "",
          file: null, 
          fileName: "SUBIR",
          redirect: false 
        };
        this.onChangePictureBook = this.onChangePictureBook.bind(this);
        this.onChangeNameBook = this.onChangeNameBook.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveBook = this.saveBook.bind(this);
      }

      componentDidMount() {
      }
    
      componentWillUnmount() {
      }

      onChangePictureBook(e){
        this.setState({
          file:e.target.files[0],
          fileName:e.target.files[0].name
        });
      }

      onChangeNameBook(e) {
        this.setState({
          name: e.target.value
        });
      }
    
      onChangeDate(e) {
        this.setState({
          release_date: e.target.value
        });
      }

      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }

      saveBook(e) {
        e.preventDefault();
        const data = new FormData()
        data.append('img_url', this.state.file);
        data.append('id', this.state.id);
        data.append('name', this.state.name);
        data.append('release_date', this.state.release_date);
        data.append('description', this.state.description);
        BooksDataService.create(data)
        .then((response) => {
          alert("Libro guardado correctamente");
          this.setState({ 
            redirect: true 
          });
        }).catch((error) => {
          alert(error)
        });
      }

    render() {
      const {fileName, redirect} = this.state;
      if (redirect) {
        return <Redirect to='/home'/>;
      }
 
        return(
            <div className="card-container">
              <div className="formulario-container">
                
                <form className="formulario" onSubmit={this.saveBook}>
                    <h2>Nueva novela</h2>

                    <p>Completa el formulario para agregar una nueva novela a la base de datos</p>
                    
                    <input 
                        className="input-picture"
                        type="file"
                        id="img_url" 
                        name="img_url"
                        accept="image/*"
                        onChange={this.onChangePictureBook}/>

                    <label className="label-input-file" htmlFor="img_url">
                        <span>{fileName}</span>
                    </label>
                    
                    <input 
                          className="input-name"
                          id="name"
                          type="text" 
                          placeholder="Novela"
                          value={this.state.name} 
                          onChange={this.onChangeNameBook}/>
                        
                    <input 
                        className="input-date"
                        type="date" 
                        id="fecha" 
                        value={this.state.release_date} 
                        onChange={this.onChangeDate}/>

                    <textarea 
                          className="input-description" 
                          id="subject" 
                          placeholder="¿De que trata el libro?" 
                          value={this.state.description} 
                          onChange={this.onChangeDescription}
                          rows="4"/>

                    <button className="btn-save" type="submit">Guardar</button>

                </form>
              </div>
              <div className="description-form"> 
                  <img alt="New book" src={require("../../assets/img/tumblr_puenrxH0Ea1t7b5qro2_1280.jpg")}/>
              </div>
            </div>
        );
    }
}