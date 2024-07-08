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
import React, {useState} from "react";
import "../Main/Main.css"
import {LightBasicInfoWithStatus} from "../../Models/LightBasicInfoWithStatus.ts";
import {LightType} from "../../Models/Enums/LightType.ts";
import Icon from "@mdi/react";
import {mdiLampOutline, mdiLedStripVariant, mdiLightbulbOutline} from '@mdi/js';
import {NewLightDialog} from "../NewLightDialog/NewLightDialog.tsx";
import {House} from "../../Models/House.ts";
import {MoreVert} from "@mui/icons-material";
import {mdilDelete, mdilPencil} from "@mdi/light-js";
import {LightColorChangeDialog} from "../LightColorChangeDialog/LightColorChangeDialog.tsx";
import {AvailableMode} from "../../Models/AvailableMode.ts";
import {ModeCategory} from "../../Models/Enums/ModeCategory.ts";
import {DeletionConfirmationDialog} from "../DeletionConfirmationDialog/DeletionConfirmationDialog.tsx";

interface LightsStateProps {
    lights: LightBasicInfoWithStatus[] | undefined,
    houses: House[]
}

export function LightsState({lights, houses}: LightsStateProps) {
    const [roomLightsOn, setRoomLightsOn] = React.useState<boolean>(false);
    const [openNewLightDialog, setOpenNewLightDialog] = useState<boolean>(false);
    const [openLightColorChangeDialog, setOpenLightColorChangeDialog] = useState<boolean>(false);
    const [selectedLight, setSelectedLight] = useState<LightBasicInfoWithStatus>();
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");

    const handleDeleteDialogClose = () => setOpenDeleteDialog(false);

    const deleteLight = () => {
        //TODO: Delete selected light
    }

    const [availableModes] = useState<AvailableMode[]>([
        {id:1, name:'Ocean', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:2, name:'Romance', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:3, name:'Sunset', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:4, name:'Party', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:5, name:'Fireplace', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:6, name:'Cozy', speedChange: false, brightnessChange: true, category: ModeCategory.FUNCTIONAL},
        {id:7, name:'Forest', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:8, name:'Pastel Colors', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:9, name:'Wake-Up', speedChange: false, brightnessChange: false, category: ModeCategory.PROGRESSIVE},
        {id:10, name:'Bedtime', speedChange: false, brightnessChange: true, category: ModeCategory.PROGRESSIVE},
        {id:11, name:'Warm White', speedChange: false, brightnessChange: true, category: ModeCategory.BASIC},
        {id:12, name:'Daylight', speedChange: false, brightnessChange: true, category: ModeCategory.BASIC},
        {id:13, name:'Cool White', speedChange: false, brightnessChange: true, category: ModeCategory.BASIC},
        {id:14, name:'Night Light', speedChange: false, brightnessChange: false, category: ModeCategory.FUNCTIONAL},
        {id:15, name:'Focus', speedChange: false, brightnessChange: true, category: ModeCategory.FUNCTIONAL},
        {id:16, name:'Relax', speedChange: false, brightnessChange: true, category: ModeCategory.FUNCTIONAL},
        {id:17, name:'True Colors', speedChange: false, brightnessChange: true, category: ModeCategory.FUNCTIONAL},
        {id:18, name:'TV Time', speedChange: false, brightnessChange: true, category: ModeCategory.FUNCTIONAL},
        {id:19, name:'Plant Growth', speedChange: false, brightnessChange: true, category: ModeCategory.FUNCTIONAL},
        {id:20, name:'Spring', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:21, name:'Summer', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:22, name:'Fall', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:23, name:'Deep Dive', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:24, name:'Jungle', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:25, name:'Mojito', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:26, name:'Club', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:27, name:'Christmas', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:28, name:'Halloween', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:29, name:'Candlelight', speedChange: false, brightnessChange: true, category: ModeCategory.WHITE},
        {id:30, name:'Golden White', speedChange: true, brightnessChange: true, category: ModeCategory.WHITE},
        {id:31, name:'Pulse', speedChange: true, brightnessChange: true, category: ModeCategory.WHITE},
        {id:32, name:'Steampunk', speedChange: true, brightnessChange: true, category: ModeCategory.WHITE},
        {id:33, name:'Diwali', speedChange: true, brightnessChange: true, category: ModeCategory.COLOR},
        {id:35, name:'Alarm', speedChange: false, brightnessChange: false, category: ModeCategory.WHITE}
    ]);
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
                                                        sx={{
                                                            "--Switch-trackWidth": "55px"
                                                        }}
                                                        size={'lg'}
                                                        checked={roomLightsOn}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            setRoomLightsOn(event.target.checked)
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
                                                                    <Grid xs={2} sm={2} md={2} lg={2} xl={2} onClick={() => setOpenLightColorChangeDialog(true)}>
                                                                        {light.type == LightType.BULB?
                                                                            <Icon path={mdiLightbulbOutline} size={1.5} /> :
                                                                            light.type == LightType.STRIP ? <Icon path={mdiLedStripVariant} size={1.5} /> :
                                                                                <Icon path={mdiLampOutline} size={1.5} />

                                                                        }
                                                                    </Grid>
                                                                <Grid pl={2} xs={6} sm={6} md={6} lg={6} xl={6} container alignItems={'center'} justifyContent={'flex-start'}>
                                                                    <Grid onClick={() => setOpenLightColorChangeDialog(true)}>
                                                                        {light.name}
                                                                    </Grid>
                                                                    </Grid>
                                                                    <Grid xs={2} sm={2} md={1} lg={2} xl={2} pr={3} container alignItems={'center'}>
                                                                        <Switch
                                                                            sx={{
                                                                            }}
                                                                            size={'lg'}
                                                                            checked={roomLightsOn}
                                                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                setRoomLightsOn(event.target.checked)
                                                                            }
                                                                            }
                                                                            color={roomLightsOn ? 'primary' : 'neutral'}
                                                                            variant={roomLightsOn ? 'solid' : 'outlined'}/>
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
                                                                            <MenuItem><Icon path={mdilPencil} size={1}/>Edit</MenuItem>
                                                                            <MenuItem
                                                                                onClick={() => {
                                                                                    setSelectedLight(light);
                                                                                    setDeleteMessage(" <b>Are you sure you want to remove " + light.name + "?</b>" +
                                                                                        " This will also remove it from scenes where it's included." +
                                                                                        " <b>This may cause some scenes to become empty</b> and, therefore, <b>deleted</b>.");
                                                                                    setOpenDeleteDialog(true);
                                                                                }}
                                                                            ><Icon path={mdilDelete} size={1}/>Delete</MenuItem>
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
                            <Avatar sx={{border:'2px solid white', backgroundColor:'transparent'}} className={'clickable'}
                                    size="lg" src="src/assets/icons/plus.png"
                                    onClick={() => {
                                        setOpenNewLightDialog(true)}}/>
                        </Grid>
                        <Grid sx={{display:'flex', justifyContent:'center'}} pl={2}>
                            <Typography sx={{fontFamily:'Inter !important'}}>Add New Light</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <NewLightDialog open={openNewLightDialog} houses={houses} closeModalCallback={handleLightDialogClose}/>
            <LightColorChangeDialog open={openLightColorChangeDialog} availableModes={availableModes} closeModalCallback={handleLightColorChangeDialogClose}/>
            <DeletionConfirmationDialog open={openDeleteDialog}
                                        closeModalCallback={handleDeleteDialogClose}
                                        message={deleteMessage} deleteConfirmedCallback={deleteLight}/>
        </>
    );
}