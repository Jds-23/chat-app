import React, {useContext} from 'react';
import {UserContext} from "../Contexts/UserContext";
import Sidebar from "./Sidebar";
import {useConversations} from "../Contexts/ConversationsContext";
import OpenConversation from "./OpenConversation";
import {useMediaQuery} from "react-responsive"

const Dashboard=()=>{
    const {user}=useContext(UserContext);
    const {selectedConversation,selectConversation}=useConversations();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return(
        <div className={"dashboard d-flex"} style={{maxHeight:'100vh',minHeight:'100vh'}}>
            {isTabletOrMobile?
                <>
                    {selectedConversation?<>
                    <div className="header-back">
                        <span onClick={()=>selectConversation()}>Back</span>
                    </div>
                    <OpenConversation selectedConversation={selectedConversation} username={user?.displayName}
                                                            id={user?.uid}/>
                                                            </>
                                                            :<Sidebar user={user}/>}
                </>
                :<><Sidebar user={user}/>
                {selectedConversation &&
                <OpenConversation selectedConversation={selectedConversation} username={user?.displayName}
                                  id={user?.uid}/>}
                </>}
        </div>
    )
}

export default Dashboard;