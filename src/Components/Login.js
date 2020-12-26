import React, {useState} from 'react';
import {Container,Form,Button} from "react-bootstrap";
import {useHistory} from 'react-router-dom'
import {auth} from "../firebase";

const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const history=useHistory();


    const handleSubmit=(e)=> {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
            .catch((error)=>alert(error.message));
        setEmail('');setPassword('');
    }

    return(
        <Container className="align-items-center d-flex" style={{height: '100vh'}}>
            <Form className={"w-100"} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Email</Form.Label>
                    <Form.Control type="text" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>
                <Button type={"submit"} className={"mr-2"}>Login</Button>
                <Button variant={"secondary"} onClick={()=>history.push('/register')}>Register</Button>
            </Form>
        </Container>
    )
}
export default Login;