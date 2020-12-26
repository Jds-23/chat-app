import React, {useContext, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {UserContext} from "../Contexts/UserContext";
import {auth, db} from "../firebase";

const Register=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const {user}=useContext(UserContext);

    const history=useHistory();

    if (user)
        history.push("/");

    const handleSubmit=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
            .then((authUser)=>{
                db.collection("users").doc(authUser.user.uid).set({
                    username,
                    email
                }).catch(error=>console.log(error.message));
                return authUser.user.updateProfile({
                    displayName:username
                })
            })
            .catch(error=>alert(error.message));
        setPassword("");setEmail("");setUsername("");
    }

    return(<Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form className={"w-100"} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Button type={"submit"} className={"mr-2"}>Register</Button>
                <Button variant={"secondary"} onClick={()=>history.push('/')}>Login</Button>
            </Form>
        </Container>
    )
}

export default Register;