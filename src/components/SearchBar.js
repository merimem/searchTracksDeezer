import React, {Component} from 'react';
import axios from 'axios';
import SongsList from './SongsList';
import debounce from "lodash.debounce";


const API_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track'

class SearchBar extends Component{
  constructor(props){
    super (props);
    this.state = {
      query: '',
      results : [],
      songs: [],
      error: false,
      hasMore: true,
      isLoading: false,
      next: null,
      total: null
    };
    window.onscroll = debounce(() => {
      const {
        loadSongs,
        getScrollTop,
        getDocumentHeight,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;
      if (error || isLoading || !hasMore) return;
      
      if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
	      loadSongs();
    }, 100);
  } 
  getScrollTop = () => {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  getDocumentHeight = () => {
    const body = document.body;
    const html = document.documentElement;
    
    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  };
  
  
  
  loadSongs = () => {
    let newIndex = this.state.index + this.state.per
    if (newIndex >= this.state.results.length)
        newIndex = this.state.results.length
    this.setState({ isLoading: true})
    if (this.state.next !== null){
      axios.get(this.state.next)
      .then(({ data }) => {
        this.setState({ 
          hasMore: data.next ? true : false,
          isLoading: false,
          songs: [
              ...this.state.songs,
              ...data.data,
            ],
            next: data.next ? data.next : null
        }) 
      })

    }
}
  
handleSubmit = (e) => {   
  e.preventDefault();    
  this.setState({
      query: this.search.value
  }, () => {
    if (this.state.query === "" ) {
      this.setState({
        songs: [],
        results : [],
        next : null,
        total : null
      }) 
    } else if (this.state.query) {
      this.getInfo()  
    }
  })
}  
    handleInputChange = () => {       
      this.setState({
          query: this.search.value
      }, () => {
        if (this.state.query === "" ) {
          this.setState({
            songs: [],
            results : [],
            next : null,
            total : null
          }) 
        } else if (this.state.query) {
          this.getInfo()  
        }
      })
    }

    getInfo = () => {
      let cancel;
      axios({
        method:"GET",
        url: `${API_URL}`,
        params: {
          q: `${this.state.query}` 
        },
        cancelToken: new axios.CancelToken(c => cancel =c)
      }).then(({ data }) => {   
        console.log("seting next for the 1st time: ", (data.next) ? data.next : null ) 
          this.setState({
            results: data.data,
            songs: data.data.slice(0, this.state.per),
            next: (data.next) ? data.next : null,
            total: data.total
          })
          console.log("state updated", this.state)
      }).catch(e => {
        if (axios.isCancel(e)) return
      })
      return() => cancel() 
    }  
    render() {
      let tracks= this.state.total? this.state.total+" tracks" : ""
      let  isLoading = this.state.isLoading === true ?  
        <div className="progress">
            <div className="indeterminate"></div>
        </div> : ""
     
      return (
        <div>
        <form id="autocomplete-input" onSubmit={this.handleSubmit}>  
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            
            />     
        </form>
        <div className="tracks">{tracks} </div>    
            <SongsList songs={this.state.songs} per={this.state.per}   /> 
            {isLoading}
        </div>
      )
    }
    
}
export default SearchBar;
