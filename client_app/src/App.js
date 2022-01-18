import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

const ChatPage = lazy( () => import("./components/pages/chats/ChatPage") )
const Homepage = lazy( () => import ("./components/pages/Homepage") )


function App() {

	return (
		<div className="App">
			<Suspense fallback={<div style={{color: "red"}} className={"suspense"}>Loading...</div>}>
				<Routes>
					<Route path="/app" element={<Homepage/>}/>
					<Route path="/app/chats" element={<ChatPage/>}/>
				</Routes>
			</Suspense>
		</div>
	);
}

export default App
