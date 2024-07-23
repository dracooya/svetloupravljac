// noinspection TypeScriptValidateTypes

import {
    Avatar,
    Button, Card, Checkbox,
    DialogContent,
    FormControl,
    FormHelperText,
    Grid, IconButton,
    Input,
    Modal,
    ModalClose,
    ModalDialog, Option, Select, selectClasses, Step, StepIndicator, Stepper, SvgIcon,
    Typography
} from "@mui/joy";
import {InfoOutlined, KeyboardArrowDown} from "@mui/icons-material";
import Icon from "@mdi/react";
import {Transition} from "react-transition-group";
import { useLocalStorage } from "@uidotdev/usehooks";
import {House} from "../../Models/House.ts";
import {useForm} from "react-hook-form";
import {mdiLampOutline, mdiLedStripVariant, mdiLightbulbOutline, mdiMoviePlayOutline, mdiPalette} from "@mdi/js";
import React, {useEffect, useState} from "react";
import {LightType} from "../../Models/Enums/LightType.ts";
import {Room} from "../../Models/Room.ts";
import {ColorOrModeParams} from "../../Models/ColorOrModeParams.ts";
import {LightColorChangeDialog} from "../LightColorChangeDialog/LightColorChangeDialog.tsx";
import {availableModes} from "../Utils/AvailableModes.ts";
import {Scene} from "../../Models/Scene.ts";
import {kelvinToRgb} from "../Utils/KelvinsToRgbConversionTable.ts";
import {Light} from "../../Models/Light.ts";
import {LightState} from "../../Models/DTOs/LightState.ts";
import {SceneService} from "../../Services/SceneService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {LightColorConfigBasic} from "../../Models/DTOs/LightColorConfigBasic.ts";

interface NewSceneDialogProps {
    open: boolean,
    closeModalCallback: () => void,
    houses: House[],
    isModification: boolean,
    selectedScene: Scene | undefined,
    sceneService: SceneService
}

interface SceneForm {
    name: string,
    room: number
}

interface LightIncluded {
    light: Light,
    included: boolean,
    mode: ColorOrModeParams | undefined,
}

