import {
    Button,
    DialogContent,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    Modal,
    ModalClose,
    ModalDialog, Option, Select, selectClasses, SvgIcon,
    Typography
} from "@mui/joy";
import { Transition } from 'react-transition-group';
import "../Main/Main.css";
import {useForm} from "react-hook-form";
import {InfoOutlined, KeyboardArrowDown} from "@mui/icons-material";
import {House} from "../../Models/House.ts";
import Icon from "@mdi/react";
import {mdilHome} from "@mdi/light-js";

interface NewRoomDialogProps {
    open: boolean,
    closeModalCallback: () => void,
    houses: House[]
}

interface RoomForm {
    name: string,
    house: number
}
export function NewRoomDialog({open, closeModalCallback, houses}: NewRoomDialogProps) {
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<RoomForm>({
        defaultValues: {
            name: "",
            house: houses[0].value
        },
        mode: "onChange"
    });

    const handleHouseChange = (_: React.SyntheticEvent | null, selectedHouseId: number | null) => {
        // noinspection TypeScriptValidateTypes
        setValue("house", selectedHouseId!);
    };

    const onSubmit = (data : RoomForm) => {
        /*TODO: Send data */
        reset();
        console.log(data);
    };

    // noinspection TypeScriptValidateTypes
    return (
        <>
            <Transition in={open} timeout={400}>
                {(state: string) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => closeModalCallback()}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}>
                        <ModalDialog
                            sx={{
                                backgroundColor:'#0f171f',
                                width: {
                                    xs:'90vw',
                                    sm:'90vw',
                                    md:'70vw',
                                    lg:'60vw',
                                    xl:'40vw'
                                },
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}>
                            <ModalClose variant="plain"  />
                            <DialogContent>
                                <Grid container xs={12} sm={12} md={12} lg={12} xl={12} justifyContent={'center'} pb={2}>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'} pb={7}>
                                        <Typography level={'h1'}>Add New Room</Typography>
                                    </Grid>
                                    <Grid container xs={12} sm={12} md={8} lg={8} xl={8} justifyContent={'center'}>
                                        <Grid pb={3} xs={12} sm={12} md={12} lg={12} xl={12} container>
                                            <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                <SvgIcon color={'warning'} fill="white" sx={{paddingLeft:'0.15em', paddingTop:'0.4em'}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"><path d="M34.06,1H1.94A.94.94,0,0,0,1,1.94V34.06a.94.94,0,0,0,.94.94H34.06a.94.94,0,0,0,.94-.94V1.94A.94.94,0,0,0,34.06,1ZM18.94,33.11V30.28a.94.94,0,1,0-1.88,0v2.83H2.89V24.58l8.49,0h0a.95.95,0,0,0,0-1.89l-8.5,0V2.89H11.3l.09,9.45a1,1,0,0,0,.94.94h0a1,1,0,0,0,.94-1l-.09-9.43H33.11v8.5H18a.94.94,0,0,0-.94.94V23.67a.94.94,0,0,0,1.88,0V13.28H33.11V33.11Z"/></svg>
                                                </SvgIcon>
                                            </Grid>
                                            <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}>
                                                <FormControl error={!!errors.name}>
                                                    <Input placeholder="Room Name"
                                                           type={'text'}
                                                           sx={{
                                                               backgroundColor:'transparent'
                                                           }}
                                                           variant="outlined"
                                                           size="lg"
                                                           {...register("name",
                                                               {
                                                                   required: "Room name is a required field!",
                                                               })}
                                                    />
                                                    <FormHelperText>
                                                        <InfoOutlined />
                                                        {errors.name? errors.name?.message : "Required"}
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid pb={3} xs={12} sm={12} md={12} lg={12} xl={12} container alignItems={'center'}>
                                            <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                <Icon path={mdilHome} size={1.5} />
                                            </Grid>
                                            <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={2}>
                                                <Select
                                                    slotProps={{
                                                        listbox: {
                                                            sx: {
                                                                backgroundColor:'transparent',
                                                                padding:'0'
                                                            },
                                                        },
                                                    }}
                                                    sx={{
                                                        padding:'0.75em 1em',
                                                        width:'100%',
                                                        backgroundColor:'transparent',
                                                        ":hover": {
                                                            backgroundColor: 'transparent',
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
                                                    onChange={handleHouseChange}
                                                    indicator={<KeyboardArrowDown />}>
                                                    {houses.map((house) => {
                                                        return <Option value={house.value} key={house.value}>{house.name}</Option>
                                                    })}
                                                </Select>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} pt={4} container justifyContent={'center'}>
                                            <Button onClick={handleSubmit(onSubmit)} variant={'outlined'} size={'lg'}>Add Room</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </>
    );
}