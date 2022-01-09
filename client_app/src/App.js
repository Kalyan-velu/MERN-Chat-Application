import * as React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigation/NavigationBar";
import axios from "axios";

function App() {
    const [ open, setOpen ] = useState( false );
    const [ userName, setUserName ] = useState( " " );
    const [ phoneNumber, setPhoneNumber ] = useState( " " );
    const [ passWord, setPassWord ] = useState( " " );
    const [ hasAccount, setHasAccount ] = useState( false );

    const register = () => {
        axios.post( `http://localhost:8080/app/register`, {
                "userName": userName,
                "phoneNumber": phoneNumber,
                "passWord": passWord,
            } )
            .then( (response) => {
                console.log( response );
            } )
            //error handling
            .then( (error) => {
                console.log( error );
            } );
        return (
            <p>Registered</p>
        )
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <NavigationBar
                            setOpen={setOpen}
                            setUsername={setUserName}
                            setPassword={setPassWord}
                            setPhoneNumber={setPhoneNumber}
                            setHasAccount={setHasAccount}
                            hasAccount={hasAccount}
                            open={open}
                            register={register()}
                        />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App