export function NewSceneDialog({open, closeModalCallback, houses, isModification, selectedScene, sceneService}: NewSceneDialogProps) {
    const {register, handleSubmit, setValue,trigger, getValues, formState: {errors}} = useForm<SceneForm>({
        defaultValues: {
            name: "",
            room: houses[0]?.rooms[0]?.id
        },
        mode: "onChange"
    });

    const [selectedRoomStorage] = useLocalStorage("room", localStorage.getItem("room"));
    const [selectedRoom, setSelectedRoom] = useState<Room>();
    const [includedLights, setIncludedLights] = useState<LightIncluded[]>([]);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [openLightColorChangeDialog, setOpenLightColorChangeDialog] = useState<boolean>(false);
    const [selectedLight, setSelectedLight] = useState<LightIncluded>();
    const [selectedLightTransformed, setSelectedLightTransformed] = useState<LightState>();
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const handlePopupClose = () => {
        if(localStorage.getItem("message") != null) localStorage.removeItem("message");
        setPopupOpen(false); }
    const message_401 = import.meta.env.VITE_401_MESSAGE
    const handleLightColorChangeDialogClose = () => setOpenLightColorChangeDialog(false);

    useEffect(() => {
        if(houses.length == 0) return;
        if(localStorage.getItem("room") != "null" && localStorage.getItem("room") != "undefined") {
            setSelectedRoom(houses.flatMap(house => house.rooms).find(room => room.id === +localStorage.getItem("room")))
            setValue("room",+localStorage.getItem("room"));
        }
        else {
            setSelectedRoom(houses[0]?.rooms[0]);
            setValue("room", houses[0]?.rooms[0].id);
        }
    }, [selectedRoomStorage, houses]);



    useEffect(() => {
        if(selectedLight == undefined) return;
        if(isModification) {
            setSelectedLightTransformed({
                light: selectedLight!.light,
                isOn: false,
                state: {
                    ip: selectedLight!.light.ip,
                    r: selectedLight!.mode!.r,
                    g: selectedLight!.mode!.g,
                    b: selectedLight!.mode!.b,
                    brightness: selectedLight!.mode!.brightness,
                    temperature: selectedLight!.mode!.temperature,
                    speed: selectedLight!.mode!.speed,
                    mode: selectedLight!.mode!.mode
                }
            });
        }
        else {
            setSelectedLightTransformed({
                light: selectedLight!.light,
                isOn: false,
                state: {
                    ip: selectedLight!.light.ip,
                    r: -1,
                    g: -1,
                    b: -1,
                    brightness: 255,
                    temperature: selectedLight!.light.minKelvin,
                    speed: -1,
                    mode: -1
                }
            });
        }
    }, [selectedLight]);
    const handleColorChangeCallback = (change: ColorOrModeParams) => {
        if(selectedLight?.mode == undefined) selectedLight.mode = change;
        else {
            if (change.mode != -1) {
                if(selectedLight!.mode!.mode == -1) {
                    selectedLight!.mode!.speed = 95;
                    selectedLight!.mode!.brightness = 255;
                }
                selectedLight!.mode!.r = -1;
                selectedLight!.mode!.g = -1;
                selectedLight!.mode!.b = -1;
                selectedLight!.mode!.mode = change.mode;
                selectedLight!.mode!.temperature = -1;
            }
            if (change.brightness != -1) selectedLight!.mode!.brightness = change.brightness;
            if (change.speed != -1) selectedLight!.mode!.speed = change.speed;

            if (change.r != -1 && change.g != -1 && change.b != -1) {
                selectedLight!.mode!.r = change.r;
                selectedLight!.mode!.g = change.g;
                selectedLight!.mode!.b = change.b;
                selectedLight!.mode!.temperature = -1;
                selectedLight!.mode!.speed = -1;
                selectedLight!.mode!.mode = -1;
            }
            if (change.temperature != -1) {
                selectedLight!.mode!.temperature = change.temperature;
                selectedLight!.mode!.r = -1;
                selectedLight!.mode!.g = -1;
                selectedLight!.mode!.b = -1;
                selectedLight!.mode!.speed = -1;
                selectedLight!.mode!.mode = -1;
            }

        }
        setSelectedLight(selectedLight);
        const update = includedLights.map(lightOld =>
            lightOld.light.mac == selectedLight?.light.mac ? { ...lightOld, mode: selectedLight.mode } : lightOld);
        setIncludedLights(update);
    }

    const handleRoomChange = (_: React.SyntheticEvent | null, selectedRoomId: number | null) => {
        // noinspection TypeScriptValidateTypes
        setValue("room", selectedRoomId!);
        const room = houses.flatMap(house => house.rooms).find(room => room.id === selectedRoomId)
        setSelectedRoom(room);

    };



    const addScene = () => {
        let lightsConfig : LightColorConfigBasic[] = [];
        if(isModification) {
            if(!includedLights.some(light => light.included)) {
                setPopupMessage("Scene has to have included lights!");
                setIsSuccess(false);
                setPopupOpen(true);
                return;
            }
            includedLights.forEach((light) => {
                if (light.included)
                    lightsConfig.push({light_mac: light.light.mac, config: light.mode!})

            });
            sceneService.edit({id: selectedScene!.id, modifications: {name: getValues("name"), config: lightsConfig}}).then((msg) => {
                localStorage.setItem("message", msg);
                window.location.reload();
            }).catch((err) => {
                if (err.response.status == 401) setPopupMessage(message_401)
                else setPopupMessage(err.response.data);
                setIsSuccess(false);
                setPopupOpen(true);
            });
        }
        else {
            if(!includedLights.some(light => light.mode != undefined)) {
                setPopupMessage("Scene has to have at least one light that is not off!");
                setIsSuccess(false);
                setPopupOpen(true);
                return;
            }
            includedLights.forEach((light) => {
                if (light.mode != undefined)
                    lightsConfig.push({light_mac: light.light.mac, config: light.mode})
            });
            sceneService.add({name: getValues("name"), config: lightsConfig}).then((msg) => {
                localStorage.setItem("message", msg);
                window.location.reload();
            }).catch((err) => {
                if (err.response.status == 401) setPopupMessage(message_401)
                else setPopupMessage(err.response.data);
                setIsSuccess(false);
                setPopupOpen(true);
            });
        }
    }

    useEffect(() => {
        setIncludedLights(selectedRoom?.lights.map((light) => {return {light: light, included: true, mode: undefined}}));
    }, [selectedRoom]);

    useEffect(() => {
        const name = isModification? selectedScene?.name : "";
        // noinspection TypeScriptValidateTypes
        setValue("name", name);
        if(isModification) {
            const includedLights = selectedScene?.lightsConfig.map(
                (config) => {
                    return {light: config.light, included: true, mode: config.config}
                });
            setIncludedLights(includedLights);
        }
        else {
            setIncludedLights(selectedRoom?.lights.map((light) => {return {light: light, included: true, mode: undefined}}));
        }
    }, [isModification]);

    const onSubmit = (_ : SceneForm) => {
        setActiveStep(1);
    };

    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => {
                            setActiveStep(0);
                            closeModalCallback();}}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}>
                        <ModalDialog
                            sx={{
                                backgroundColor:'#0f171f',
                                width: {
                                    xs:'90vw',
                                    sm:'90vw',
                                    md:'70vw',
                                    lg:'60vw',
                                    xl:'40vw'
                                },
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}>
                            <ModalClose variant="plain"  />
                            <DialogContent>
                                <Grid height={'75vh'} container xs={12} sm={12} md={12} lg={12} xl={12}
                                      alignContent={'flex-start'}
                                      justifyContent={'center'} pb={2}>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'} pb={5}>
                                        <Typography level={'h1'}>{isModification? "Edit Scene" : "Add New Scene"}</Typography>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} pb={6}>
                                        <Stepper>
                                            <Step
                                                onClick={() => setActiveStep(0)}
                                                indicator={
                                                    <StepIndicator variant="soft" color="primary" className={'clickable'}>
                                                        1
                                                    </StepIndicator>
                                                }>Basic Info</Step>
                                            <Step
                                                onClick={() => {
                                                    trigger(["name","room"]).then((valid) => {
                                                        if(valid) setActiveStep(1);
                                                    })
                                                }}
                                                indicator={
                                                    <StepIndicator variant="soft" color="primary" className={'clickable'}>
                                                        2
                                                    </StepIndicator>
                                                }>Lights Setup</Step>
                                        </Stepper>
                                    </Grid>
                                    {activeStep == 0 ?
                                    <Grid container xs={12} sm={12} md={8} lg={8} xl={8} justifyContent={'center'} pt={4}>
                                        <Grid pb={3} xs={12} sm={12} md={12} lg={12} xl={12} container>
                                            <Grid xs={1} sm={1} md={1} lg={1} xl={1} pt={1}>
                                                <Icon path={mdiMoviePlayOutline} size={1.3} color={'white'}/>
                                            </Grid>
                                            <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}>
                                                <FormControl error={!!errors.name}>
                                                    <Input placeholder="Scene Name"
                                                           type={'text'}
                                                           sx={{
                                                               backgroundColor:'transparent'
                                                           }}
                                                           variant="outlined"
                                                           size="lg"
                                                           {...register("name",
                                                               {
                                                                   required: "Scene name is a required field!",
                                                               })}
                                                    />
                                                    <FormHelperText>
                                                        <InfoOutlined />
                                                        {errors.name? errors.name?.message : "Required"}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        {isModification? null :
                                            <Grid pb={3} xs={12} sm={12} md={12} lg={12} xl={12} container alignItems={'center'}>
                                                <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                    <SvgIcon color={'warning'} fill="white" sx={{paddingLeft:'0.15em', paddingTop:'0.3em'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M34.06,1H1.94A.94.94,0,0,0,1,1.94V34.06a.94.94,0,0,0,.94.94H34.06a.94.94,0,0,0,.94-.94V1.94A.94.94,0,0,0,34.06,1ZM18.94,33.11V30.28a.94.94,0,1,0-1.88,0v2.83H2.89V24.58l8.49,0h0a.95.95,0,0,0,0-1.89l-8.5,0V2.89H11.3l.09,9.45a1,1,0,0,0,.94.94h0a1,1,0,0,0,.94-1l-.09-9.43H33.11v8.5H18a.94.94,0,0,0-.94.94V23.67a.94.94,0,0,0,1.88,0V13.28H33.11V33.11Z"/></svg>
                                                    </SvgIcon>
                                                </Grid>
                                                <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}>
                                                    <Select
                                                        slotProps={{
                                                            listbox: {
                                                                sx: {
                                                                    backgroundColor:'#0f171f',
                                                                    padding:'0'
                                                                },
                                                            },
                                                        }}
                                                        sx={{
                                                            padding:'0.75em 1em',
                                                            width:'100%',
                                                            backgroundColor:'transparent',
                                                            ":hover": {
                                                                backgroundColor: 'transparent',
                                                            },
                                                            [`& .${selectClasses.indicator}`]: {
                                                                transition: '0.2s',
                                                                [`&.${selectClasses.expanded}`]: {
                                                                    transform: 'rotate(-180deg)',
                                                                },
                                                            },
                                                        }}
                                                        variant={'outlined'}
                                                        value={selectedRoom?.id}
                                                        onChange={handleRoomChange}
                                                        indicator={<KeyboardArrowDown />}>
                                                        {houses.flatMap(house =>  house.rooms.map(room => {
                                                                return <Option value={room.id} key={room.id}>{house.name} - {room.name}</Option>
                                                            })
                                                        )}
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        }
                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} pt={6}
                                              container justifyContent={'center'}>
                                            <Button onClick={handleSubmit(onSubmit)} variant={'outlined'} size={'lg'}>Next</Button>
                                        </Grid>
                                    </Grid> :
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} container>
                                            <Grid height={'40vh'} xs={12} sm={12} md={12} lg={12} xl={12}
                                                  alignContent={'flex-start'}
                                                  sx={{overflowY:'auto'}} container pl={3} pr={3} rowGap={2} justifyContent={'center'}>
                                                    {includedLights.map((light) => {
                                                        return <Grid container xs={12} sm={12} md={9} lg={9} xl={9}
                                                                     key={light.light.name}>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                <Card sx={{
                                                                    backgroundColor: '#0f171f',
                                                                    borderRadius: '2em',
                                                                }}>
                                                                    <Grid xs={12} sm={12} lg={12} md={12} xl={12} container
                                                                          alignItems={'center'}>
                                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                                            {light.light.type == LightType.BULB ?
                                                                                <Icon path={mdiLightbulbOutline} size={1.5}/> :
                                                                                light.light.type == LightType.STRIP ?
                                                                                    <Icon path={mdiLedStripVariant} size={1.5}/> :
                                                                                    <Icon path={mdiLampOutline} size={1.5}/>
                                                                            }
                                                                        </Grid>
                                                                        <Grid pl={3} xs={6} sm={6} md={6} lg={6} xl={6} container
                                                                              alignItems={'center'} justifyContent={'flex-start'}>
                                                                            <Grid>
                                                                                {light.light.name}
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                                                                            { light.mode == undefined ||
                                                                                (light.mode.r == -1 && light.mode.temperature == -1 && light.mode.mode == -1) ? <Grid>Off</Grid> :
                                                                            light.mode?.mode !== -1 ?
                                                                            <Avatar size={'sm'}  src={"src/assets/icons/modes/" + availableModes.find(mode => mode.id === light.mode?.mode)?.name + ".png"}></Avatar>
                                                                         :
                                                                                light.mode.temperature !== -1 ?
                                                                                <Grid width={'25px'} height={'25px'}
                                                                                borderRadius={'50%'}
                                                                                container bgcolor={`rgb(${kelvinToRgb[light.mode.temperature].r}, ${kelvinToRgb[light.mode.temperature].g}, ${kelvinToRgb[light.mode.temperature].b})`} color={'transparent'}>_</Grid> :
                                                                                <Grid width={'25px'} height={'25px'}
                                                                                      borderRadius={'50%'}
                                                                                      container bgcolor={`rgb(${light.mode?.r}, ${light.mode?.g}, ${light.mode?.b})`} color={'transparent'}>_</Grid>
                                                                            }
                                                                        </Grid>
                                                                        <Grid xs={3} sm={3} md={3} lg={2} xl={3} alignItems={'center'} container pl={{
                                                                            md: 2,
                                                                            sm: 2,
                                                                        }}>
                                                                            {isModification?
                                                                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} container justifyContent={'center'} alignItems={'center'}>
                                                                                <Checkbox
                                                                                          onChange={(event) => {
                                                                                              const update = includedLights.map(lightOld =>
                                                                                                  lightOld === light? { ...lightOld, included: event.target.checked } : lightOld);
                                                                                              setIncludedLights(update);
                                                                                          }}
                                                                                          variant="solid"
                                                                                          checked={light.included} />
                                                                            </Grid>
                                                                            : null }
                                                                            <Grid xs={6} sm={6} md={6} lg={6} xl={6} container alignItems={'center'}>
                                                                                <IconButton onClick={() => {
                                                                                    setSelectedLight(light);
                                                                                    setOpenLightColorChangeDialog(true);
                                                                                }}><Icon path={mdiPalette}/></IconButton>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Card>
                                                            </Grid>
                                                        </Grid>
                                                    })}
                                            </Grid>

                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} pt={3} container justifyContent={'center'}>
                                            <Button variant={'outlined'} size={'lg'} onClick={addScene}>{isModification? 'Edit Scene' : 'Add Scene'}</Button>
                                        </Grid>

                                    </Grid>
                                    }
                                </Grid>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            <LightColorChangeDialog open={openLightColorChangeDialog}
                                    valueChangeCallback={handleColorChangeCallback}
                                    closeModalCallback={handleLightColorChangeDialogClose}
                                    lightState={selectedLightTransformed}/>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}