import {Avatar, Button, Grid, IconButton, List, ListItem, Typography} from "@mui/joy";
import {Scene} from "../../Models/Scene.ts";
import "../Main/Main.css"
import Icon from "@mdi/react";
import {mdilPlus} from "@mdi/light-js";
import React from "react";

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
                                                    <Avatar sx={{border:'1px solid #12467b',
                                                        cursor:'pointer',
                                                        "&:hover": {
                                                    backgroundColor:"rgba(255,255,255,0.4)"}
                                                    }} size="lg" src="src/assets/icons/sun.png" />
                                                </Grid>
                                                <Grid>
                                                    {scene.name}
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