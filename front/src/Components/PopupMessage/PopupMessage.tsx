import {Grid, ModalClose, Snackbar} from "@mui/joy";
import React from "react";
import {mdiCheckCircleOutline, mdiCloseCircleOutline} from "@mdi/js";
import Icon from "@mdi/react";
import parse from 'html-react-parser';


interface PopupMessageProps {
    isError: boolean,
    isOpen: boolean,
    handleClose: () => void,
    message: string
}

export function PopupMessage({isError, isOpen, handleClose, message} : PopupMessageProps) {

    return (
        <>
            <Snackbar
                variant="soft"
                color={isError? "danger" : "success"}
                open={isOpen}
                size={'lg'}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                startDecorator={isError? <Icon path={mdiCloseCircleOutline} size={1} /> : <Icon path={mdiCheckCircleOutline} size={1} />}
                endDecorator={
                    <ModalClose variant="plain"  onClick={handleClose}/>
                }>
                <Grid textAlign={'center'}>
                    { message.includes("<") ? parse(message) : message}
                </Grid>
            </Snackbar>
        </>
    );
}