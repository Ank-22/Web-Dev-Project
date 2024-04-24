import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import {FaHome} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import {useLocation, useNavigate} from "react-router-dom";
import {MdManageAccounts} from "react-icons/md";
import {FaUser} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import {useEffect, useState} from "react";
import { CgFileAdd } from "react-icons/cg";
import { MdOutlineAddCircleOutline, MdOutlineGroupAdd, MdOutlineGroups  } from "react-icons/md";


function HorizontalSideNav ({loggedIn, role}) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [location, setLocation] = useState("Home");

    useEffect(() => {
        setLocation(pathname.substring(1, pathname.length));
    }, [pathname]);
    return (
        <SideNav
            style={{ background: '#862B0D', position: 'fixed', top: 0, bottom: 0, left: 0, width: '65px' }}
            onSelect={(selectedItem) => {
                navigate(`/${selectedItem}`);
                }
            }
        >
            <SideNav.Toggle/>
            <SideNav.Nav selected={location}>
                {loggedIn &&
                    <NavItem eventKey={"Profile"}>
                        <NavIcon><CgProfile style={{fontSize: "1.5rem"}}/></NavIcon>
                        <NavText>Profile</NavText>
                            <NavItem eventKey={"Profile"}>
                                <NavIcon><FaUser style={{fontSize: "1rem"}}/></NavIcon>
                                <NavText>My Profile</NavText>
                            </NavItem>
                        {role === "admin" &&
                            <NavItem eventKey={"ManageUsers"}>
                                <NavIcon><MdManageAccounts style={{fontSize: "1.5rem"}}/></NavIcon>
                                <NavText>Manage Users</NavText>
                            </NavItem>
                        }

                    </NavItem>
                }
                <NavItem eventKey="Home">
                    <NavIcon><FaHome style={{fontSize: "1.5rem"}} /></NavIcon>
                    <NavText>Home</NavText>
                </NavItem>
                <NavItem eventKey="Search">
                    <NavIcon><FaSearch  style={{fontSize: "1.5rem"}} /></NavIcon>
                    <NavText>Search</NavText>
                </NavItem>


        {loggedIn &&
                    <NavItem eventKey={"Create"}>
                        <NavIcon><MdOutlineAddCircleOutline  style={{fontSize: "1.5rem"}}/></NavIcon>
                        <NavText>Create</NavText>
                        <NavItem eventKey="Recipes/Create">
                            <NavIcon><CgFileAdd   style={{fontSize: "1.5rem"}} /></NavIcon>
                            <NavText>Create Recipe</NavText>
                        </NavItem>
                        {role === "admin" || "chef" &&
                           <NavItem eventKey="groups/Create">
                           <NavIcon><MdOutlineGroupAdd    style={{fontSize: "1.5rem"}} /></NavIcon>
                           <NavText>Create Groups</NavText>
                       </NavItem>
                        }

                    </NavItem>
                }
                {loggedIn && 
                     <NavItem eventKey="Groups">
                     <NavIcon><MdOutlineGroups style={{fontSize: "1.5rem"}} /></NavIcon>
                     <NavText>Groups</NavText>
                 </NavItem>
                }
            </SideNav.Nav>
        </SideNav>
    )
}

export default HorizontalSideNav;