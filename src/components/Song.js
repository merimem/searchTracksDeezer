import React from 'react'

 function Song(props) {
    return (
        
        <tr>           
            <td className="col s12 m6 l3"><img alt="" src={props.song.artist.picture_small}/></td>
            <td className="col s12 m6 l3">{props.song.artist.name}</td>
            <td className="col s12 m6 l3">{props.song.title}</td>
            <td className="col s12 m6 l3">{props.song.album.title}</td>    
        </tr>
    )
}

export default Song;