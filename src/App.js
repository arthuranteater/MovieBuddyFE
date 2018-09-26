import React, { Component } from 'react';
import './App.css';
import Main from './components/Main.js';
import Secret from './components/Secret.js';
import NotFound from './components/NotFound.js';
import Callback from './components/Callback.js';


const apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a1e4aa1da92fe4650fdbf74e93240a8a&language=en-US&page=1&region=US'
const movieLink = 'http://localhost:4000/'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            movieData: []
        }
    }

    loadData = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data: data.results,
                })
            })
    }

    componentDidMount = () => this.loadData()

    componentWillMount = () => {
      fetch(movieLink)
        .then(response => response.json())
        .then(dat => {
            this.setState({
                movieData: dat.result,
            })
        })
    }

    render() {
      console.log(this.state.movieData)
        let mainComponent = "";
        switch(this.props.location){
            case "":
                mainComponent = <Main data={this.state.data} {...this.props}/>;
                break;
            case "callback":
                mainComponent = <Callback />;
                break;
            case "secret":
                mainComponent = this.props.auth.isAuthenticated() ? <Secret movieData={this.state.movieData} data={this.state.data} {...this.props} /> : <NotFound/>
                break;
            default:
                mainComponent = <NotFound />;

        }

        return (
            <div className="App">
                <section className="container-fluid">
                    <div className="main-content">
                        <div className="row">
                            <div className="col-sm-8 mx-auto">
                                {mainComponent}
                            </div>
                        </div>
                        <div className="row m-0">
                            <nav>
                                <a>About</a>
                                <a>Movie Buddies</a>
                                <a>Movies</a>
                                <a>Profile</a>
                                <a>Contact Us</a>
                            </nav>
                        </div>
                    </div>
                </section>
            </div>

            );
    }
}

export default App;
