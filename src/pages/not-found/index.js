import React  from 'react';
import Button from '@material-ui/core/Button';
import { APP_ROUTES } from '../../config';


const NotFound = ({history}) =>  {

    return (
        <div id="page-404">
            <img id="logo" src={`${process.env.PUBLIC_URL}/img/AysLogo.png`} alt="logo" /> 

            <div className="not-found-inner">
                <span>404</span>
                <p>Are you lost !</p>
                <Button variant="outlined" onClick={()=> history.push(APP_ROUTES.MY_PRODUCTS)}>
                    Home Page
                </Button>
            </div>

        </div>
    ); 
}

 
export default  NotFound;
