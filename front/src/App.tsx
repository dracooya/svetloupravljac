import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Entry} from "./Components/Entry/Entry.tsx";
import {Main} from "./Components/Main/Main.tsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entry/>}/>
                <Route path="/main" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
