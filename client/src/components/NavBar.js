import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';


function NavBar({user, logOutUser}) {
    

    return (
        <nav className='navbar'>
            <NavLink to="/">Home</NavLink>
            {user && user.type === 'admin' && <NavLink to="/add_run">Add Run</NavLink>}
            {user && <NavLink to ="/add_signup">Add Signup</NavLink>}
            {!user && <NavLink to="/register">Signup</NavLink>}
            {user && <NavLink to="/signups_list">View Signups List</NavLink>}
            {user && <NavLink onClick={logOutUser} to="/login">Log Out</NavLink>}
            {!user && <NavLink to="/login">Login</NavLink>}
            
        </nav>
    );
}

export default NavBar;
