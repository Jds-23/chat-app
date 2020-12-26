import React, {useContext, useEffect, useState} from 'react'
import './App.css';
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Register from "./Components/Register";
import {auth} from "./firebase";
import {UserContext} from "./Contexts/UserContext";
import {ContactsProvider} from "./Contexts/ContactsContext";
import {ConversationsProvider} from "./Contexts/ConversationsContext";
import Spinner from "react-bootstrap/Spinner";

function App() {
    const [loading,setLoading]=useState(true);
    const {user,setUser}=useContext(UserContext);
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            if (authUser){
                setUser(authUser);
                setLoading(false);
                console.log(authUser);
            }
            else {
                setUser(null);
                setLoading(false);
            }
        })
        // eslint-disable-next-line
    },[])

  return (

    <div className="app">
        {loading?
            <div className="app-loader"><Spinner animation="grow" variant="primary"/></div>:
            <>
                {user?<ContactsProvider>
                        <ConversationsProvider id={user?.uid}>
                            <Dashboard/>
                        </ConversationsProvider>
                    </ContactsProvider>:
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Login/>
                            </Route>
                            <Route exact path="/register">
                                <Register/>
                            </Route>
                        </Switch>
                    </Router>}
            </>
        }

    </div>
  );
}

export default App;
