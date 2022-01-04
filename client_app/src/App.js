import * as React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<NavigationBar/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App
