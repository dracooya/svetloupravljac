import {
    Avatar,
    Button,
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
import React from "react";
import {MoreVert} from "@mui/icons-material";
import {mdilDelete} from "@mdi/light-js/mdil";

interface ScenesProps {
    scenes: Scene[]
}

export function Scenes({scenes} : ScenesProps) {
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
                                                                <MenuItem><Icon path={mdilDelete} size={1}/>Delete</MenuItem>
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
        </>
    );
}