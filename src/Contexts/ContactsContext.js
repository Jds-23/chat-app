import React, {useContext, useEffect, useState} from "react";
import {db} from "../firebase";

export const ContactsContext=React.createContext()

export const useContacts=()=>{
    return useContext(ContactsContext)
}

export const ContactsProvider=({children})=>{
    const [contacts,setContacts]=useState([]);
/*
    const createContact=(id,name)=>{
        setContacts(
            prevState => {
                return [...prevState,{id,name}]
            }
        )
    }*/

    useEffect(() => {
            db.collection("users").onSnapshot(snapshot=>{
              setContacts(snapshot.docs.map(doc=>({
                  id:doc.id,
                  name:doc.data().username
                  })
              ))
            })
    }, []);

    return(
        <ContactsContext.Provider value={{contacts}}>
            {children}
        </ContactsContext.Provider>
    )
}
