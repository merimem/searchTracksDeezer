import React from 'react'

 function Song(props) {
    return (
        
        <tr>           
            <td><img alt="" src={props.song.artist.picture_small}/></td>
            <td>{props.song.artist.name}</td>
            <td>{props.song.title}</td>
            <td>{props.song.album.title}</td>    
        </tr>
    )
}

export default Song;