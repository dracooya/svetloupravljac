import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Entry} from "./Entry/Entry.tsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entry/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
