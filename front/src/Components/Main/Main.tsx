import {
    Grid,
    Select,
    Option,
    selectClasses,
    CssVarsProvider,
    SvgIcon, Card, CardContent, Typography, Button
} from "@mui/joy";
import {KeyboardArrowDown} from "@mui/icons-material";
import {useState} from "react";
import {mdilHome, mdilPlus} from "@mdi/light-js/mdil";
import Icon from "@mdi/react";

interface Room {
    value: string
    name: string
}

export function Main() {

    const [rooms, setRooms] = useState<Room[]>([{value:"goober", name: "Goober"}, {value:"joober", name:"Joober"}]);
    const [houses, setHouses] = useState<Room[]>([{value:"gooberHome", name: "Goober Home"}, {value:"jooberHome", name:"Joober Home"}]);
    return (
        <>
            <CssVarsProvider
                defaultMode="dark">
            <Grid container width={'100%'}
                  id={'container'}
                  height={'100%'}
                  color={'white'}
                  alignItems={'top'}
                  direction={'column'}
                  sx={{background:'#0f171f'}}>
                <Grid sx = {{background: 'linear-gradient(90deg, hsla(248, 87%, 36%, 1) 0%,' +
                        ' hsla(191, 75%, 60%, 1) 50%, hsla(248, 87%, 36%, 1) 100%);'}}
                      width={'100%'}
                      p={1}
                      borderRadius={'0 0 0.75em 0.75em'}
                      alignSelf={'top'}
                      justifyContent={'center'}
                      alignItems={'center'}>
                    <Grid>
                        <img src={'src/assets/miz.png'} width={'50px'} height={'50px'} alt={'Logo'}/>
                    </Grid>
                </Grid>
                <Grid container direction={'row'} pt={4} pb={2} pl={2}>
                    <Grid container xs={12} sm={12} md={6} lg={4} xl={4} pl={2}  justifyContent={'center'}>
                        <Grid pb={3}>
                            <Typography level={'h2'}>Home & Room (Current)</Typography>
                        </Grid>
                            <Grid container alignItems={'center'} xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <Icon path={mdilHome} size={1.5} />
                                </Grid>
                                <Grid xs={7} sm={7} md={8} lg={8} xl={8} pl={2} >
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
                                        defaultValue={houses[0].value}
                                        indicator={<KeyboardArrowDown />}
                                       >
                                        {houses.map((house) => {
                                            return <Option value={house.value} key={house.value}>{house.name}</Option>
                                        })}
                                    </Select>
                                </Grid>
                                <Grid xs={4} sm={4} md={3} lg={3} xl={3}>
                                <Button variant={'outlined'} startDecorator={<Icon path={mdilPlus} size={1} />}>Add</Button>
                                </Grid>
                            </Grid>

                            <Grid container alignItems={'center'} width={'100%'} pt={2}>
                                <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <SvgIcon color={'warning'} fill="white" sx={{paddingLeft:'0.15em'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M34.06,1H1.94A.94.94,0,0,0,1,1.94V34.06a.94.94,0,0,0,.94.94H34.06a.94.94,0,0,0,.94-.94V1.94A.94.94,0,0,0,34.06,1ZM18.94,33.11V30.28a.94.94,0,1,0-1.88,0v2.83H2.89V24.58l8.49,0h0a.95.95,0,0,0,0-1.89l-8.5,0V2.89H11.3l.09,9.45a1,1,0,0,0,.94.94h0a1,1,0,0,0,.94-1l-.09-9.43H33.11v8.5H18a.94.94,0,0,0-.94.94V23.67a.94.94,0,0,0,1.88,0V13.28H33.11V33.11Z"/></svg>
                                    </SvgIcon>
                                </Grid>
                                <Grid xs={7} sm={7} md={8} lg={8} xl={8} pl={2}>
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
                                        defaultValue={rooms[0].value}
                                        indicator={<KeyboardArrowDown />}
                                    >
                                        {rooms.map((room) => {
                                            return <Option value={room.value} key={room.value}>{room.name}</Option>
                                        })}
                                    </Select>
                                </Grid>
                                <Grid xs={4} sm={4} md={3} lg={3} xl={3}>
                                    <Button variant={'outlined'} startDecorator={<Icon path={mdilPlus} size={1} />}>Add</Button>
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid pl={5}>
                    </Grid>
                </Grid>
            </Grid>
            </CssVarsProvider>
        </>
    );
}