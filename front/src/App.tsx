import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Entry} from "./Components/Entry/Entry.tsx";
import {Main} from "./Components/Main/Main.tsx";
import {EntryService} from "./Services/EntryService.ts";

function App() {
  const entryService = new EntryService();
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entry entryService={entryService}/>}/>
                <Route path="/main" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
