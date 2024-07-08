import {
    Avatar,
    Dropdown,
    Grid,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    Typography
} from "@mui/joy";
import {Scene} from "../../Models/Scene.ts";
import "../Main/Main.css"
import Icon from "@mdi/react";
import {mdilPencil, mdilPlus} from "@mdi/light-js";
import React, {useState} from "react";
import {MoreVert} from "@mui/icons-material";
import {mdilDelete} from "@mdi/light-js/mdil";
import {DeletionConfirmationDialog} from "../DeletionConfirmationDialog/DeletionConfirmationDialog.tsx";

interface ScenesProps {
    scenes: Scene[]
}

export function Scenes({scenes} : ScenesProps) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string>("");
    const [selectedScene, setSelectedScene] = useState<Scene>();
    const handleDeleteDialogClose = () => setOpenDeleteDialog(false);
    const deleteScene = () => {
        //TODO: Delete scene
    }

    return (
        <>
            <Grid container justifyContent={'center'} alignItems={'center'} pb={3}>
                <Grid>
                    <Typography level={'h2'}>Scenes</Typography>
                </Grid>
                <Grid pl={3}>
                    <IconButton variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPlus} /></IconButton>
                </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}
                  sx={{height:'33vh', overflowY:'auto'}}>
                <Grid>
                    <List orientation="horizontal">
                        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} direction={'row'} rowSpacing={1}>
                            {scenes.map((scene) => {
                                return  <Grid container xs={4} sm={4} md={4} lg={4} xl={4} key={scene.name}>
                                    <Grid>
                                        <ListItem >
                                            <Grid>
                                                <Grid sx={{display:'flex', justifyContent:'center'}}>
                                                    <Avatar  className={'clickable'} size="lg" src="src/assets/icons/modes/club.png" />
                                                </Grid>
                                                <Grid container alignItems={'center'}>
                                                    <Grid xs={11} sm={11} md={11} lg={11} xl={11}>
                                                        {scene.name}
                                                    </Grid>
                                                    <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <Dropdown>
                                                            <MenuButton
                                                                slots={{ root: IconButton }}
                                                                slotProps={{ root: { variant: 'plain', color: 'neutral', sx:{ ":hover" : {backgroundColor:'transparent'}} } }}
                                                            >
                                                                <MoreVert />
                                                            </MenuButton>
                                                            <Menu>
                                                                <MenuItem><Icon path={mdilPencil} size={1}/>Edit</MenuItem>
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        setSelectedScene(scene);
                                                                        setDeleteMessage(" <b>Are you sure you want to remove " + scene.name + "?</b> The scene won't appear on the page and you won't be able to activate it afterwards.");
                                                                        setOpenDeleteDialog(true);
                                                                    }}><Icon path={mdilDelete} size={1}/>Delete</MenuItem>
                                                            </Menu>
                                                        </Dropdown>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            })}
                        </Grid>
                    </List>
                </Grid>
            </Grid>
            <DeletionConfirmationDialog open={openDeleteDialog}
                                        closeModalCallback={handleDeleteDialogClose}
                                        message={deleteMessage} deleteConfirmedCallback={deleteScene}/>
        </>
    );
}