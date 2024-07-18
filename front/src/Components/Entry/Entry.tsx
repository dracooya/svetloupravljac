// noinspection TypeScriptValidateTypes

import {Button, CssVarsProvider, FormControl, FormHelperText, Grid, Input, Typography} from "@mui/joy";
import {useForm} from "react-hook-form";
import {InfoOutlined} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {mdilLogin} from "@mdi/light-js/mdil";
import Icon from "@mdi/react";
import {EntryService} from "../../Services/EntryService.ts";
import {PopupMessage} from "../PopupMessage/PopupMessage.tsx";
import React, {useEffect, useRef, useState} from "react";
import {Password} from "../../Models/DTOs/Password.ts";


interface EntryForm {
    password: string
}

interface EntryProps {
    entryService: EntryService
}

export function Entry({entryService} : EntryProps) {

    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>("");
    const navigation = useNavigate();
    const shouldCheck = useRef(true);
    const handlePopupClose = () => { setPopupOpen(false); }
    const {register, handleSubmit, formState: {errors}} = useForm<EntryForm>({
        defaultValues: {
            password: "",
        },
        mode: "onChange"
    });

    useEffect(() => {
        if(!shouldCheck.current) return;
        entryService.isAuthorized().then((isAuthorized) => {
            if(isAuthorized) navigation('/main')
        })
        shouldCheck.current = false;
    }, []);

    const onSubmit = (data : EntryForm) => {
        const password : Password = {
            password: data.password
        }
        entryService.enter(password).then(_ => {
            navigation('/main');
        }).catch((err) => {
            setPopupMessage(err.response.data);
            setIsSuccess(false);
            setPopupOpen(true);
        });
    };

    return (
        <>
            <CssVarsProvider
                defaultMode="dark">
            <Grid container className={'gradient-bg'} xs={12} sm={12} md={12} lg={12} xl={12} height={'100vh'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                <Grid container xs={11} sm={8} md={6} lg={4} xl={4}
                      bgcolor={'white'}
                      alignItems={'flex-start'}
                      sx={{background:'#0f171f'}}
                      borderRadius={'0.5em'}
                      justifyContent={'center'}
                      padding={'1em'}>
                    <Grid container width={'100%'} justifyContent={'center'} alignItems={'center'} columnSpacing={2}>
                        <Grid>
                            <img src={'src/assets/miz.png'} width={'50vh'} height={'50vh'} alt={'Logo'}/>
                        </Grid>
                        <Grid>
                            <Typography level={'h1'}>MiZ</Typography>
                        </Grid>
                    </Grid>
                    <Grid pt={8} pb={3}>
                        <Typography level={'h2'} fontWeight={'700'}>Enter Password:</Typography>
                    </Grid>
                    <Grid container xs={12} sm={12} md={8} lg={10} xl={10} justifyContent={'center'}>
                            <FormControl error={!!errors.password}  sx={{width:'100%'}}>
                                <Input placeholder="Password"
                                       type={'password'}
                                       sx={{backgroundColor:'transparent'}}
                                       variant="outlined"
                                       size="lg"
                                        {...register("password",
                                            {
                                                required: "Password is a required field!",
                                            })}
                                    />
                                <FormHelperText>
                                    <InfoOutlined />
                                    {errors.password? errors.password?.message : "Required"}
                                </FormHelperText>
                            </FormControl>
                            <Grid pt={4} pb={2}>
                                <Button onClick={handleSubmit(onSubmit)}
                                        variant={'outlined'}
                                        startDecorator={<Icon path={mdilLogin} size={1} />}>Enter</Button>
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </CssVarsProvider>
            <PopupMessage message={popupMessage} isError={!isSuccess} isOpen={popupOpen} handleClose={handlePopupClose}/>
        </>
    );
}