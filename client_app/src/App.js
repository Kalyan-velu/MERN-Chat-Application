import './App.css';
import NavigationBar from "./components/navigation/NavigationBar";
import Authentication from "./components/registration/Authentication";


function App() {
    return (
        <div className="App">
            <NavigationBar/>
            <Authentication/>
        </div>
    );
}
export default App;
