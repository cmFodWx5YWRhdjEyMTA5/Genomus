import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions'

class AddBook extends Component {

    state = {
        formdata:{
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:9,
            price:''
        }
    }


    handleInput = (event,name) => {
        const newFormdata = {
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value

        this.setState({
            formdata:newFormdata
        })
    }

    showNewBook = (book) => (
        book.post ?
            <div className="conf_link">
                Вы создали анкету !!! <Link to={`/books/${book.bookId}`}>
                    Нажмите на ссылку, чтобы ее посмотреть
                </Link>
            </div>
        :null
    )


    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId:this.props.user.login.id,
            genId:this.props.user.login.genId
        }))
    }

    componentWillUnmount(){
        this.props.dispatch(clearNewBook())
    }

    render() {
        console.log(this.props);
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Создать анкету</h2>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Введите имя"
                            value={this.state.formdata.name}
                            onChange={(event)=>this.handleInput(event,'name')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Введите университет"
                            value={this.state.formdata.author}
                            onChange={(event)=>this.handleInput(event,'author')}
                        />
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Введите возраст"
                            value={this.state.formdata.pages}
                            onChange={(event)=>this.handleInput(event,'pages')}
                        />
                    </div>

                    <div className="form_element">
                        <select
                            className="select_box"
                            value={this.state.formdata.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        >   
                            <option val='Муж'>Муж</option>
                            <option val='Жен'>Жен</option>
                            <option val='Неизвестно'>Неизвестно</option>
                        </select>
                    </div>

                    <p>Информация о вас:</p>
                    <textarea
                        value={this.state.formdata.review}
                        onChange={(event)=>this.handleInput(event,'review')}
                    />

                    <button type="submit">Создать</button>
                    {
                        this.props.books.newbook ? 
                            this.showNewBook(this.props.books.newbook)
                        :null
                    }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(AddBook)