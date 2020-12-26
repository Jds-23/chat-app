import React, {useState} from "react";
import {Tab,Nav,Button,Modal} from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import {auth} from "../firebase";
//import NewContactModal from "./NewContactModal";

const Sidebar=({user})=>{
    const [activeKey,setActiveKey]=useState("conversations");
    const [modalOpen,setModalOpen]=useState(false);


    const closeModal=()=>{

        setModalOpen(false);
    }

    return(
        <div style={{width: '250px'}} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className={"justify-content-center"}>
                    <Nav.Item>
                        <Nav.Link eventKey={"conversations"}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={"contacts"}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className={"border-right overflow-auto flex-grow-1"}>
                    <Tab.Pane eventKey={"conversations"}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={"contacts"}>
                        <Contacts user={user}/>
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Username: <span className={"text-muted"}>{user?.displayName}</span>
                </div>
                <Button className="rounded-0" onClick={()=>setModalOpen(true)}>
                    New Conversation
                </Button>
                <Button className="rounded-0 btn-danger" onClick={()=>auth.signOut()}>
                    Logout
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                <NewConversationModal closeModal={closeModal} user={user}/>
            </Modal>
        </div>
    )
}

export default Sidebar;