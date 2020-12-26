import React, {useCallback, useEffect, useState} from "react";
import {Form,InputGroup,Button} from 'react-bootstrap';
import {db} from "../firebase";
import firebase from "firebase";
import Spinner from "react-bootstrap/Spinner";

const OpenConversation=({id,username,selectedConversation})=>{
    const [loading,setLoading]=useState(true);
    const [text,setText]=useState('');
    const [messages,setMessages]=useState([]);
    const setRef=useCallback(node=>{
        if(node){
            node.scrollIntoView({smooth: true})
        }
    },[])


    useEffect(()=>{
        let unsubscribe;
        if (selectedConversation){
            setLoading(true);
            unsubscribe=db.collection('conversations')
                .doc(selectedConversation)
                .collection('messages')
                .orderBy('timestamp','asc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc=>{
                        return{
                            fromMe:doc.data().senderId===id,
                            senderName:doc.data().senderName,
                            text:doc.data().text,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        }
                    }))
                    setLoading(false);
                })
        }

        return()=>{
            unsubscribe();
        }
    },[selectedConversation,id])




    const handleSubmit=(e)=>{
        e.preventDefault();
        db.collection('conversations')
            .doc(selectedConversation)
            .collection('messages')
            .add({
                text,
                senderName:username,
                senderId:id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch(error=>console.log(error.messages))
        setText('');
    }

    return(
        <div className="d-flex flex-column flex-grow-1">
            <div className="flex-grow-1 overflow-auto">
                {loading ?
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{minHeight: "100%"}}>
                        <Spinner animation="grow" variant="primary"/></div>
                    :
                    <div className=" d-flex flex-column align-items-start justify-content-end px-3 ">
                        {messages.map((message, index) => {
                            const lastMessage = messages.length - 1 === index;
                            return (
                                <div
                                    ref={lastMessage ? setRef : null}
                                    key={index}
                                    className={`my-1 d-flex flex-column
                                ${message.fromMe ?
                                        'align-self-end' :
                                        ''}`}
                                >
                                    <div
                                        className={`rounded px-2 py-1 
                                    ${message.fromMe ?
                                            'bg-primary text-white' :
                                            "border"}`}
                                    >
                                        {message.text}
                                    </div>
                                    <div
                                        className={`text-muted small 
                                    ${message.fromMe ?
                                            'text-right' :
                                            ""}`}
                                    >
                                        {
                                            message.fromMe ? 'You' : message.senderName
                                        }
                                    </div>
                                </div>

                            )
                        })}
                    </div>}
            </div>
            <Form className={"m-2"} onSubmit={handleSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                            style={{height:"75px", resize:'none'}}
                        />

                        <InputGroup.Append>
                            <Button type={"submit"}>Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>

        </div>
    )
}
export default OpenConversation;


