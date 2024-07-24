import {
    Avatar,
    Card,
    CardContent,
    Dropdown,
    Grid,
    IconButton,
    List,
    Menu,
    MenuButton,
    MenuItem,
    Switch,
    Typography
} from "@mui/joy";
import React, {useEffect, useRef, useState} from "react";
import "../Main/Main.css"
import {LightType} from "../../Models/Enums/LightType.ts";
import Icon from "@mdi/react";
import {mdiLampOutline, mdiLedStripVariant, mdiLightbulbOutline} from '@mdi/js';
import {NewLightDialog} from "../NewLightDialog/NewLightDialog.tsx";
import {House} from "../../Models/House.ts";
import {MoreVert} from "@mui/icons-material";
import {mdilDelete, mdilPencil} from "@mdi/light-js";
import {LightColorChangeDialog} from "../LightColorChangeDialog/LightColorChangeDialog.tsx";
import {DeletionConfirmationDialog} from "../DeletionConfirmationDialog/DeletionConfirmationDialog.tsx";
import {EditLightDialog} from "../EditLightDialog/EditLightDialog.tsx";
import {Room} from "../../Models/Room.ts";
import {ColorOrModeParams} from "../../Models/ColorOrModeParams.ts";
import {Light} from "../../Models/Light.ts";
import {LightService} from "../../Services/LightService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {Command} from "../../Models/DTOs/Command.ts";
import {LightState} from "../../Models/DTOs/LightState.ts";
import {Socket} from "socket.io-client";

interface LightsStateProps {
    lights: Light[] | undefined,
    houses: House[],
    currentRoom: Room | undefined,
    lightService: LightService
    socket: Socket
}

