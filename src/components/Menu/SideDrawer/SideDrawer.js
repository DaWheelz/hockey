import React from 'react';
import './SideDrawer.css';
import '../Backdrop/Backdrop.css';

const sideDrawer = props => {
let drawerClasses = 'side-drawer';

if(props.show){
    drawerClasses = 'side-drawer open';
}
if(props.hide){
    drawerClasses = 'side-drawer close';
}
    return (
    <nav className={drawerClasses}>
        <ul>
                <a href="/clubs">Clubs</a>
                <a href="/scores">Uitslagen</a>
        </ul>
    </nav>
    );
};

export default sideDrawer;