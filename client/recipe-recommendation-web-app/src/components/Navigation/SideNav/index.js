import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import {FaHome} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";

function HorizontalSideNav ({loggedIn}) {
    return (
        <SideNav
            style={{ background: '#862B0D', position: 'fixed', top: 0, bottom: 0, left: 0, width: '65px' }}
            onSelect={(selectedItem) => {
                    console.log(selectedItem);
                }
            }
        >
            <SideNav.Toggle/>
            <SideNav.Nav defaultSelected="home">
                {loggedIn &&
                    <NavItem eventKey="profile">
                        <NavIcon><CgProfile style={{fontSize: "1.5rem"}}/></NavIcon>
                        <NavText>Profile</NavText>
                    </NavItem>
                }
                <NavItem eventKey="home">
                    <NavIcon><FaHome style={{fontSize: "1.5rem"}} /></NavIcon>
                    <NavText>Home</NavText>
                </NavItem>

            </SideNav.Nav>
        </SideNav>
    )
}

export default HorizontalSideNav;