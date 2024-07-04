// noinspection TypeScriptValidateTypes

import {Button, FormControl, FormHelperText, Grid, Input, Typography} from "@mui/joy";
import {useForm} from "react-hook-form";
import {InfoOutlined, Login} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {mdilLogin} from "@mdi/light-js/mdil";
import Icon from "@mdi/react";


interface EntryForm {
    password: string
}

export function Entry() {
    const {register, handleSubmit, formState: {errors}} = useForm<EntryForm>({
        defaultValues: {
            password: "",
        },
        mode: "onChange"
    });

    const onSubmit = (data : EntryForm) => {
        /*TODO: Check password*/
        navigation('/main');
    };

    const navigation = useNavigate();


    return (
        <>
            <Grid container xs={11} sm={8} md={6} lg={4} xl={4}
                  bgcolor={'white'}
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
                            <Button onClick={handleSubmit(onSubmit)} startDecorator={<Icon path={mdilLogin} size={1} />}>Enter</Button>
                        </Grid>
                </Grid>
            </Grid>
        </>
    );
}