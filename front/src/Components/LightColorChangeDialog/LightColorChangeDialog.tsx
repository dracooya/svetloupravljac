import {
    Avatar,
    DialogContent,
    Grid,
    Input,
    Modal,
    ModalClose,
    ModalDialog,
    Slider,
    Tab,
    tabClasses,
    TabList,
    TabPanel,
    Tabs,
    Typography
} from "@mui/joy";
import {Transition} from "react-transition-group";
import React, {useEffect, useState} from "react";
import {RgbColor, RgbColorPicker} from "react-colorful";
import {useDebouncedCallback} from "use-debounce";
import {mdiEyedropperVariant, mdiRabbit, mdiThermometer, mdiTortoise, mdiWhiteBalanceSunny} from "@mdi/js";
import Icon from "@mdi/react";
import {AvailableMode} from "../../Models/AvailableMode.ts";
import {ModeCategory} from "../../Models/Enums/ModeCategory.ts";
import "./LightColorChangeDialog.css";
import {availableModes} from "../Utils/AvailableModes.ts";
import {ColorOrModeParams} from "../../Models/ColorOrModeParams.ts";

interface LightColorChangeDialogProps {
    open: boolean,
    closeModalCallback: () => void,
    valueChangeCallback: (_ : ColorOrModeParams) => void
}