export function LightsState({lights, houses, currentRoom, lightService, socket}: LightsStateProps) {
    const [roomLightsOn, setRoomLightsOn] = React.useState<boolean>(false);
    const [lightsOn, setLightsOn] = useState<Map<string, boolean>>(new Map());
    const [openNewLightDialog, setOpenNewLightDialog] = useState<boolean>(false);
    const [openLightColorChangeDialog, setOpenLightColorChangeDialog] = useState<boolean>(false);
    const [selectedLight, setSelectedLight] = useState<Light>();
    const [selectedLightState, setSelectedLightState] = useState<LightState>();
    const [lightsWithStatus, setLightsWithStatus] = useState<LightState[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");

    const lightsOnRef = useRef<Map<string, boolean>>(lightsOn);
    const lightsWithStatusRef = useRef<LightState[]>(lightsWithStatus);

    const handlePopupClose = () => { setPopupOpen(false); }
    const message_401 = import.meta.env.VITE_401_MESSAGE;

    useEffect(() => {
        lightsOnRef.current = lightsOn;
    }, [lightsOn]);

    useEffect(() => {
        lightsWithStatusRef.current = lightsWithStatus;
    }, [lightsWithStatus]);

    useEffect(() => {
        setSelectedLightState(lightsWithStatus.find(light => light.light.ip === selectedLight?.ip));
    }, [selectedLight, lightsWithStatus]);

    useEffect(() => {
        setLightsWithStatus([]);
        setLightsOn(new Map());
        setRoomLightsOn(false);
        if (!lights) return;

        const handleStates = (data: any) => {
            data.states.forEach((state) => {
                const light = lights.find(light => light.ip === state.ip);
                if (light) {
                    const transformed_state: LightState = {
                        light: light,
                        isOn: state.isOn,
                        state: {
                            r: state.r,
                            g: state.g,
                            b: state.b,
                            brightness: state.brightness,
                            temperature: state.temperature,
                            mode: state.mode,
                            speed: state.speed
                        } as Command
                    };

                    setLightsWithStatus(prev => {
                        if(prev.length === 0)
                            return [transformed_state]
                        if(!prev.find(s => s.light.mac === light.mac)) {
                            prev.push(transformed_state)
                            return prev
                        }
                        else
                             return prev.map(s => s.light.mac === light.mac ? transformed_state : s);
                    });

                    setLightsOn(prevMap => {
                        const newMap = new Map(prevMap);
                        newMap.set(light.mac, state.isOn);
                        return newMap;
                    });
                }
            });
        };

        socket.on('states', handleStates);

        return () => {
            socket.off('states', handleStates);
        };
    }, [lights]);

    useEffect(() => {
        if (lightsOn.size === 0) return;
        setRoomLightsOn(Array.from(lightsOn.values()).every(value => value));
    }, [lightsOn]);

    const toggleLight = (mac: string, ip: string, turnOn: boolean) => {
        if (turnOn) { socket.emit('turn_on', ip); }
        else { socket.emit('turn_off', ip); }
        setLightsOn(prev => {
            const updated = new Map(prev);
            updated.set(mac, turnOn);
            return updated;
        });
    };

    const toggleAllLights = (turnOn: boolean) => {
        const ips = lights?.map(light => light.ip);
        if (turnOn) { socket.emit('turn_on_all', ips); }
        else { socket.emit('turn_off_all', ips); }
        setLightsOn(prev => {
            const updated = new Map(prev);
            updated.forEach((value, key) => {
                updated.set(key, turnOn);
            });
            return updated;
        });
    };

    const handleDeleteDialogClose = () => setOpenDeleteDialog(false);
    const handleEditDialogClose = () => setOpenEditDialog(false);

    useEffect(() => {
        if(lightsOn.size == 0) return;
        if(Array.from(lightsOn.values()).every(value => value)) {
            setRoomLightsOn(true);
        }
        else {
            setRoomLightsOn(false);
        }
    }, [lightsOn]);

    const handleColorChange = (config: ColorOrModeParams) => {
        const command : Command = {
            r: config.r,
            g: config.g,
            b: config.b,
            temperature: config.temperature,
            mode: config.mode,
            brightness: config.brightness,
            speed: config.speed,
            ip: selectedLight!.ip
        }
        socket.emit('command', JSON.stringify(command));
    }

    const deleteLight = () => {
        lightService.delete(selectedLight!.mac).then((msg) => {
            localStorage.setItem("message", msg);
            window.location.reload();
        }).catch((err) => {
            if(err.response.status == 401) setPopupMessage(message_401)
            else setPopupMessage(err.response.data);
            setIsSuccess(false);
            setPopupOpen(true);
        });
    }

    const handleLightDialogClose = () => {
        setOpenNewLightDialog(false);
    }

    const handleLightColorChangeDialogClose = () => {
        setOpenLightColorChangeDialog(false);
    }

    return (
        <>
            <Grid container xs={12} sm={12} lg={12} md={12} xl={12}  justifyContent={'center'}>
                <Grid pb={3}>
                    <Typography level={'h2'}>Lights</Typography>
                </Grid>
                <Grid  justifyContent={'center'} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid xs={12} sm={12} lg={12} md={12} xl={12} justifyContent={'center'}>
                            <Card variant="outlined">
                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                    <Grid xs={12} sm={12} md={8} lg={8} xl={8}>
                                        <CardContent>
                                            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'} alignItems={'center'}>
                                                <Grid pr={3}>
                                                    <Typography textColor="inherit" level={'h4'} >All Lights In The Room:</Typography>
                                                </Grid>
                                                <Grid alignItems={'center'} container>
                                                    <Switch
                                                        disabled={lights == undefined || lights?.length == 0}
                                                        sx={{
                                                            "--Switch-trackWidth": "55px"
                                                        }}
                                                        size={'lg'}
                                                        checked={roomLightsOn}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            toggleAllLights(event.target.checked);
                                                        }
                                                        }
                                                        color={roomLightsOn ? 'primary' : 'neutral'}
                                                        variant={roomLightsOn ? 'solid' : 'outlined'}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'} pt={4}>
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                            <List orientation="horizontal">
                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12}
                                      direction={'row'}
                                      alignContent={'flex-start'}
                                      sx={{height:'45vh', overflowX:'hidden', overflowY:'auto'}}
                                      columnSpacing={3} rowSpacing={2}>
                                    {lights?.map((light) => {
                                        return <Grid container xs={12} sm={12} md={12} lg={4} xl={4} key={light.name}>
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Card sx={{backgroundColor:'#0f171f', borderRadius:'2em', cursor: 'pointer'}}>
                                                            <Grid xs={12} sm={12} lg={12} md={12} xl={12} container alignItems={'center'}>
                                                                    <Grid xs={2} sm={2} md={2} lg={2} xl={2} onClick={() => {
                                                                        setSelectedLight(light);
                                                                        setOpenLightColorChangeDialog(true);}}>
                                                                        {light.type == LightType.BULB?
                                                                            <Icon path={mdiLightbulbOutline} size={1.5} /> :
                                                                            light.type == LightType.STRIP ? <Icon path={mdiLedStripVariant} size={1.5} /> :
                                                                                <Icon path={mdiLampOutline} size={1.5} />

                                                                        }
                                                                    </Grid>
                                                                <Grid pl={2} xs={6} sm={6} md={6} lg={6} xl={6} container alignItems={'center'} justifyContent={'flex-start'}>
                                                                    <Grid onClick={() => {
                                                                        setSelectedLight(light);
                                                                        setOpenLightColorChangeDialog(true);}}>
                                                                        {light.name}
                                                                    </Grid>
                                                                    </Grid>
                                                                    <Grid xs={2} sm={2} md={1} lg={2} xl={2} pr={3} container alignItems={'center'}>
                                                                        <Switch
                                                                            sx={{
                                                                            }}
                                                                            size={'lg'}
                                                                            checked={lightsOn.get(light.mac) == undefined ? false : lightsOn.get(light.mac)}
                                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                toggleLight(light.mac,light.ip,event.target.checked)
                                                                            }
                                                                            }
                                                                            color={!(lightsOn) || lightsOn.get(light.mac) ? 'primary' : 'neutral'}
                                                                            variant={!(lightsOn) || lightsOn.get(light.mac) ? 'solid' : 'outlined'}/>
                                                                    </Grid>
                                                                <Grid xs={2} sm={2} md={1} lg={2} xl={2} pl={{
                                                                    md:1,
                                                                    sm:2
                                                                }}>
                                                                    <Dropdown>
                                                                        <MenuButton
                                                                            slots={{ root: IconButton }}
                                                                            slotProps={{ root: { variant: 'plain', color: 'neutral', sx:{ ":hover" : {backgroundColor:'transparent'}} }}}
                                                                        >
                                                                            <MoreVert />
                                                                        </MenuButton>
                                                                        <Menu>
                                                                            <MenuItem
                                                                            onClick={() => {
                                                                                setSelectedLight(light);
                                                                                setOpenEditDialog(true);
                                                                            }}><Icon path={mdilPencil} size={1}/>Edit</MenuItem>
                                                                            <MenuItem
                                                                                onClick={() => {
                                                                                    setSelectedLight(light);
                                                                                    setDeleteMessage(" <b>Are you sure you want to remove " + light.name + "?</b>" +
                                                                                        " This will also remove it from scenes where it's included.");
                                                                                    setOpenDeleteDialog(true);
                                                                                }}><Icon path={mdilDelete} size={1}/>Delete</MenuItem>
                                                                        </Menu>
                                                                    </Dropdown>
                                                                </Grid>
                                                            </Grid>
                                                        </Card>
                                                    </Grid>
                                             </Grid>
                                    })}
                                </Grid>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'} mt={4}>
                    <Grid justifyContent={'center'} direction={'row'} container alignItems={'center'}>
                        <Grid sx={{display:'flex', justifyContent:'center'}}>
                            <Avatar sx={{border:'2px solid white', backgroundColor:'transparent'}} className={houses.length == 0 ? 'disabled' : 'clickable'}
                                    size="lg" src="src/assets/icons/plus.png"
                                    onClick={() => {
                                        if(houses.length == 0) return;
                                        setOpenNewLightDialog(true)}}/>
                        </Grid>
                        <Grid sx={{display:'flex', justifyContent:'center'}} pl={2}>
                            <Typography sx={{fontFamily:'Inter !important'}}>Add New Light</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <NewLightDialog open={openNewLightDialog}
                            lightService={lightService}
                            houses={houses}
                            closeModalCallback={handleLightDialogClose}/>
            <LightColorChangeDialog open={openLightColorChangeDialog}
                                    light={selectedLight}
                                    lightState={selectedLightState}
                                    valueChangeCallback={handleColorChange}
                                    closeModalCallback={handleLightColorChangeDialogClose}/>
            <DeletionConfirmationDialog open={openDeleteDialog}
                                        closeModalCallback={handleDeleteDialogClose}
                                        message={deleteMessage} deleteConfirmedCallback={deleteLight}/>
            <EditLightDialog open={openEditDialog}
                             lightService={lightService}
                             closeModalCallback={handleEditDialogClose}
                             currentRoom={currentRoom}
                             selectedLight={selectedLight}
                             houses={houses}/>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}