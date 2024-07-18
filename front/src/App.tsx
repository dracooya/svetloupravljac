import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Entry} from "./Components/Entry/Entry.tsx";
import {Main} from "./Components/Main/Main.tsx";
import {EntryService} from "./Services/EntryService.ts";
import {HouseService} from "./Services/HouseService.ts";
import {RoomService} from "./Services/RoomService.ts";

function App() {
  const entryService = new EntryService();
  const houseService = new HouseService();
  const roomService = new RoomService();
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Entry entryService={entryService}/>}/>
                <Route path="/main" element={<Main houseService={houseService} roomService={roomService}/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
