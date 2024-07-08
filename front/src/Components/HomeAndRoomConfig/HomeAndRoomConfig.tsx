import {Grid, IconButton, Option, Select, selectClasses, SvgIcon, Typography} from "@mui/joy";
import Icon from "@mdi/react";
import {mdilHome, mdilPlus} from "@mdi/light-js";
import {KeyboardArrowDown} from "@mui/icons-material";
import {House} from "../../Models/House.ts";
import React, {useEffect, useState} from "react";
import {Room} from "../../Models/Room.ts";
import {NewRoomDialog} from "../NewRoomDialog/NewRoomDialog.tsx";
import {NewHouseDialog} from "../NewHouseDialog/NewHouseDialog.tsx";
import {mdilDelete, mdilPencil} from "@mdi/light-js/mdil";
import {DeletionConfirmationDialog} from "../DeletionConfirmationDialog/DeletionConfirmationDialog.tsx";

interface HomeAndRoomConfigProps {
    houses: House[],
    setSelectedRoomParent: (room : Room) => void
}

export function HomeAndRoomConfig({houses, setSelectedRoomParent} : HomeAndRoomConfigProps) {
    const [selectedHouse, setSelectedHouse] = useState<House>(houses[0]);
    const [selectedRoom, setSelectedRoom] = useState<Room>(houses[0].rooms[0]);
    const [openNewHouseDialog, setOpenNewHouseDialog] = useState<boolean>(false);
    const [openNewRoomDialog, setOpenNewRoomDialog] = useState<boolean>(false);
    const [houseDeleteMessage, setHouseDeleteMessage] = useState<string>("");
    const [roomDeleteMessage, setRoomDeleteMessage] = useState<string>("");
    const [openHouseDeleteDialog, setOpenHouseDeleteDialog] = useState<boolean>(false);
    const [openRoomDeleteDialog, setOpenRoomDeleteDialog] = useState<boolean>(false);

    useEffect(() => {
        setSelectedRoomParent(selectedRoom);
    }, []);

    const handleHouseChange = (_: React.SyntheticEvent | null, selectedHouseId: number | null) => {
        const selectedHouse = houses.find(house => house.value === selectedHouseId!);
        setSelectedHouse(selectedHouse!);
        setSelectedRoom(selectedHouse!.rooms[0]);
        setSelectedRoomParent(selectedHouse!.rooms[0]);
    };

    const handleRoomChange = (_: React.SyntheticEvent | null, selectedRoomId: number | null) => {
        const room = selectedHouse.rooms.find(room => room.value === selectedRoomId);
        setSelectedRoom(room!);
        setSelectedRoomParent(room!);
    };

    const handleRoomDialogClose = () => {
        setOpenNewRoomDialog(false);
    }

    const handleHouseDialogClose = () => {
        setOpenNewHouseDialog(false);
    }

    const handleHouseDeleteDialogClose = () => {
        setOpenHouseDeleteDialog(false);
    }

    const handleRoomDeleteDialogClose = () => {
        setOpenRoomDeleteDialog(false);
    }

    const deleteSelectedRoom = () => {
        //TODO: Delete room
    }

    const deleteSelectedHouse = () => {
        //TODO: Delete room
    }

    return (
        <>
            <Grid pb={3}>
                <Typography level={'h2'}>Home & Room (Current)</Typography>
            </Grid>
            <Grid container alignItems={'center'} xl={12} lg={12} md={12} sm={12} xs={12}>
                <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                    <Icon path={mdilHome} size={1.5} />
                </Grid>
                <Grid xs={7} sm={7} md={8} lg={7} xl={7} pl={2} >
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
                        onChange={handleHouseChange}
                        value={selectedHouse.value}
                        indicator={<KeyboardArrowDown />}>
                        {houses.map((house) => {
                            return <Option value={house.value} key={house.value}>{house.name}</Option>
                        })}
                    </Select>
                </Grid>
                <Grid xs={4} sm={3} md={3} lg={4} xl={4} container pl={1}>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton  onClick={() => {
                            setOpenNewHouseDialog(true)}} variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPlus}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPencil} size={0.9}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton  variant="soft"
                                     sx={{border:'1px solid #12467b'}}
                                     onClick={() => {
                                         setHouseDeleteMessage(" <b>Are you sure you want to remove " + selectedHouse.name + "?</b> This action will: <br/> <br/>\n" +
                                             "                                        - <b>Remove all the rooms</b> associated with the house <br/>\n" +
                                             "                                        - <b>Remove lights from rooms </b> that have been removed <br/>\n" +
                                             "                                        - <b>Removed scenes that have become empty</b> as a result of lights removal <br/>\n"
                                                                                  );
                                         setOpenHouseDeleteDialog(true);
                                     }}
                        ><Icon path={mdilDelete} size={0.9}/></IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container alignItems={'center'} width={'100%'} pt={2}>
                <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                    <SvgIcon color={'warning'} fill="white" sx={{paddingLeft:'0.15em'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M34.06,1H1.94A.94.94,0,0,0,1,1.94V34.06a.94.94,0,0,0,.94.94H34.06a.94.94,0,0,0,.94-.94V1.94A.94.94,0,0,0,34.06,1ZM18.94,33.11V30.28a.94.94,0,1,0-1.88,0v2.83H2.89V24.58l8.49,0h0a.95.95,0,0,0,0-1.89l-8.5,0V2.89H11.3l.09,9.45a1,1,0,0,0,.94.94h0a1,1,0,0,0,.94-1l-.09-9.43H33.11v8.5H18a.94.94,0,0,0-.94.94V23.67a.94.94,0,0,0,1.88,0V13.28H33.11V33.11Z"/></svg>
                    </SvgIcon>
                </Grid>
                <Grid xs={7} sm={7} md={8} lg={7} xl={7} pl={2}>
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
                        value={selectedRoom.value}
                        onChange={handleRoomChange}
                        indicator={<KeyboardArrowDown />}>
                        {selectedHouse.rooms.map((room) => {
                            return <Option value={room.value} key={room.value}>{room.name}</Option>
                        })}
                    </Select>
                </Grid>
                <Grid xs={4} sm={3} md={3} lg={4} xl={4} container pl={1}>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                         <IconButton  onClick={() => {
                        setOpenNewRoomDialog(true)}} variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPlus}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPencil} size={0.9}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton variant="soft"
                                    sx={{border:'1px solid #12467b'}}
                                    onClick={() => {
                                        setRoomDeleteMessage(" <b>Are you sure you want to remove " +  selectedRoom.name + "?</b> This action will: <br/> <br/>\n" +
                                            "                                        - <b>Remove all the lights</b> associated with the room <br/>\n" +
                                            "                                        - <b>Remove those lights from scenes</b> where they are included <br/>\n" +
                                            "                                        - <b>Remove scenes that have become empty</b> as a result of lights removal <br/>\n" +
                                            "                                        - <b>Remove houses that have become empty</b> as a result of this action <br/>");
                                        setOpenRoomDeleteDialog(true);
                                    }}
                        ><Icon path={mdilDelete} size={0.9}/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <NewRoomDialog open={openNewRoomDialog} houses={houses} closeModalCallback={handleRoomDialogClose}/>
            <NewHouseDialog open={openNewHouseDialog} closeModalCallback={handleHouseDialogClose}/>
            <DeletionConfirmationDialog open={openHouseDeleteDialog}
                                        closeModalCallback={handleHouseDeleteDialogClose}
                                        message={houseDeleteMessage} deleteConfirmedCallback={deleteSelectedHouse}/>
            <DeletionConfirmationDialog open={openRoomDeleteDialog}
                                        closeModalCallback={handleRoomDeleteDialogClose}
                                        message={roomDeleteMessage} deleteConfirmedCallback={deleteSelectedRoom}/>
        </>
    );
}