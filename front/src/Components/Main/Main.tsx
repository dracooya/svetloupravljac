import {CssVarsProvider, Grid,} from "@mui/joy";
import {useState} from "react";
import {HomeAndRoomConfig} from "../HomeAndRoomConfig/HomeAndRoomConfig.tsx";
import {House} from "../../Models/House.ts";
import {Scenes} from "../Scenes/Scenes.tsx";
import {Scene} from "../../Models/Scene.ts";
import {LightType} from "../../Models/Enums/LightType.ts";
import {LightsState} from "../LightsState/LightsState.tsx";
import {Room} from "../../Models/Room.ts";


export function Main() {

    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const [houses, setHouses] = useState<House[]>([
        {id:1, name: "Goober Home", rooms: [ {name: "Bedroom", id:1,
            lights:[
                {
                    id: 1,
                    ip: "192.168.0.115",
                    name: "Gooby",
                    type: LightType.STRIP,
                    isOn: true
                },
                {
                    id: 3,
                    ip: "192.168.0.116",
                    name: "Scooby",
                    type: LightType.LAMP,
                    isOn: true
                }

            ]},{name: "Living Room", id:2, lights: [  {
                    id: 2,
                    ip: "192.168.0.116",
                    name: "Booby",
                    type: LightType.BULB,
                    isOn: true
                }]}]},
        {id:2, name: "Gooberung Home", rooms: [ {name: "Bathroom", id:3, lights:[]},{name: "Storage", id:4, lights:[]}]}
    ]);

    const handleRoomSelectionChange = (room : Room) => {
        setSelectedRoom(room);
    }


    const [scenes, setScenes] = useState<Scene[]>([

        {
            id: 1,
            name: 'PulsyBoi',
            lightsConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.BULB,
                    },
                    config: {
                        r: -1,
                        g: -1,
                        b: -1,
                        brightness: 100,
                        temperature: -1,
                        speed: -1,
                        mode: 6
                    }
                },
                {
                    light: {
                        id: 2,
                        ip: "192.168.0.115",
                        name: "Booby",
                        type: LightType.BULB
                    },
                    config: {
                        r: -1,
                        g: -1,
                        b: -1,
                        brightness: 100,
                        temperature: -1,
                        speed: -1,
                        mode: 6
                    }
                },
            ]
        },


    ])
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
                            <HomeAndRoomConfig houses={houses} setSelectedRoomParent={handleRoomSelectionChange}/>
                        <Grid mt={6} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Scenes scenes={scenes} houses={houses}/>
                        </Grid>
                    </Grid>
                    <Grid pl={8} pr={3} container xs={12} sm={12} md={6} lg={8} xl={8} mt={{
                        xs:7,
                        sm:7,
                        md:0,
                        lg:0,
                        xl:0
                    }} justifyContent={'center'} alignItems={'flex-start'}>
                        <LightsState lights={selectedRoom?.lights} houses={houses} currentRoom={selectedRoom}/>
                    </Grid>
                </Grid>
            </Grid>
            </CssVarsProvider>
        </>
    );
}