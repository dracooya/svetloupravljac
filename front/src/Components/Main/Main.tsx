import {CssVarsProvider, Grid,} from "@mui/joy";
import {useState} from "react";
import {HomeAndRoomConfig} from "../HomeAndRoomConfig/HomeAndRoomConfig.tsx";
import {House} from "../../Models/House.ts";
import {QuickActions} from "../QuickActions/QuickActions.tsx";
import {QuickAction} from "../../Models/QuickAction.ts";
import {LightType} from "../../Models/Enums/LightType.ts";
import {SceneType} from "../../Models/Enums/SceneType.ts";


export function Main() {

    const [houses, setHouses] = useState<House[]>([
        {value:1, name: "Goober Home", rooms: [ {name: "Bedroom", value:1},{name: "Living Room", value:2}]},
        {value:2, name: "Gooberung Home", rooms: [ {name: "Bathroom", value:3},{name: "Storage", value:4}]}
    ]);

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
                        type: LightType.CANDLE
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
                        type: LightType.A27
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
            id: 1,
            name: 'PulsyBoi',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.CANDLE
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
                        type: LightType.A27
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
            id: 1,
            name: 'PulsyBoi',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.CANDLE
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
                        type: LightType.A27
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
            id: 1,
            name: 'PulsyBoi',
            lightsCustomColorConfig: [],
            lightsSceneConfig: [
                {
                    light: {
                        id: 1,
                        ip: "192.168.0.115",
                        name: "Gooby",
                        type: LightType.CANDLE
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
                        type: LightType.A27
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
                  height={'100%'}
                  color={'white'}
                  alignItems={'top'}
                  direction={'column'}
                  sx={{background:'#0f171f'}}>
                <Grid sx = {{background: 'linear-gradient(90deg, hsla(248, 87%, 36%, 1) 0%,' +
                        ' hsla(191, 75%, 60%, 1) 50%, hsla(248, 87%, 36%, 1) 100%);'}}
                      width={'100%'}
                      p={1}
                      borderRadius={'0 0 0.75em 0.75em'}
                      alignSelf={'top'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                    <Grid>
                        <img src={'src/assets/miz.png'} width={'50px'} height={'50px'} alt={'Logo'}/>
                    </Grid>
                </Grid>
                <Grid container direction={'row'} pt={4} pb={2} pl={2}>
                    <Grid container xs={12} sm={12} md={6} lg={4} xl={4} pl={2} rowSpacing={3} justifyContent={'center'}>
                        <Grid width={'100%'}>
                            <HomeAndRoomConfig houses={houses}/>
                        </Grid>
                        <Grid width={'100%'} mt={3}>
                            <QuickActions quickActions={quickActions}/>
                        </Grid>
                    </Grid>
                    <Grid pl={5}>
                    </Grid>
                </Grid>
            </Grid>
            </CssVarsProvider>
        </>
    );
}