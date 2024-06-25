import React from 'react';
import {Link} from "react-router-dom";

const NavItem = ({className, children, text, link}) => {
    return (
        <div className={className}>
            <Link className='flex gap-2.5 text-lg' to={link}>
                {children}
                {text}
            </Link>
            <div></div>
        </div>
    );
};

export default NavItem;