// noinspection TypeScriptValidateTypes

import "../Main/Main.css";
import {Transition} from "react-transition-group";
import {
    Badge,
    Button,
    CircularProgress,
    DialogContent,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Option,
    Select,
    selectClasses,
    SvgIcon,
    Typography
} from "@mui/joy";
import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLampOutline, mdiLedStripVariant, mdiLightbulbOutline, mdiReload} from "@mdi/js";
import {mdilCheck, mdilHelp, mdilHelpCircle, mdilLightbulb} from "@mdi/light-js/mdil";
import {InfoOutlined, KeyboardArrowDown} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {LightType} from "../../Models/Enums/LightType.ts";
import {House} from "../../Models/House.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {Light} from "../../Models/Light.ts";
import {LightService} from "../../Services/LightService.ts";
import {NewLights} from "../../Models/DTOs/NewLights.ts";
import {NewLight} from "../../Models/DTOs/NewLight.ts";
import {useLocalStorage} from "@uidotdev/usehooks";

interface NewLightDialogProps {
    open: boolean,
    closeModalCallback: () => void,
    houses: House[],
    lightService: LightService
}

interface NewLightSetup {
    ip: string,
    mac: string,
    name: string,
    roomId: number,
    type: LightType,
    brightnessChange: boolean,
    colorChange: boolean,
    temperatureChange: boolean,
    minKelvin: number,
    maxKelvin: number,
    isSetup: boolean
}

interface LightForm {
    name: string,
    room: number,
    type: LightType
}

