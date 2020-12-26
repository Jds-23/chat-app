import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useContacts} from "../Contexts/ContactsContext";
import {useConversations} from "../Contexts/ConversationsContext";

const NewConversationModal=({closeModal,user})=>{
    const [selectedContactIds,setSelectedContactIds]=useState([]);
    const [conversationName,setConversationName]=useState('');
    const {contacts}=useContacts();
    const {createConversation}=useConversations()

    const handleCheckboxChange=(contactId)=>{
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevId=>{
                    return contactId!==prevId
                })
            }

            else{
                return [...prevSelectedContactIds,contactId];
            }
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(selectedContactIds);
        createConversation(selectedContactIds,conversationName);
        closeModal();
    }
    return(
        <div className="new-conversation-modal">
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact=>{
                        if(user?.displayName!==contact?.name) {
                            return (
                                <Form.Group controlId={contact.id} key={contact.id}>
                                    <Form.Check
                                        type={"checkbox"}
                                        value={selectedContactIds.includes(contact.id)}
                                        label={contact.name}
                                        onChange={() => handleCheckboxChange(contact.id)}
                                    />
                                </Form.Group>
                            )
                        }
                        else return <span key={contact.id}/>
                    })
                    }
                    <Form.Group>
                        <Form.Label>Enter Conversation Name</Form.Label>
                        <Form.Control type="text" value={conversationName} onChange={(e)=>setConversationName(e.target.value)} required/>
                    </Form.Group>
                    <Button type={"submit"}>Create</Button>
                </Form>
            </Modal.Body>
        </div>
    )
}

export default NewConversationModal;