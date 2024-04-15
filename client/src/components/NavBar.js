import {NavLink} from 'react-router-dom';

function NavBar(){
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to= "/add_run">Add Run</NavLink>
            
        </nav>
    )
}

export default NavBar;