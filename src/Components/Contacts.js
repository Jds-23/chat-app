import React from "react";
import {useContacts} from "../Contexts/ContactsContext";
import {ListGroup} from "react-bootstrap";

const Contacts=({user})=>{

    const {contacts}=useContacts()
    return(
        <ListGroup variant={"flush"} className="contacts">
            {
                contacts.map(contact =>{
                    if(user?.displayName!==contact?.name)
                    return <ListGroup.Item key={contact?.id}>
                        {contact?.name}
                    </ListGroup.Item>
                    else return <span key={contact.id}/>
                })
            }
        </ListGroup>
    )
}
export default Contacts;