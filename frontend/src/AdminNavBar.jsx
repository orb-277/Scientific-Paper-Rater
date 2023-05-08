import {AppBar,Toolbar,IconButton,Stack,Button,Typography} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'


export const AdminNavBar = () => {
    const navigate = useNavigate();
    
    return (
        // <AppBar position = 'static' >
        //     <Toolbar>
        //         <Typography variant='h6' component='div' sx = {{flexGrow:1}}>Admin</Typography>
                    
            
        //     <Stack direction='row' spacing={2}>
        //         <Button onClick={() => {navigate('/admin/userSearch')}}>Author Search</Button>
        //         <Button onClick={() => {navigate('/admin/PaperSearch')}}>Paper Search</Button>
        //         <Button onClick={() => {localStorage.removeItem('token');localStorage.removeItem('username');navigate('/login')}}>Logout</Button>
                
        //     </Stack>
        //     </Toolbar>
        // </AppBar>
        <nav className="navbar">

        <div className="left">

            <h1 style={{color:'white'}}>Admin</h1>

        </div>

        <div className="right">

            <input type="checkbox" id="check" />

            <label for="check" class="checkBtn">

                <i class="fa fa-bars"></i>

            </label>

            <ul className="list">

                <li><Link to='/admin'>Home</Link></li>

                <li><Link to='/admin/userSearch'>Author Search</Link></li>

                <li><Link to='/admin/paperSearch'>Paper Search</Link></li>

                <li><Link to='/login' onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('username');navigate('/login');}}>Logout</Link></li>

            

            </ul>

        </div>

    </nav>
    )

}