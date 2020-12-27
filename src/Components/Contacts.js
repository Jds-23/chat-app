import React from "react";
import {useContacts} from "../Contexts/ContactsContext";
import {ListGroup} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const Contacts=({user})=>{

    const {contacts,loading}=useContacts();

    return(
        <ListGroup variant={"flush"} className="contacts">
            {loading?<div className="app-loader"><Spinner animation="grow" variant="primary"/></div>
                : <>{
                    contacts.map(contact => {
                        if (user?.displayName !== contact?.name)
                            return <ListGroup.Item key={contact?.id}>
                                {contact?.name}
                            </ListGroup.Item>
                        else return <span key={contact.id}/>
                    })
                }</>}
        </ListGroup>
    )
}
export default Contacts;