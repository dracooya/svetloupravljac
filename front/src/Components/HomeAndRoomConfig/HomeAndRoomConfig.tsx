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
import {HouseService} from "../../Services/HouseService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import {RoomService} from "../../Services/RoomService.ts";

interface HomeAndRoomConfigProps {
    houses: House[],
    setSelectedRoomParent: (room : Room | undefined) => void,
    houseService: HouseService,
    roomService: RoomService
}

export function HomeAndRoomConfig({houses, setSelectedRoomParent, houseService, roomService} : HomeAndRoomConfigProps) {
    const [selectedHouse, setSelectedHouse] = useState<House | undefined>(houses[0]);
    const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
    const [openNewHouseDialog, setOpenNewHouseDialog] = useState<boolean>(false);
    const [openNewRoomDialog, setOpenNewRoomDialog] = useState<boolean>(false);
    const [houseDeleteMessage, setHouseDeleteMessage] = useState<string>("");
    const [roomDeleteMessage, setRoomDeleteMessage] = useState<string>("");
    const [openHouseDeleteDialog, setOpenHouseDeleteDialog] = useState<boolean>(false);
    const [openRoomDeleteDialog, setOpenRoomDeleteDialog] = useState<boolean>(false);
    const [isModificationHouse, setIsModificationHouse] = useState<boolean>(false);
    const [isModificationRoom, setIsModificationRoom] = useState<boolean>(false);

    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const handlePopupClose = () => {setPopupOpen(false); }
    const message_401 = import.meta.env.VITE_401_MESSAGE;


    useEffect(() => {
        if(houses.length == 0) return;
        let house;
        if(localStorage.getItem("house") != "null" && localStorage.getItem("house") != "undefined") {
            house = houses.find(house => house.id == +localStorage.getItem("house"));
            if(house == undefined) {
                house = houses[0];
                setSelectedHouse(houses[0]);
                localStorage.setItem("house", houses[0]?.id.toString());
            }
            else setSelectedHouse(house)
        }
        else {
            house = houses[0];
            setSelectedHouse(houses[0]);
            localStorage.setItem("house", houses[0]?.id.toString());
        }
        if(localStorage.getItem("room") != "null" && localStorage.getItem("room") != "undefined") {
            setSelectedRoom(house.rooms.find(room => room.id == +localStorage.getItem("room")))
            setSelectedRoomParent(house.rooms.find(room => room.id == +localStorage.getItem("room")));
        }
        else {
            setSelectedRoom(house.rooms[0]);
            localStorage.setItem("room", house.rooms[0].id.toString());
        }

    }, [houses]);

    const handleHouseChange = (_: React.SyntheticEvent | null, selectedHouseId: number | null) => {
        const selectedHouse = houses.find(house => house.id === selectedHouseId!);
        setSelectedHouse(selectedHouse!);
        localStorage.setItem("house",selectedHouse!.id.toString());
        setSelectedRoom(selectedHouse!.rooms[0]);
        setSelectedRoomParent(selectedHouse!.rooms[0]);
        localStorage.setItem("room", selectedHouse!.rooms[0].id.toString());
        setIsModificationHouse(false);
    };

    const handleRoomChange = (_: React.SyntheticEvent | null, selectedRoomId: number | null) => {
        const room = selectedHouse!.rooms.find(room => room.id === selectedRoomId);
        setSelectedRoom(room!);
        localStorage.setItem("room", room!.id.toString());
        setSelectedRoomParent(room!);
        setIsModificationRoom(false);
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
        roomService.delete(selectedRoom!.id).then((msg) => {
            localStorage.setItem("message", msg);
            localStorage.removeItem("room");
            window.location.reload();
        }).catch((err) => {
            if(err.response.status == 401) setPopupMessage(message_401)
            else setPopupMessage(err.response.data);
            setIsSuccess(false);
            setPopupOpen(true);
        });
    }

    const deleteSelectedHouse = () => {
        houseService.delete(selectedHouse!.id).then((msg) => {
            localStorage.setItem("message", msg);
            localStorage.removeItem("house");
            localStorage.removeItem("room");
            window.location.reload();
        }).catch((err) => {
            if(err.response.status == 401) setPopupMessage(message_401)
            else setPopupMessage(err.response.data);
            setIsSuccess(false);
            setPopupOpen(true);
        });
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
                        disabled={houses.length == 0}
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
                        value={selectedHouse?.id}
                        indicator={<KeyboardArrowDown />}>
                        {houses.map((house) => {
                            return <Option value={house.id} key={house.id}>{house.name}</Option>
                        })}
                    </Select>
                </Grid>
                <Grid xs={4} sm={3} md={3} lg={4} xl={4} container pl={1}>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton  onClick={() => {
                            setIsModificationHouse(false);
                            setOpenNewHouseDialog(true);}} variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPlus}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton
                            disabled={selectedHouse == undefined}
                            onClick={() => {
                                setIsModificationHouse(true);
                                setOpenNewHouseDialog(true);}}
                            variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPencil} size={0.9}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton  variant="soft"
                                     disabled={selectedHouse == undefined}
                                     sx={{border:'1px solid #12467b'}}
                                     onClick={() => {
                                         setHouseDeleteMessage(" <b>Are you sure you want to remove " + selectedHouse!.name + "?</b> This action will: <br/> <br/>\n" +
                                             "                                        - <b>Remove all the rooms</b> associated with the home <br/>\n" +
                                             "                                        - <b>Remove lights from rooms </b> that have been removed <br/>\n" +
                                             "                                        - <b>Remove scenes associated with rooms</b> that have been removed<br/>\n"
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
                        disabled={houses.length == 0}
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
                        value={selectedRoom?.id}
                        onChange={handleRoomChange}
                        indicator={<KeyboardArrowDown />}>
                        {selectedHouse?.rooms.map((room) => {
                            return <Option value={room.id} key={room.id}>{room.name}</Option>
                        })}
                    </Select>
                </Grid>
                <Grid xs={4} sm={3} md={3} lg={4} xl={4} container pl={1}>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                         <IconButton
                             disabled={houses.length == 0}
                             onClick={() => {
                             setIsModificationRoom(false);
                             setOpenNewRoomDialog(true);}} variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPlus}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton
                            disabled={selectedRoom == undefined}
                            onClick={() => {
                                setIsModificationRoom(true);
                                setOpenNewRoomDialog(true);}}
                            variant="soft" sx={{border:'1px solid #12467b'}}><Icon path={mdilPencil} size={0.9}/></IconButton>
                    </Grid>
                    <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
                        <IconButton variant="soft"
                                    disabled={selectedRoom == undefined}
                                    sx={{border:'1px solid #12467b'}}
                                    onClick={() => {
                                        setRoomDeleteMessage(" <b>Are you sure you want to remove " +  selectedRoom!.name + "?</b> This action will: <br/> <br/>\n" +
                                            "                                        - <b>Remove all the lights</b> associated with the room <br/>\n" +
                                            "                                        - <b>Remove all the scenes</b> associated with the room <br/>\n" +
                                            "                                        - <b>Remove homes that have become empty</b> as a result of this action <br/>");
                                        setOpenRoomDeleteDialog(true);
                                    }}
                        ><Icon path={mdilDelete} size={0.9}/></IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <NewRoomDialog open={openNewRoomDialog}
                           roomService={roomService}
                           isModification={isModificationRoom}
                           selectedRoom={selectedRoom}
                           currentHouse={selectedHouse}
                           houses={houses}
                           closeModalCallback={handleRoomDialogClose}/>
            <NewHouseDialog open={openNewHouseDialog}
                            houseService={houseService}
                            isModification={isModificationHouse}
                            selectedHouse={selectedHouse}
                            closeModalCallback={handleHouseDialogClose}/>
            <DeletionConfirmationDialog open={openHouseDeleteDialog}
                                        closeModalCallback={handleHouseDeleteDialogClose}
                                        message={houseDeleteMessage} deleteConfirmedCallback={deleteSelectedHouse}/>
            <DeletionConfirmationDialog open={openRoomDeleteDialog}
                                        closeModalCallback={handleRoomDeleteDialogClose}
                                        message={roomDeleteMessage} deleteConfirmedCallback={deleteSelectedRoom}/>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}