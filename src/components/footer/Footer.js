import React  from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Footer = () => {
    return (
        <footer id="main-footer">
            {/* {(new Date().getFullYear())} © AYSONLINE. All Rights Reserved. Crafted with { <FavoriteBorderIcon /> } By <a href="#"> <strong></strong> </a> */}
            {(new Date().getFullYear())} © AYSONLINE. All Rights Reserved
        </footer>
    )
};

export default  Footer;