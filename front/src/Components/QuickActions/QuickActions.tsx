import {Avatar, Grid, List, ListItem, Typography} from "@mui/joy";
import {QuickAction} from "../../Models/QuickAction.ts";
import "../Main/Main.css"

interface QuickActionsProps {
    quickActions: QuickAction[]
}

export function QuickActions({quickActions} : QuickActionsProps) {
    return (
        <>
            <Grid pb={3}>
                <Typography level={'h2'}>Quick Actions</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                <Grid>
                    <List orientation="horizontal">
                        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} direction={'row'} rowSpacing={1}>
                            {quickActions.map((action) => {
                                return  <Grid container xs={4} sm={4} md={4} lg={4} xl={4} key={action.name}>
                                    <Grid>
                                        <ListItem >
                                            <Grid justifyContent={'center'} justifyItems={'center'} textAlign={'center'}>
                                                <Grid sx={{display:'flex', justifyContent:'center'}}>
                                                    <Avatar sx={{border:'1px solid #12467b',
                                                        cursor:'pointer',
                                                        "&:hover": {
                                                    backgroundColor:"rgba(255,255,255,0.4)"}
                                                    }} size="lg" src="src/assets/icons/sun.png" />
                                                </Grid>
                                                <Grid>
                                                    {action.name}
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            })}
                            {quickActions.length == 6 ? null :
                                <Grid container xs={4} sm={4} md={4} lg={4} xl={4}>
                                    <Grid>
                                        <ListItem sx={{cursor:'pointer'}}>
                                            <Grid justifyContent={'center'} justifyItems={'center'} textAlign={'center'}>
                                                <Grid sx={{display:'flex', justifyContent:'center'}}>
                                                    <Avatar sx={{border:'2px solid white',
                                                        backgroundColor:'#0f171f',
                                                        "&:hover": {
                                                            backgroundColor:"rgba(255,255,255,0.4)"}}}
                                                            size="lg" src="src/assets/icons/plus.png" />
                                                </Grid>
                                                <Grid>
                                                    Add New
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    </List>
                </Grid>
            </Grid>
        </>
    );
}