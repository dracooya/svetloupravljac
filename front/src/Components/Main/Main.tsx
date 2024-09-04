import {CssVarsProvider, Grid} from "@mui/joy";
import React, {useEffect, useRef, useState} from "react";
import {HomeAndRoomConfig} from "../HomeAndRoomConfig/HomeAndRoomConfig.tsx";
import {House} from "../../Models/House.ts";
import {Scenes} from "../Scenes/Scenes.tsx";
import {LightsState} from "../LightsState/LightsState.tsx";
import {Room} from "../../Models/Room.ts";
import {HouseService} from "../../Services/HouseService.ts";
import {RoomService} from "../../Services/RoomService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {LightService} from "../../Services/LightService.ts";
import {SceneService} from "../../Services/SceneService.ts";
import {io} from "socket.io-client";

interface MainProps {
    houseService: HouseService,
    roomService: RoomService,
    lightService: LightService,
    sceneService: SceneService
}


export function Main({houseService, roomService, lightService, sceneService} : MainProps) {
    const socket = io('http://localhost:5000');
    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const [houses, setHouses] = useState<House[]>([]);
    const shouldLoad = useRef(true);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const shouldShowMessage = useRef(true);
    const handlePopupClose = () => {
        if(localStorage.getItem("message") != null) localStorage.removeItem("message");
        setPopupOpen(false); }
    const message_401 = import.meta.env.VITE_401_MESSAGE

    useEffect(() => {
        if(!shouldShowMessage.current) return;
        if(localStorage.getItem("message") != null) {
            setPopupMessage(localStorage.getItem("message"));
            localStorage.removeItem("message");
            setIsSuccess(true);
            setPopupOpen(true);
        }
        shouldShowMessage.current = false;
    }, []);

    useEffect(() => {

    }, [selectedRoom]);

    useEffect(() => {
        if(!shouldLoad.current) return;
        houseService.getAll().then((houses) => {
            console.log(houses)
            setHouses(houses);
        }).catch((err) => {
            if(err.response.status == 401) {
                setPopupMessage(message_401);
                setIsSuccess(false);
                setPopupOpen(true);
            }
        });
        shouldLoad.current = false;
    }, []);

    useEffect(() => {
        if(houses.length == 0) return;
        let house;
        if(localStorage.getItem("house") != null && localStorage.getItem("house") != "undefined") {
            house = houses.find(house => house.id == +localStorage.getItem("house"));
            if(house == undefined) {
                house = houses[0];
            }
        }
        else {
            house = houses[0];
        }
        if(localStorage.getItem("room") != null && localStorage.getItem("room") != "undefined") {
            setSelectedRoom(house.rooms.find(room => room.id == +localStorage.getItem("room")))
        }
        else {
            setSelectedRoom(house.rooms[0]);
        }
    }, [houses]);


    const handleRoomSelectionChange = (room : Room) => {
        setSelectedRoom(room);
    }

    return (
        <>
            <CssVarsProvider
                defaultMode="dark">
            <Grid container width={'100%'}
                  id={'container'}
                  color={'white'}
                  alignContent={'flex-start'}
                  alignItems={'flex-start'}
                  sx={{background:'#0f171f'}}>
                <Grid sx = {{background: 'linear-gradient(90deg, hsla(248, 87%, 36%, 1) 0%,' +
                        ' hsla(191, 75%, 60%, 1) 50%, hsla(248, 87%, 36%, 1) 100%);'}}
                      width={'100%'}
                      p={1}
                      borderRadius={'0 0 0.75em 0.75em'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                    <Grid>
                        <img src={'src/assets/miz.png'} width={'50px'} height={'50px'} alt={'Logo'}/>
                    </Grid>
                </Grid>
                <Grid container  pt={4} pb={2} pl={2}>
                    <Grid container xs={12} sm={12} md={6} lg={4} xl={4} pl={2} rowSpacing={3} justifyContent={'center'}>
                            <HomeAndRoomConfig houses={houses}
                                               roomService={roomService}
                                               houseService={houseService}
                                               setSelectedRoomParent={handleRoomSelectionChange}/>
                        <Grid mt={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Scenes houses={houses} sceneService={sceneService} socket={socket} currentHouseScenes={selectedRoom?.scenes}/>
                        </Grid>
                    </Grid>
                    <Grid pl={8} pr={3} container xs={12} sm={12} md={6} lg={8} xl={8} mt={{
                        xs:7,
                        sm:7,
                        md:0,
                        lg:0,
                        xl:0
                    }} justifyContent={'center'} alignItems={'flex-start'}>
                        <LightsState lights={selectedRoom?.lights}
                                     lightService={lightService}
                                     houses={houses}
                                     socket={socket}
                                     currentRoom={selectedRoom}/>
                    </Grid>
                </Grid>
            </Grid>
            </CssVarsProvider>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}