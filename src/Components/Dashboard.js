import React, {useContext} from 'react';
import {UserContext} from "../Contexts/UserContext";
import Sidebar from "./Sidebar";
import {useConversations} from "../Contexts/ConversationsContext";
import OpenConversation from "./OpenConversation";

const Dashboard=()=>{
    const {user}=useContext(UserContext);
    const {selectedConversation}=useConversations();


    return(
        <div className={"dashboard d-flex"} style={{maxHeight:'100vh',minHeight:'100vh'}}>
            <Sidebar user={user}/>
            {selectedConversation &&
            <OpenConversation selectedConversation={selectedConversation} username={user?.displayName} id={user?.uid}/>}
        </div>
    )
}

export default Dashboard;