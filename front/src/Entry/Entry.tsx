// noinspection TypeScriptValidateTypes

import {Button, FormControl, FormHelperText, Grid, Input, Typography} from "@mui/joy";
import {useForm} from "react-hook-form";
import {InfoOutlined, Login} from "@mui/icons-material";


export function Entry() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            password: "",
        },
        mode: "onChange"
    });


    const onSubmit = (data) => {
        console.log(data);
    };


    return (
        <>
            <Grid container item xs={11} sm={8} md={6} lg={4} xl={4}
                  bgcolor={'white'}
                  borderRadius={'0.5em'}
                  justifyContent={'center'}
                  padding={'1em'}>
                <Grid item container width={'100%'} justifyContent={'center'} alignItems={'center'} columnSpacing={2}>
                    <Grid item>
                        <img src={'src/assets/miz.png'} width={'50vh'} height={'50vh'} alt={'Logo'}/>
                    </Grid>
                    <Grid item>
                        <Typography level={'h1'}>MiZ</Typography>
                    </Grid>
                </Grid>
                <Grid item pt={8} pb={3}>
                    <Typography level={'h2'} fontWeight={'700'}>Enter Password:</Typography>
                </Grid>
                <Grid item container xs={12} sm={12} md={8} lg={10} xl={10} justifyContent={'center'}>
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
                            <Button onClick={handleSubmit(onSubmit)} startDecorator={<Login/>}>Enter</Button>
                        </Grid>
                </Grid>
            </Grid>
        </>
    );
}