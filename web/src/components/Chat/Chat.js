import React,{useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'


const Chat = () =>{
    const [name, setName] = React.useState('')
    const [room, setRoom] = useState('')

    useEffect(()=>{
        const {name, room} = queryString.parse(location)

        setName(name)
        setRoom(room)
    })
    return (
        <h1></h1>
    )
}
export default Chat