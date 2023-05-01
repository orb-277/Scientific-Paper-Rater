import {AppBar,Toolbar,IconButton,Stack,Button,Typography} from '@mui/material'

export const NavBar = () => {
    return (
        <AppBar position = 'static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx = {{flexGrow:1}}>Paper Rater</Typography>
                    
            
            <Stack direction='row' spacing={2}>
                <Button color='inherit'>Submit Paper</Button>
                <Button color='inherit'>Logout</Button>
                <Button color='inherit'>Login</Button>
            </Stack>
            </Toolbar>
        </AppBar>
    )

}