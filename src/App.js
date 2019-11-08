import React, {Component} from 'react';
import SearchBar from './components/SearchBar';
import Navbar from './components/navbar';

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
          <Navbar />
          <SearchBar />
        </div>
     
    );
  }
   
}

export default App;
