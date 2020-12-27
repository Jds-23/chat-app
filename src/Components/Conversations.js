import React from "react";
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../Contexts/ConversationsContext";
import Spinner from "react-bootstrap/Spinner";

const Conversations=()=>{
    // eslint-disable-next-line
    const {selectConversation,conversations,selectedConversation,loading}=useConversations();

    return(
        <ListGroup variant={"flush"} className="contacts">
            {loading ? <div className="app-loader"><Spinner animation="grow" variant="primary"/></div>

                :<>{
                conversations.map((conversation) => {

                    return <ListGroup.Item
                        key={conversation.id}
                        action
                        onClick={() => selectConversation(conversation.id)}
                        active={selectedConversation === conversation.id}
                    >
                        {conversation.name}
                    </ListGroup.Item>
                })
                //console.log(conversations)
            }</>}
        </ListGroup>
    )
}
export default Conversations;