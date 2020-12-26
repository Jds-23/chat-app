import React from "react";
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../Contexts/ConversationsContext";

const Conversations=()=>{
    // eslint-disable-next-line
    const {selectConversation,conversations,selectedConversation}=useConversations();
    return(
        <ListGroup variant={"flush"} className="contacts">
            {
                conversations.map((conversation) =>{

                    return <ListGroup.Item
                        key={conversation.id}
                        action
                        onClick={()=>selectConversation(conversation.id)}
                        active={selectedConversation===conversation.id}
                    >
                        {conversation.name}
                    </ListGroup.Item>
                })
                //console.log(conversations)
            }
        </ListGroup>
    )
}
export default Conversations;