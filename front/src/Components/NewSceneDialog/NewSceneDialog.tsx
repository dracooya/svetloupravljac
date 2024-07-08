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
import {House} from "../../Models/House.ts";
import {useForm} from "react-hook-form";
import {mdiLampOutline, mdiLedStripVariant, mdiLightbulbOutline, mdiMoviePlayOutline, mdiPalette} from "@mdi/js";
import React, {useEffect, useState} from "react";
import {LightType} from "../../Models/Enums/LightType.ts";
import {Room} from "../../Models/Room.ts";
import {LightColorChangeDialog} from "../LightColorChangeDialog/LightColorChangeDialog.tsx";
import {LightBasicInfoWithStatus} from "../../Models/LightBasicInfoWithStatus.ts";

interface NewSceneDialogProps {
    open: boolean,
    closeModalCallback: () => void,
    houses: House[],
    isModification: boolean,
}

interface SceneForm {
    name: string,
    room: number
}

interface LightIncluded {
    light: LightBasicInfoWithStatus,
    included: boolean
}

export function NewSceneDialog({open, closeModalCallback, houses, isModification}: NewSceneDialogProps) {
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<SceneForm>({
        defaultValues: {
            name: "",
            room: houses[0].rooms[0].value
        },
        mode: "onChange"
    });

    const [selectedRoom, setSelectedRoom] = useState<Room>(houses[0].rooms[0]);
    const [includedLights, setIncludedLights] = useState<LightIncluded[]>([]);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [openColorDialog, setOpenColorDialog] = useState<boolean>(false);

    const handleColorDialogClose = () => {
        setOpenColorDialog(false);
    }

    const handleRoomChange = (_: React.SyntheticEvent | null, selectedRoomId: number | null) => {
        // noinspection TypeScriptValidateTypes
        setValue("room", selectedRoomId!);
        const room = houses.flatMap(house => house.rooms).find(room => room.value === selectedRoomId)
        setSelectedRoom(room);

    };

    useEffect(() => {
        setIncludedLights(selectedRoom.lights.map((light) => {return {light: light, included: true}}));
    }, [selectedRoom]);

    const onSubmit = (data : SceneForm) => {
        setActiveStep(1);
        console.log(data);
    };

    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => closeModalCallback()}
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
                                                onClick={() => setActiveStep(1)}
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
                                                        value={selectedRoom.value}
                                                        onChange={handleRoomChange}
                                                        indicator={<KeyboardArrowDown />}>
                                                        {houses.flatMap(house =>  house.rooms.map(room => {
                                                                return <Option value={room.value} key={room.value}>{house.name} - {room.name}</Option>
                                                            })
                                                        )}
                                                    </Select>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pt={6}
                                                      container justifyContent={'center'}>
                                                    <Button onClick={handleSubmit(onSubmit)} variant={'outlined'} size={'lg'}>Next</Button>
                                                </Grid>
                                            </Grid>
                                        }
                                    </Grid> :
                                    <Grid height={'40vh'} xs={12} sm={12} md={12} lg={12} xl={12}
                                          alignContent={'flex-start'}
                                          sx={{overflowY:'auto'}} container pl={3} pr={3} rowGap={2} justifyContent={'center'}>
                                        {includedLights.map((light) => {
                                            return <Grid container xs={12} sm={12} md={12} lg={9} xl={9}
                                                         key={light.light.name}>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                                    <Card sx={{
                                                        backgroundColor: '#0f171f',
                                                        borderRadius: '2em',
                                                    }}>
                                                        <Grid xs={12} sm={12} lg={12} md={12} xl={12} container
                                                              alignItems={'center'}>
                                                            <Grid xs={2} sm={2} md={2} lg={1} xl={1}>
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
                                                            <Grid xs={1} sm={1} md={1} lg={2} xl={2}>
                                                                <Avatar size={'sm'} src="src/assets/icons/modes/Custom.png" />
                                                            </Grid>
                                                            <Grid xs={2} sm={2} md={3} lg={3} xl={3} alignItems={'center'} container pl={{
                                                                md: 1,
                                                                sm: 2,
                                                            }}>
                                                                <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                    <Checkbox
                                                                              onChange={(event) => {
                                                                                  light.included = event.target.checked;
                                                                                  setIncludedLights(includedLights);
                                                                              }}
                                                                              variant="solid"
                                                                              checked={light.included} />
                                                                </Grid>
                                                                <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                    <IconButton
                                                                                onClick={() => setOpenColorDialog(true)}
                                                                                variant="outlined"
                                                                                sx={{border:'none', paddingBottom:'0.2em'}}><Icon path={mdiPalette} size={1} /></IconButton>
                                                                </Grid>
                                                                </Grid>
                                                        </Grid>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        })}
                                    </Grid>
                                    }
                                </Grid>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
            <LightColorChangeDialog open={openColorDialog} closeModalCallback={handleColorDialogClose}/>
        </>
    );
}