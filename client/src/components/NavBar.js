import {NavLink} from 'react-router-dom';

function NavBar(){
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to= "/add_run">Add Run</NavLink>
            <NavLink to= "/add_signup">Signup</NavLink>
            <NavLink to= "/signups_list">View Signups List</NavLink>
           
            
            
        </nav>
    )
}

export default NavBar;