export function LightColorChangeDialog({open,closeModalCallback, valueChangeCallback}: LightColorChangeDialogProps) {
    const [color, setColor] = useState<RgbColor>({r:255, g:255, b:255});
    const debouncedColor = useDebouncedCallback(
        (value : RgbColor) => {
            setColorHex(rgbToHex(value.r, value.g, value.b));
            const change : ColorOrModeParams = {
                r: value.r,
                g: value.g,
                b: value.b,
                brightness: -1,
                temperature: -1,
                speed: -1,
                mode: -1
            }
            valueChangeCallback(change);
        },
        200
    );
    const [colorHex, setColorHex] = useState<string>("FFFFFF");
    const [whiteKelvin, setWhiteKelvin] = useState<number>(2200);
    const debouncedKelvin = useDebouncedCallback(
        (value : number) => {
            const change : ColorOrModeParams = {
                r: -1,
                g: -1,
                b: -1,
                brightness: -1,
                temperature: value,
                speed: -1,
                mode: -1
            }
            valueChangeCallback(change);
        },
        100
    );
    const [brightness, setBrightness] = useState<number>(0);
    const debouncedBrightness = useDebouncedCallback(
        (value : number) => {
            const change : ColorOrModeParams = {
                r: -1,
                g: -1,
                b: -1,
                brightness: value,
                temperature: -1,
                speed: -1,
                mode: -1
            }
            valueChangeCallback(change);
        },
        100
    );
    const [modeBrightness, setModeBrightness] = useState<number>(100);
    const debouncedModeBrightness = useDebouncedCallback(
        (value : number) => {
            const change : ColorOrModeParams = {
                r: -1,
                g: -1,
                b: -1,
                brightness: value,
                temperature: -1,
                speed: -1,
                mode: -1
            }
            valueChangeCallback(change);
        },
        100
    );
    const [selectedMode, setSelectedMode] = useState<AvailableMode>();
    useEffect(() => {
        if(selectedMode == undefined) return;
        const change : ColorOrModeParams = {
            r: -1,
            g: -1,
            b: -1,
            brightness:-1,
            temperature: -1,
            speed: -1,
            mode: selectedMode.id
        }
        valueChangeCallback(change);

    }, [selectedMode]);
    const [modeSpeed, setModeSpeed] = useState<number>(50);
    const debouncedSpeed = useDebouncedCallback(
        (value : number) => {
            const change : ColorOrModeParams = {
                r: -1,
                g: -1,
                b: -1,
                brightness:-1,
                temperature: -1,
                speed: value,
                mode: -1
            }
            valueChangeCallback(change);
        },
        100
    );

    const  rgbToHex = (r: number, g: number, b: number) => {
        const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
        return `${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    const hexToRgb = (hex: string) => {
        const cleanedHex = hex.replace(/^#/, '');
        if (cleanedHex.length !== 6) {
            return null;
        }
        const r = parseInt(cleanedHex.slice(0, 2), 16);
        const g = parseInt(cleanedHex.slice(2, 4), 16);
        const b = parseInt(cleanedHex.slice(4, 6), 16);
        return { r, g, b };
    }

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
                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container>
                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} textAlign={'center'} pb={3}>
                                        <Typography level={'h1'}>Light Settings</Typography>
                                    </Grid>
                                    <Tabs
                                        orientation={'vertical'}
                                        sx={{backgroundColor:'transparent'}}
                                        aria-label="Tabs">
                                        <TabList
                                            disableUnderline
                                            sx={{
                                                p: 0.5,
                                                gap: 0.5,
                                                borderRadius: 'xl',
                                                justifyContent: 'center',
                                                bgcolor: 'transparent',
                                                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                                    boxShadow: 'sm',
                                                    bgcolor: 'background.surface',
                                                },
                                            }}
                                        >
                                            <Tab>Color</Tab>
                                            <Tab>Modes</Tab>
                                        </TabList>
                                        <TabPanel value={0} sx={{paddingTop:'0'}}>
                                            <Grid height={'75vh'} xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'} alignContent={'flex-start'}>
                                                <Grid xs={11} sm={11} md={11} lg={11} xl={11} height={'30vh'}>
                                                    <div className={'responsive'}>
                                                        <RgbColorPicker color={color} onChange={(newColor: RgbColor) => {
                                                            setColor(newColor);
                                                            setColorHex(rgbToHex(newColor.r, newColor.g, newColor.b));
                                                            debouncedColor(newColor);
                                                        }
                                                        } />
                                                    </div>
                                                </Grid>
                                                <Grid xs={12} sm={8} md={6} lg={6} xl={6} pt={3} pb={3} container alignItems={'center'}>
                                                    <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                        <Icon path={mdiEyedropperVariant} size={1.3} />
                                                    </Grid>
                                                    <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={3}>
                                                        <Input value={colorHex}
                                                               startDecorator={'#'}
                                                               slotProps={{
                                                                   input: {
                                                                     maxLength:6,
                                                                     pattern:"[0-9a-fA-F]*"
                                                                   },
                                                               }}
                                                               onChange={(event) => {
                                                                   const regex = new RegExp("^[0-9a-fA-F]*$");
                                                                   const val = event.target.value;
                                                                   if (regex.test(val)) {
                                                                       const converted = hexToRgb(event.target.value)
                                                                       setColor(converted);
                                                                       setColorHex(event.target.value);
                                                                       debouncedColor(converted as RgbColor);
                                                                   }

                                                               }}
                                                               type={'text'}
                                                               sx={{
                                                                   backgroundColor:'transparent'
                                                               }}
                                                               variant="outlined"
                                                               size="lg"/>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pt={2} pb={5} container justifyContent={'center'}>
                                                    <Grid xs={11} sm={11} md={11} lg={11} xl={11} container>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container alignItems={'center'} justifyContent={'center'}>
                                                            <Icon path={mdiWhiteBalanceSunny} size={0.8} />
                                                        </Grid>
                                                        <Grid xs={10} sm={10} md={10} lg={10} xl={10} pl={2} pr={2} container
                                                              sx={{ background: "linear-gradient(90deg, rgba(2,165,220,1) 0%, rgba(113,224,251,1) 100%);",
                                                            height:'30px', borderRadius:'1em'}}>
                                                            <Slider size="lg"
                                                                    sx={{
                                                                        '& .MuiSlider-track': {
                                                                            background:'transparent',
                                                                        },
                                                                        '& .MuiSlider-rail': {
                                                                            height:'30px',
                                                                            background: "transparent",
                                                                        },
                                                                        '& .MuiSlider-thumb': {
                                                                            height:'30px',
                                                                            background:'transparent',
                                                                            border:'2px solid white'
                                                                        },
                                                                    }}
                                                                    onChange={(event, newValue) => {
                                                                        setBrightness(newValue);
                                                                        debouncedBrightness(newValue);}}
                                                                    value={brightness}
                                                                    step={1}
                                                                    min={0}
                                                                    max={100}/>
                                                        </Grid>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container justifyContent={'center'} alignItems={'center'}>
                                                            <Icon path={mdiWhiteBalanceSunny} size={1} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid xs={11} sm={11} md={11} lg={11} xl={11}  pl={3} pr={3}
                                                      sx={{ background: "linear-gradient(90deg, rgba(255,190,127,1) 0%, rgba(255,213,179,1) 50%, rgba(215,246,249,1) 100%)",
                                                      height:'50px', borderRadius:'2em'}}
                                                      container alignItems={'center'}>
                                                    <Slider size="lg"
                                                            sx={{
                                                                '& .MuiSlider-track': {
                                                                    background:'transparent',

                                                                },
                                                                '& .MuiSlider-rail': {
                                                                    height:'50px',
                                                                    background: "linear-gradient(90deg, rgba(255,190,127,1) 0%, rgba(255,213,179,1) 50%, rgba(215,246,249,1) 100%)",
                                                                },
                                                                '& .MuiSlider-thumb': {
                                                                    height:'50px',
                                                                    background:'transparent',
                                                                    border:'2px solid white'
                                                                },
                                                            }}
                                                            onChange={(event, newValue) => {
                                                                setWhiteKelvin(newValue);
                                                                debouncedKelvin(newValue);
                                                            }}
                                                            value={whiteKelvin}
                                                            step={100}
                                                            min={2200}
                                                            max={6500}/>
                                                </Grid>
                                                    <Grid xs={12} sm={8} md={6} lg={6} xl={6} pt={3}  container alignItems={'center'}>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1}>
                                                            <Icon path={mdiThermometer} size={1.3} />
                                                        </Grid>
                                                        <Grid xs={11} sm={11} md={11} lg={11} xl={11} pl={3}>
                                                            <Input value={whiteKelvin}
                                                                   startDecorator={'~'}
                                                                   type={'number'}
                                                                   endDecorator={'K'}
                                                                   slotProps={{
                                                                       input: {
                                                                           min:2200,
                                                                           max:6500,
                                                                           step:100
                                                                       },
                                                                   }}
                                                                   onChange={(event) => {
                                                                       let num = event.target.value;
                                                                       if(num > 1000) {
                                                                           num = Math.ceil(num / 100) * 100;
                                                                           if(num > 6500) num = 6500;
                                                                           if (num < 2200) num = 2200;
                                                                       }
                                                                       setWhiteKelvin(num);
                                                                       debouncedKelvin(num);
                                                                   }}
                                                                   sx={{
                                                                       backgroundColor:'transparent',
                                                                       color:'white !important',
                                                                       outline:'1px solid var(--joy-palette-neutral-outlinedBorder)'
                                                                   }}
                                                                   variant="outlined"
                                                                   size="lg"/>
                                                        </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel value={1} sx={{paddingTop:'0'}}>
                                            <Grid height={'75vh'} xs={12} sm={12} md={12} lg={12} xl={12}>
                                                {selectedMode != undefined?
                                                <Grid sx={{position:'fixed', zIndex:999, bottom:0, background:'#0f171f' }} pb={2} xs={8} sm={8} lg={9} md={9} xl={9} container>
                                                    {selectedMode?.brightnessChange?
                                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} container>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container alignItems={'center'} justifyContent={'center'}>
                                                            <Icon path={mdiWhiteBalanceSunny} size={0.8} />
                                                        </Grid>
                                                        <Grid xs={10} sm={10} md={10} lg={10} xl={10} pl={2} pr={2} container
                                                              sx={{ background: "linear-gradient(90deg, rgba(2,165,220,1) 0%, rgba(113,224,251,1) 100%);",
                                                                  height:'20px', borderRadius:'1em'}}>
                                                            <Slider size="lg"
                                                                    sx={{
                                                                        '& .MuiSlider-track': {
                                                                            background:'transparent',
                                                                        },
                                                                        '& .MuiSlider-rail': {
                                                                            height:'20px',
                                                                            background: "transparent",
                                                                        },
                                                                        '& .MuiSlider-thumb': {
                                                                            height:'20px',
                                                                            background:'transparent',
                                                                            border:'2px solid white'
                                                                        },
                                                                    }}
                                                                    onChange={(event, newValue) => {
                                                                        setModeBrightness(newValue);
                                                                        debouncedModeBrightness(newValue);
                                                                    }}
                                                                    value={modeBrightness}
                                                                    step={1}
                                                                    min={0}
                                                                    max={100}/>
                                                        </Grid>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container justifyContent={'center'} alignItems={'center'}>
                                                            <Icon path={mdiWhiteBalanceSunny} size={1} />
                                                        </Grid>
                                                    </Grid>
                                                    : null}
                                                    {selectedMode?.speedChange?
                                                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} pt={3} container>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container alignItems={'center'} justifyContent={'center'}>
                                                            <Icon path={mdiTortoise} size={1} />
                                                        </Grid>
                                                        <Grid xs={10} sm={10} md={10} lg={10} xl={10} pl={2} pr={2} container
                                                              sx={{ background: "linear-gradient(90deg, rgba(2,165,220,1) 0%, rgba(113,224,251,1) 100%);",
                                                                  height:'20px', borderRadius:'1em'}}>
                                                            <Slider size="lg"
                                                                    sx={{
                                                                        '& .MuiSlider-track': {
                                                                            background:'transparent',
                                                                        },
                                                                        '& .MuiSlider-rail': {
                                                                            height:'20px',
                                                                            background: "transparent",
                                                                        },
                                                                        '& .MuiSlider-thumb': {
                                                                            height:'20px',
                                                                            background:'transparent',
                                                                            border:'2px solid white'
                                                                        },
                                                                    }}
                                                                    onChange={(event, newValue) => {
                                                                        setModeSpeed(newValue);
                                                                        debouncedSpeed(newValue);
                                                                    }}
                                                                    value={modeSpeed}
                                                                    step={1}
                                                                    min={0}
                                                                    max={100}/>
                                                        </Grid>
                                                        <Grid xs={1} sm={1} md={1} lg={1} xl={1} container justifyContent={'center'} alignItems={'center'}>
                                                            <Icon path={mdiRabbit} size={1} />
                                                        </Grid>
                                                    </Grid>
                                                        : null}
                                                </Grid> : null}

                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pb={4} pl={1}>
                                                    <Typography level={'h3'}>Basic</Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container rowGap={3}>
                                                    {availableModes.filter(mode => mode.category == ModeCategory.BASIC).map((basic) => {
                                                        return  <Grid container xs={6} sm={4} md={3} lg={3} xl={3} key={basic.id}>
                                                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} container  justifyContent={'center'} pb={2}>
                                                                            <Avatar
                                                                                onClick={() => setSelectedMode(basic)}
                                                                                className={'clickable'} size="lg" src={"src/assets/icons/modes/" + basic.name + ".png"} />
                                                                        </Grid>
                                                                        <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                                            {basic.name}
                                                                        </Grid>
                                                            </Grid>
                                                    })}
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pb={4} pt={8}  pl={1}>
                                                    <Typography level={'h3'}>Functional</Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container rowGap={3} >
                                                    {availableModes.filter(mode => mode.category == ModeCategory.FUNCTIONAL).map((basic) => {
                                                        return  <Grid container xs={6} sm={4} md={3} lg={3} xl={3} key={basic.id}>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container  justifyContent={'center'} pb={2}>
                                                                <Avatar
                                                                    onClick={() => setSelectedMode(basic)}
                                                                    className={'clickable'} size="lg" src={"src/assets/icons/modes/" + basic.name + ".png"} />
                                                            </Grid>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                                {basic.name}
                                                            </Grid>
                                                        </Grid>
                                                    })}
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pb={4} pt={8}  pl={1}>
                                                    <Typography level={'h3'}>White</Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container rowGap={3} >
                                                    {availableModes.filter(mode => mode.category == ModeCategory.WHITE).map((basic) => {
                                                        return  <Grid container xs={6} sm={4} md={3} lg={3} xl={3} key={basic.id}>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container  justifyContent={'center'} pb={2}>
                                                                <Avatar
                                                                    onClick={() => setSelectedMode(basic)}
                                                                    className={'clickable'} size="lg" src={"src/assets/icons/modes/" + basic.name + ".png"} />
                                                            </Grid>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                                {basic.name}
                                                            </Grid>
                                                        </Grid>
                                                    })}
                                                </Grid>

                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pb={4} pt={8}  pl={1}>
                                                    <Typography level={'h3'}>Color</Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container rowGap={3} >
                                                    {availableModes.filter(mode => mode.category == ModeCategory.COLOR).map((basic) => {
                                                        return  <Grid container xs={6} sm={4} md={3} lg={3} xl={3} key={basic.id}>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container  justifyContent={'center'} pb={2}>
                                                                <Avatar
                                                                    onClick={() => setSelectedMode(basic)}
                                                                    className={'clickable'} size="lg" src={"src/assets/icons/modes/" + basic.name + ".png"} />
                                                            </Grid>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                                {basic.name}
                                                            </Grid>
                                                        </Grid>
                                                    })}
                                                </Grid>

                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} pb={4} pt={8} pl={1}>
                                                    <Typography level={'h3'}>Progressive</Typography>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={12} lg={12} xl={12} container rowGap={3}  pb={15}>
                                                    {availableModes.filter(mode => mode.category == ModeCategory.PROGRESSIVE).map((basic) => {
                                                        return  <Grid container xs={6} sm={4} md={3} lg={3} xl={3} key={basic.id}>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container  justifyContent={'center'} pb={2}>
                                                                <Avatar
                                                                    onClick={() => setSelectedMode(basic)}
                                                                    className={'clickable'} size="lg" src={"src/assets/icons/modes/" + basic.name + ".png"} />
                                                            </Grid>
                                                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} container justifyContent={'center'}>
                                                                {basic.name}
                                                            </Grid>
                                                        </Grid>
                                                    })}
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                    </Tabs>
                                </Grid>
                            </DialogContent>
                        </ModalDialog>
                    </Modal>
                    )}
            </Transition>
        </>
    );
}