export function NewLightDialog({open, houses, closeModalCallback, lightService} : NewLightDialogProps) {

    const [selectedRoomStorage] = useLocalStorage("room", localStorage.getItem("room"));
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [hasFoundLights, setHasFoundLights] = useState<boolean>(false);
    const [setupLights, setSetupLights] = useState<NewLightSetup[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<number>();
    const [selectedType, setSelectedType] = useState<LightType>(LightType.BULB);
    const [selectedLight, setSelectedLight] = useState<Light>();
    const [isModification, setIsModification] = useState<boolean>(false);
    const [foundLights, setFoundLights] = useState<NewLightSetup[]>([]);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const message_401 = import.meta.env.VITE_401_MESSAGE;

    useEffect(() => {
        setSelectedRoomId(+localStorage.getItem("room"));
    }, [selectedRoomStorage]);

    const fetchLights = async () => {
        setIsSearching(true);
        const lights = await lightService.discover();
        setIsSearching(false);
        if (lights.length !== 0) {
            const transformedLights : NewLightSetup[] = lights.map(light => ({
                ip: light.ip,
                mac: light.mac,
                name: light.name,
                roomId: selectedRoomId,
                brightnessChange: light.brightnessChange,
                colorChange: light.colorChange,
                temperatureChange: light.temperatureChange,
                minKelvin: light.minKelvin,
                maxKelvin: light.maxKelvin,
                type: light.type,
                isSetup: false,
            }));
            setFoundLights(transformedLights);
            setHasFoundLights(true);
        }
    };

    useEffect(() => {
        if (!open) return;
        fetchLights();
    }, [open]);


    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm<LightForm>({
        defaultValues: {
            name: "",
            room: houses[0]?.rooms[0].id,
            type: LightType.BULB,
        },
        mode: "onChange"
    });
    const onSubmit = (data : LightForm) => {
        if(selectedLight == undefined) {
            setPopupMessage("Please select a light!");
            setIsSuccess(false);
            setPopupOpen(true);
            return;
        }
        const setupLight : NewLightSetup = {
            ip: selectedLight?.ip,
            mac: selectedLight?.mac,
            name: data.name,
            roomId: selectedRoomId,
            brightnessChange: selectedLight?.brightnessChange,
            colorChange: selectedLight?.colorChange,
            temperatureChange: selectedLight?.temperatureChange,
            minKelvin: selectedLight?.minKelvin,
            maxKelvin: selectedLight?.maxKelvin,
            type: data.type,
            isSetup: true
        }

        setFoundLights(foundLights.map(light => light.mac === selectedLight?.mac ? setupLight : light));
        if(isModification) setSetupLights(setupLights.map(light => light.mac === selectedLight?.mac ? setupLight : light));
        else setSetupLights(prevList => [...prevList, setupLight])
        reset();
    };

    const handleTypeChange = (_: React.SyntheticEvent | null, type: LightType | null) => {
        setSelectedType(type);
        setValue("type", type!);
    };

    const handleRoomChange = (_: React.SyntheticEvent | null, selectedRoomId: number | null) => {
        setSelectedRoomId(selectedRoomId);
        setValue("room", selectedRoomId);
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    }

    const handleSelectedLightChange = (selectedLight : NewLightSetup) => {
        setSelectedLight(selectedLight);
        if(selectedLight.isSetup) {
            setIsModification(true);
            setValue("name", selectedLight.name);
            setValue("room", selectedLight.roomId);
            setValue("type", selectedLight.type);
            setSelectedType(selectedLight.type);
            setSelectedRoomId(selectedLight.roomId);
        }
        else {
            setIsModification(false);
        }
    }

    const finishAll = () => {
        if(setupLights.length != 0) {
            const transformedLights : NewLight[] = setupLights.map(light => ({
                ip: light.ip,
                mac: light.mac,
                name: light.name,
                roomId: light.roomId,
                brightnessChange: light.brightnessChange,
                colorChange: light.colorChange,
                temperatureChange: light.temperatureChange,
                minKelvin: light.minKelvin,
                maxKelvin: light.maxKelvin,
                type: light.type,
            }));
            const newLights : NewLights = {
                lights: transformedLights
            }
            console.log(transformedLights)
            lightService.add(newLights).then((msg) => {
                localStorage.setItem("message", msg);
                window.location.reload();
            }).catch((err) => {
                if(err.response.status == 401) setPopupMessage(message_401)
                setPopupMessage(err.response.data);
                setIsSuccess(false);
                setPopupOpen(true);
            })
        }
        else {
            closeModalCallback();
        }
    }

    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => {
                            if(isSearching) return;
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
                                    xs:'50vw',
                                    sm:'70vw',
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
                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'} pb={2} height={'90vh'} >
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'} container justifyContent={'center'}>
                                        <Grid pr={4}>
                                            <Typography level={'h1'}>Add New Light</Typography>
                                        </Grid>
                                        <Grid pt={{
                                            xs:2,
                                            sm:0
                                        }}>
                                            {hasFoundLights?
                                            <Button variant={'soft'} size={'lg'} onClick={finishAll}>Finish All</Button>
                                                : null}
                                        </Grid>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                        {isSearching ?
                                            <Grid>
                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'} pb={5}>
                                                    <CircularProgress size="lg"/>
                                                </Grid>
                                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'}>
                                                    <Typography level={'h3'}>Searching For Lights...</Typography>
                                                </Grid>
                                            </Grid>
                                            : hasFoundLights?
                                                <Grid pt={5} xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                        <Typography mb={2} level={'h3'}>Found {foundLights.length} lights</Typography>
                                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} container sx={{overflowY:'scroll', height:'25vh'}}>
                                                            {foundLights.map((light) => {
                                                                return <Grid xs={4} sm={4} md={3} lg={3} xl={3} pb={1} key={light.mac} container height={'fit-content'} border={selectedLight == light ? '1px solid #12467b' : 'none'} sx={{borderRadius:'1em'}}>
                                                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} mt={2} container justifyContent={'center'}>
                                                                                <Badge badgeContent={light.isSetup? '✓' : ''}  color={light.isSetup? "success" : "primary"} sx={{ height:'100%'}} onClick={() => handleSelectedLightChange(light)}>
                                                                                    {light.isSetup ? light.type == LightType.BULB?
                                                                                                <Icon path={mdiLightbulbOutline} size={2.5} className={'clickable'}/> :
                                                                                                light.type == LightType.STRIP ? <Icon path={mdiLedStripVariant} size={2.5} className={'clickable'}/> :
                                                                                                    <Icon path={mdiLampOutline} size={2.5} className={'clickable'}/>
                                                                                        :
                                                                                    <Icon path={mdilHelpCircle} size={2.5} className={'clickable'}/>
                                                                                    }
                                                                            </Badge>
                                                                        </Grid>
                                                                        <Grid pt={1} xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                                                {light.isSetup? light.name : light.mac.substring(0,7).concat('...')}
                                                                                <Badge badgeContent={'?'}
                                                                                       className={'pointer'}
                                                                                       sx={{
                                                                                           paddingLeft:'1em'
                                                                                       }}
                                                                                       anchorOrigin={{
                                                                                           vertical: 'top',
                                                                                           horizontal: 'right',
                                                                                       }}
                                                                                       color={"warning"}
                                                                                       onClick={() => lightService.ping(light.ip)}>
                                                                                </Badge>
                                                                        </Grid>
                                                                </Grid>
                                                            })}
                                                        </Grid>
                                                        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'}>
                                                            <Grid xs={12} sm={12} md={8} lg={8} xl={8} container alignItems={'center'}>
                                                                <Grid xs={1} sm={1} md={1} lg={1} xl={1} sx={{paddingBottom:'1em'}}>
                                                                    <Icon path={mdilLightbulb} size={1.5} color={'white'}/>
                                                                </Grid>
                                                                <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}
                                                                      pr={{
                                                                          xl:0,
                                                                          lg:0,
                                                                          md:0,
                                                                          sm:2,
                                                                          xs:2
                                                                      }}>
                                                                    <FormControl error={!!errors.name}>
                                                                        <Input placeholder="Light Name"
                                                                               type={'text'}
                                                                               sx={{
                                                                                   backgroundColor:'transparent'
                                                                               }}
                                                                               variant="outlined"
                                                                               size="lg"
                                                                               {...register("name",
                                                                                   {
                                                                                       required: "Light name is a required field!",
                                                                                   })}
                                                                        />
                                                                        <FormHelperText>
                                                                            <InfoOutlined />
                                                                            {errors.name? errors.name?.message : "Required"}
                                                                        </FormHelperText>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid xs={12} sm={12} md={8} lg={8} xl={8} container alignItems={'center'} pt={2}>
                                                                    <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                                        <SvgIcon color={'warning'} fill="white" sx={{ paddingTop:'0.2em'}}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M34.06,1H1.94A.94.94,0,0,0,1,1.94V34.06a.94.94,0,0,0,.94.94H34.06a.94.94,0,0,0,.94-.94V1.94A.94.94,0,0,0,34.06,1ZM18.94,33.11V30.28a.94.94,0,1,0-1.88,0v2.83H2.89V24.58l8.49,0h0a.95.95,0,0,0,0-1.89l-8.5,0V2.89H11.3l.09,9.45a1,1,0,0,0,.94.94h0a1,1,0,0,0,.94-1l-.09-9.43H33.11v8.5H18a.94.94,0,0,0-.94.94V23.67a.94.94,0,0,0,1.88,0V13.28H33.11V33.11Z"/></svg>
                                                                        </SvgIcon>
                                                                    </Grid>
                                                                    <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}>
                                                                        <Select
                                                                            slotProps={{
                                                                                listbox: {
                                                                                    sx: {
                                                                                        backgroundColor:"#0f171f",
                                                                                        padding:'0'
                                                                                    },
                                                                                },
                                                                            }}
                                                                            sx={{
                                                                                padding:'0.75em 1em',
                                                                                backgroundColor:"#0f171f",
                                                                                ":hover": {
                                                                                    backgroundColor: "#0f171f",
                                                                                },
                                                                                [`& .${selectClasses.indicator}`]: {
                                                                                    transition: '0.2s',
                                                                                    [`&.${selectClasses.expanded}`]: {
                                                                                        transform: 'rotate(-180deg)',
                                                                                    },
                                                                                },
                                                                            }}
                                                                            variant={'outlined'}
                                                                            onChange={handleRoomChange}
                                                                            value={selectedRoomId}
                                                                            indicator={<KeyboardArrowDown />}>
                                                                            {houses.flatMap(house =>  house.rooms.map(room => {
                                                                                    return <Option value={room.id} key={room.id}>{house.name} - {room.name}</Option>
                                                                                })
                                                                            )}
                                                                        </Select>
                                                                    </Grid>
                                                            </Grid>
                                                            <Grid xs={12} sm={12} md={8} lg={8} xl={8} pt={4} container alignItems={'center'}>
                                                                <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                                    <Icon path={mdilHelp} size={1.5} color={'white'}/>
                                                                </Grid>
                                                                <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}
                                                                      pr={{
                                                                          xl:0,
                                                                          lg:0,
                                                                          md:0,
                                                                          sm:2,
                                                                          xs:2
                                                                      }}>
                                                                    <Select
                                                                        slotProps={{
                                                                            listbox: {
                                                                                sx: {
                                                                                    backgroundColor:"#0f171f",
                                                                                    padding:'0'
                                                                                },
                                                                            },
                                                                        }}
                                                                        sx={{
                                                                            padding:'0.75em 1em',
                                                                            backgroundColor:"#0f171f",
                                                                            ":hover": {
                                                                                backgroundColor: "#0f171f",
                                                                            },
                                                                            [`& .${selectClasses.indicator}`]: {
                                                                                transition: '0.2s',
                                                                                [`&.${selectClasses.expanded}`]: {
                                                                                    transform: 'rotate(-180deg)',
                                                                                },
                                                                            },
                                                                        }}
                                                                        variant={'outlined'}
                                                                        onChange={handleTypeChange}
                                                                        value={selectedType}
                                                                        indicator={<KeyboardArrowDown />}>
                                                                        {Object.values(LightType).map((value) => (
                                                                            <Option value={value} key={value}>{value.toLowerCase().replace(/^\w/, c => c.toUpperCase())}</Option>
                                                                        ))}
                                                                    </Select>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid pt={4} xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'} container>
                                                            <Button
                                                                onClick={handleSubmit(onSubmit)}
                                                                startDecorator={<Icon path={mdilCheck} size={1} />}
                                                                variant={'outlined'}
                                                                size={'lg'}>Finish Light Setup</Button>
                                                        </Grid>
                                                </Grid>
                                                :
                                                <Grid>
                                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'} pb={5}>
                                                        <Typography level={'h3'}>No Lights Found. Make Sure To Set Them Up In App And Try Again.</Typography>
                                                    </Grid>
                                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'}>
                                                        <Button
                                                            onClick={() => {
                                                                setIsSearching(true);
                                                                fetchLights();
                                                                }}
                                                            variant={'outlined'} startDecorator={<Icon path={mdiReload} size={1} />}>Try Again</Button>
                                                    </Grid>
                                                </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}