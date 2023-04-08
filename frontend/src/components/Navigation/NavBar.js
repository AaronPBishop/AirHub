import Logo from "./Logo.js";
import SearchBar from "./SearchBar.js";
import UserIcon from "./UserIcon.js";

const NavBar = () => {
    return (
        <div 
        className={`
            flex justify-evenly bg-amber-600 h-20 py-4 border-b-4 border-amber-700
        `}>
            <Logo />
            <SearchBar />
            <UserIcon />
        </div>
    );
};

export default NavBar;