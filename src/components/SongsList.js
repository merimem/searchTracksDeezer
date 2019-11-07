import React, {Component} from 'react'
import Song from './Song';
import orderBy from 'lodash/orderBy';
import ResizableTable, { ResizingIcon } from 'react-resizable-table';

class SongsList extends Component{
    constructor(props) {
        super(props);
        
        // Sets up our initial state
        this.state = {
            columnToSort: '',
            sortDirection: 'default',           
        };
    }      
      
    handleSort =(columnName)=> {
        const invertDirection = {
            'asc': 'desc',
            'desc': 'asc'
        }
        this.setState(state => ({
            columnToSort: columnName,
            sortDirection: state.columnToSort === columnName ? invertDirection[state.sortDirection]: 'asc'
        }))
    }
    
   
    render(){       
        var options,
            optionsListed,
            data;
        
        if (this.state.sortDirection === "default") {
            options = this.props.songs.map((song, index) => {
                return (
                    <Song key ={index} song={song}/>            
                )
            })
        }else{
            data = this.props.songs.map(d => {
                d["artistName"] = d.artist.name
                d["albumName"]  = d.album.title
                return d
            })   
            optionsListed = orderBy(data, this.state.columnToSort, this.state.sortDirection)        
            options = optionsListed.map((song,index) => {
                return (
                    <Song key={index} song={song}/>            
                )
            })
        }       
        const header = [
            {name: "", prop:'picture'},
            {name:"Artist", prop:'artistName'},
            {name: 'Title', prop:'title'},           
            {name:"Album", prop:'albumName'}]
      
                        
     
        return (
            <div className="datagrid" key ="datagrid">
                <div className="myTable">
                <ResizableTable >
                    <table width="100%" border="0" id="resizableTable" className = "striped">
                        <thead>
                            <tr>
                                {header.map((x, i) => (
                                    <th className="firstRow" key={`thc-${i}`} ><ResizingIcon /><div onClick={()=> this.handleSort(x.prop)}>{x.name}</div></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {options}                          
                        </tbody>
                    </table>
                </ResizableTable>
                                     
                </div>
            </div>
        )}
}

export default SongsList