import {Button, DialogContent, Grid, Modal, ModalClose, ModalDialog, Typography} from "@mui/joy";
import {Transition} from "react-transition-group";
import parse from 'html-react-parser';

interface DeletionConfirmationDialogProps {
    open: boolean,
    closeModalCallback: () => void,
    message: string
    deleteConfirmedCallback: () => void
}


export function DeletionConfirmationDialog({open, closeModalCallback, message, deleteConfirmedCallback} : DeletionConfirmationDialogProps) {
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
                            <ModalClose variant="plain" />
                            <DialogContent>
                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                    <Grid pb={3} xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'}>
                                        <Typography level={'h1'}>Are You Sure?</Typography>
                                    </Grid>
                                    <Grid textAlign={'center'}>
                                        {parse(message)}
                                    </Grid>
                                    <Grid pt={5} xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'} columnGap={2}>
                                        <Grid>
                                            <Button color={'danger'} variant={'solid'}>Yes</Button>
                                        </Grid>
                                        <Grid>
                                            <Button color={'neutral'}
                                                    onClick={closeModalCallback}
                                                    variant={'outlined'}>No</Button>
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