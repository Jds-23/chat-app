import React, {useContext, useEffect, useState} from "react";
import {db} from "../firebase";

export const ContactsContext=React.createContext()

export const useContacts=()=>{
    return useContext(ContactsContext)
}

export const ContactsProvider=({children})=>{
    const [contacts,setContacts]=useState([]);
    const [loading,setLoading]=useState(true);

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
              setContacts(snapshot.docs.map(doc=> {
                  setLoading(false);
                  return {
                          id: doc.id,
                          name: doc.data().username
                      }
                  }
              ))
            })
    }, []);

    return(
        <ContactsContext.Provider value={{contacts,loading}}>
            {children}
        </ContactsContext.Provider>
    )
}
