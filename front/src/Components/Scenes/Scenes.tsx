import {
    Dropdown,
    Grid,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    Typography
} from "@mui/joy";
import {Scene} from "../../Models/Scene.ts";
import "../Main/Main.css"
import Icon from "@mdi/react";
import {mdilPencil, mdilPlus} from "@mdi/light-js";
import React, {useEffect, useRef, useState} from "react";
import {MoreVert} from "@mui/icons-material";
import {mdilDelete} from "@mdi/light-js/mdil";
import {DeletionConfirmationDialog} from "../DeletionConfirmationDialog/DeletionConfirmationDialog.tsx";
import {NewSceneDialog} from "../NewSceneDialog/NewSceneDialog.tsx";
import {House} from "../../Models/House.ts";
import {mdiMovieOpenPlayOutline} from "@mdi/js";
import {SceneService} from "../../Services/SceneService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";

interface ScenesProps {
    houses: House[],
    sceneService: SceneService
}

export function Scenes({houses, sceneService} : ScenesProps) {
    const [scenes, setScenes] = useState<Scene[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    const [selectedScene, setSelectedScene] = useState<Scene>();
    const [openNewDialog, setOpenNewDialog] = useState<boolean>(false);
    const [isModification, setIsModification] = useState<boolean>(false);
    const shouldLoad = useRef(true);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const handlePopupClose = () => { setPopupOpen(false); }
    const message_401 = import.meta.env.VITE_401_MESSAGE
    const handleDeleteDialogClose = () => setOpenDeleteDialog(false);
    const handleNewDialogClose = () => setOpenNewDialog(false);
    const deleteScene = () => {
        //TODO: Delete scene
    }

    useEffect(() => {
        if(!shouldLoad.current) return;
        sceneService.getAll().then((scenes) => {
            setScenes(scenes);
        }).catch((err) => {
            if(err.response.status == 401) {
                setPopupMessage(message_401);
                setIsSuccess(false);
                setPopupOpen(true);
            }
        });
        shouldLoad.current = false;
    }, []);

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} pb={3}>
                <Grid>
                    <Typography level={'h2'}>Scenes</Typography>
                </Grid>
                <Grid pl={3}>
                    <IconButton
                        disabled={houses.length == 0}
                        onClick={() => {
                            setIsModification(false);
                            setOpenNewDialog(true);
                        }}
                        variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPlus} /></IconButton>
                </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container alignContent={'flex-start'}
                  fontFamily={'Inter'}
                  sx={{height:'33vh', overflowY:'auto'}}>
                <Grid container xs={12} sm={12} md={12} lg={12} xl={12} rowGap={3}>
                    {scenes.map((scene) => {
                        return  <Grid container xs={6} sm={4} md={4} lg={4} xl={4} p={1}  key={scene.name}>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}
                                          container justifyContent={'center'}>
                                        <Grid p={1} container alignItems={'center'} justifyContent={'center'} sx={{borderRadius:'50%', border:'1px solid #12467b'}} className={'clickable'}>
                                            <Icon className={'pointer'} path={mdiMovieOpenPlayOutline} size={1.5} />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} sm={12} md={12} lg={12} xl={12}
                                          alignItems={'center'} justifyContent={'center'}>
                                            {scene.name}
                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container >
                                            <Dropdown>
                                                <MenuButton
                                                    slots={{ root: IconButton }}
                                                    slotProps={{ root: { variant: 'plain', color: 'neutral', sx:{ ":hover" : {backgroundColor:'transparent'}} } }}>
                                                    <MoreVert />
                                                </MenuButton>
                                                <Menu>
                                                    <MenuItem  onClick={() => {
                                                        setSelectedScene(scene);
                                                        setIsModification(true);
                                                        setOpenNewDialog(true);

                                                    }}><Icon path={mdilPencil} size={1}/>Edit</MenuItem>
                                                    <MenuItem
                                                        onClick={() => {
                                                            setSelectedScene(scene);
                                                            setDeleteMessage(" <b>Are you sure you want to remove " + scene.name + "?</b> The scene won't appear on the page, and you won't be able to activate it afterward.");
                                                            setOpenDeleteDialog(true);
                                                        }}><Icon path={mdilDelete} size={1}/>Delete</MenuItem>
                                                </Menu>
                                            </Dropdown>
                                        </Grid>
                                    </Grid>
                        </Grid>
                    })}
                </Grid>
            </Grid>
            <DeletionConfirmationDialog open={openDeleteDialog}
                                        closeModalCallback={handleDeleteDialogClose}
                                        message={deleteMessage} deleteConfirmedCallback={deleteScene}/>
            <NewSceneDialog open={openNewDialog}
                            sceneService={sceneService}
                            selectedScene={selectedScene}
                            closeModalCallback={handleNewDialogClose}
                            houses={houses}
                            isModification={isModification}/>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}