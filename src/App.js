import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';

class App extends Component {
  state = {
    searchSong: ''
  }
  handleInput = (e) =>{
    this.setState({
      searchSong: e.target.value
    })
  }
  render(){
    
    return (
      <div className="App">
      <img alt="deezer" src="/img/logo.png" className="logo"/>
       
        <SearchBar />
        
      </div>
    );
  }
   
}

export default App;
