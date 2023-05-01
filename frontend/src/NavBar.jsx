import {AppBar,Toolbar,IconButton,Stack,Button,Typography} from '@mui/material'

export const NavBar = () => {
    return (
        <AppBar position = 'static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx = {{flexGrow:1}}>Paper Rater</Typography>
                    
            </Toolbar>
            <Stack direction='row' spacing={2}>
                <button>Submit Paper</button>
                <button>Logout</button>
            </Stack>
        </AppBar>
    )

}