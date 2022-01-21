import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import lottie from 'lottie-web'
import loading from '../src/components/animations/progress-bar.json'
import "./App.css";

const ChatPage = lazy( () => import("./components/pages/chats/ChatPage") )
const Homepage = lazy( () => import ("./components/pages/Homepage") )


function App() {
	React.useEffect( () => {
		lottie.loadAnimation( {
			container: document.querySelector( "#suspense" ),
			animationData: loading,
			loop: true
		} );
	}, [] );

	return (
		<Suspense style={
			{}} fallback={<div id={"suspense"}
		                       style={
			                       {
				                       display: "grid",
				                       width: "100%",
				                       justifyContent: "center",
				                       height: "100px"
			                       }}/>}>
			<div className="App">

				<Routes>
					<Route path="/" exact={true} element={<Homepage/>}/>
					<Route path="/app/chats" element={<ChatPage/>}/>
				</Routes>
			</div>
		</Suspense>
	);
}

export default App
