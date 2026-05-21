import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async (event) => {
        event.preventDefault();

        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setPassword("");
                setName("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
            }
        } catch (err) {
            console.log(err);
            let message = err?.response?.data?.message || "Login failed";
            setError(message);
        }
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid className='landingPageContainer' container component="main" sx={{ height: '100vh' }} style={{backgroundColor:"white"}}>
                <CssBaseline />
               
                <Grid 
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                    }}
                >
                <img style={{width:"100%"}} srcSet='/loginimage.png' alt="" />
                <div style={{display:"flex", justifyContent:"center"}}>
                        <Link href='/' style={{color:"white", backgroundColor:"#1dbf00", paddingInline:"1rem", borderRadius:"4px"}}>home</Link> 
                </div>
                </Grid>
                <Grid style={{backgroundColor:"transparent"}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        

                        <div>
                            <Button style={{backgroundColor:"#1dbf00", marginRight:"1rem"}} variant={formState === 0 ? "contained" : "non-contained"} onClick={() => { setFormState(0) }}>
                                Sign In
                            </Button>
                            <Button style={{backgroundColor:"#1dbf00", marginLeft:"1rem"}} variant={formState === 1 ? "contained" : "non-contained"} onClick={() => { setFormState(1) }}>
                                Sign Up
                            </Button>
                        </div>

                        <Box className="authbox" component="form" noValidate sx={{ mt: 1 }} onSubmit={handleAuth}>
                            {formState === 1 ? 
                            
                            <TextField
                                className='authtextfield'
                                margin="normal"
                                required
                                fullWidth
                                label="full Name"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            /> : <></>}

                            <TextField
                                className='authtextfield'
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                className='authtextfield'
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                name="password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                            />
                            <p style={{ color: "#000000" }}>{error}</p>

                            <Button
                                style={{backgroundColor:"#1dbf00"}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={open}
                autoHideDuration={4000}
                message={message}
            />

        </ThemeProvider>
    );
}