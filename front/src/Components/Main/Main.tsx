import {CssVarsProvider, Grid,} from "@mui/joy";
import {useState} from "react";
import {HomeAndRoomConfig} from "../HomeAndRoomConfig/HomeAndRoomConfig.tsx";
import {House} from "../../Models/House.ts";
import {QuickActions} from "../QuickActions/QuickActions.tsx";
import {QuickAction} from "../../Models/QuickAction.ts";
import {LightType} from "../../Models/Enums/LightType.ts";
import {SceneType} from "../../Models/Enums/SceneType.ts";
import {LightsState} from "../LightsState/LightsState.tsx";
import {Room} from "../../Models/Room.ts";


export function Main() {

    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const [houses, setHouses] = useState<House[]>([
        {value:1, name: "Goober Home", rooms: [ {name: "Bedroom", value:1,
            lights:[
                {
                    id: 1,
                    ip: "192.168.0.115",
                    name: "Gooby",
                    type: LightType.STRIP,
                    isOn: true
                },
                {
                    id: 2,
                    ip: "192.168.0.116",
                    name: "Booby",
                    type: LightType.BULB,
                    isOn: true
                },
                {
                    id: 3,
                    ip: "192.168.0.116",
                    name: "Scooby",
                    type: LightType.LAMP,
                    isOn: true
                },

            ]},{name: "Living Room", value:2, lights: []}]},
        {value:2, name: "Gooberung Home", rooms: [ {name: "Bathroom", value:3, lights:[]},{name: "Storage", value:4, lights:[]}]}
    ]);

    const handleRoomSelectionChange = (room : Room) => {
        setSelectedRoom(room);
    }


    const [quickActions, setQuickActions] = useState<QuickAction[]>([
        {
            id: 1,
            name: 'PulsyBoi',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.BULB
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                },
                {
                    light: {
                        id: 2,
                        ip: "192.168.0.116",
                        name: "Booby",
                        type: LightType.LAMP
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                }
            ]
        }, {
            id: 2,
            name: 'PulsyBoi2',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.BULB
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                },
                {
                    light: {
                        id: 2,
                        ip: "192.168.0.116",
                        name: "Booby",
                        type: LightType.STRIP
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                }
            ]
        },
        {
            id: 3,
            name: 'PulsyBoi3',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.LAMP
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                },
                {
                    light: {
                        id: 2,
                        ip: "192.168.0.116",
                        name: "Booby",
                        type: LightType.BULB
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                }
            ]
        },
        {
            id: 4,
            name: 'PulsyBoi4',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.BULB
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                },
                {
                    light: {
                        id: 2,
                        ip: "192.168.0.116",
                        name: "Booby",
                        type: LightType.BULB
                    },
                    scene: {
                        id: 1,
                        name: "Pulse",
                        speed: 100,
                        dimming: 100,
                        type: SceneType.PREDEFINED
                    }
                }
            ]
        }
    ]);
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
                        <Grid mt={6}>
                            <QuickActions quickActions={quickActions}/>
                        </Grid>
                    </Grid>
                    <Grid pl={8} pr={3} container xs={12} sm={12} md={6} lg={8} xl={8} mt={{
                        xs:7,
                        sm:7,
                        md:0,
                        lg:0,
                        xl:0
                    }} justifyContent={'center'} alignItems={'flex-start'}>
                        <LightsState lights={selectedRoom?.lights}/>
                    </Grid>
                </Grid>
            </Grid>
            </CssVarsProvider>
        </>
    );
}