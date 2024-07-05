import {
    Avatar,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    Switch,
    Tab,
    tabClasses,
    TabList, TabPanel,
    Tabs,
    Typography
} from "@mui/joy";
import React from "react";
import "../Main/Main.css"
import {LightBasicInfoWithStatus} from "../../Models/LightBasicInfoWithStatus.ts";

interface LightsStateProps {
    lights: LightBasicInfoWithStatus[] | undefined
}

export function LightsState({lights}: LightsStateProps) {
    const [roomLightsOn, setRoomLightsOn] = React.useState<boolean>(false);
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
                                        return <Grid container xs={12} sm={12} md={6} lg={4} xl={4} key={light.name}>
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Card sx={{backgroundColor:'#0f171f', borderRadius:'2em'}}>
                                                            <Grid xs={12} sm={12} lg={12} md={12} xl={12} container alignItems={'center'}>
                                                                    <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                                                                        <Avatar size="md" src="src/assets/icons/sun.png" />
                                                                    </Grid>
                                                                    <Grid pl={2} xs={8} sm={8} md={8} lg={8} xl={8} container justifyContent={'flex-start'}>
                                                                        {light.name}
                                                                    </Grid>
                                                                    <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
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
                    <Grid justifyContent={'center'} direction={'row'} container alignItems={'center'} sx={{cursor:'pointer'}}>
                        <Grid sx={{display:'flex', justifyContent:'center'}}>
                            <Avatar sx={{border:'2px solid white', backgroundColor:'transparent'}}
                                    size="lg" src="src/assets/icons/plus.png" />
                        </Grid>
                        <Grid sx={{display:'flex', justifyContent:'center'}} pl={2}>
                            <Typography sx={{fontFamily:'Inter !important'}}>Add New Light</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}