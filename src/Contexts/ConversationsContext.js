import React, {useContext, useEffect, useState} from "react";
import {db} from "../firebase";
import firebase from "firebase";

export const ConversationsContext=React.createContext();

export const useConversations=()=>{
    return useContext(ConversationsContext)
}

export const ConversationsProvider=({id,children})=>{
    const [conversations,setConversations]=useState([]);
    const [selectedConversationIndex,setSelectedConversationIndex]=useState();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        let unsubscribe;
        if(id){
            unsubscribe=db.collection('users')
                .doc(id)
                .collection('conversations')
                .onSnapshot(snapshot => {
                    setConversations(snapshot.docs.map(doc => {
                        setLoading(false);
                        return {
                            id: doc.id,
                            name: doc.data().name,
                        }
                    }))
                })
        }
        return()=>{
            unsubscribe();
        }

    },[id])

    const createConversation=(recipients,conversationName)=>{
        recipients.push(id);
        db.collection('conversations')
            .add({recipients,name:conversationName})
            .then(conversation=> {
                // eslint-disable-next-line
                recipients.map(id=>{
                    db.collection('users')
                        .doc(id)
                        .collection("conversations")
                        .doc(conversation?.id)
                        .set({timestamp: firebase.firestore.FieldValue.serverTimestamp(),name:conversationName})
                        .catch(error=>console.log(error.message))
                })
            })
            .catch(error=>console.log(error.message));
    }

    const value={
        conversations,
        loading,
        selectedConversation: selectedConversationIndex,
        selectConversation: setSelectedConversationIndex,
        createConversation
    }
    return(
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}




