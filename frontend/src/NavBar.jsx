import {AppBar,Toolbar,IconButton,Stack,Button,Typography} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'

export const NavBar = () => {
    const navigate = useNavigate();
    return (
        <AppBar position = 'static' style={{'margin-bottom':'10px'}}>
            <Toolbar>
                <Typography variant='h6' component='div' sx = {{flexGrow:1}}>{localStorage.getItem('username')}</Typography>
                    
            
            <Stack direction='row' spacing={2}>
                <Button color='inherit' onClick={() => {navigate('/form')}}>Submit Paper</Button>
                <Button color='inherit' onClick={() => {localStorage.removeItem('token');localStorage.removeItem('username');navigate('/login')}}>Logout</Button>
                
            </Stack>
            </Toolbar>
        </AppBar>
    )

}