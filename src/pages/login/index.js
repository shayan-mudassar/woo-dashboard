import React, {  useState , useEffect } from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {loading , login , storeUserData} from '../../store/actions/';
import { APP_ROUTES } from '../../config';
import Loader from '../../components/loader/loader';
import API from '../../API/';
import { store as notifStore} from 'react-notifications-component';

const Login = ({dispatch, AUTHORIZED , history }) => {
     
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
   
    useEffect(() => {
        if(AUTHORIZED){
            history.push(APP_ROUTES.MY_PRODUCTS);
        }
    }, [AUTHORIZED]);

    const keyPressHandler = (e) => {
        if(e.keyCode === 13)
        submitFormLogin();
    }

    const submitFormLogin = (e) => {
        e.preventDefault();
        dispatch(loading( true, 'login-loader' ));
        let payload = {
            username , password 
        };
        API.LOGIN(payload)
            .then((data)=>{
                API.WP_getProfileInfo(data.token).then((res)=>{
                    let userData = {...data ,  roles : res.roles };
                    if(userData.roles.indexOf('administrator') !== -1 || userData.roles.indexOf('shop_manager') !== -1){
                        localStorage.setItem('woo-app', JSON.stringify(userData));
                        dispatch(login(true));
                        dispatch(storeUserData(res));
                        dispatch(loading( false, 'login-loader' ));
                        history.push(APP_ROUTES.MY_PRODUCTS);
                    }else{
                        // CLEAR THE LOCALSTORAGE
                        localStorage.removeItem('woo-app');
                        // LOGOUT
                        dispatch(login(false));
                        // DISPATCH THE LOGOUT ACTION TO CLEAR THE STORE
                        dispatch({ type : "LOGOUT"});
                        dispatch(loading( false, 'login-loader' )); 
                    }
                })
            })
            .catch((error)=>{
                // dispatch({
                //     type : 'ERROR',
                //     payload : 'Wrong Username or Password'
                // });
                notifStore.addNotification({
                    title: "Error!",
                    message: "Wrong Username or Password",
                    type: "danger",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                });
                // HIDE LOADING
                dispatch(loading( false, 'login-loader' ));
            })
    }

    return (
        <div id="login-page">
            <div id="login-form" elevation={1}>
                <img id="logo" src={`${process.env.PUBLIC_URL}/img/AysLogo.png`} alt="kibo" />
                <Paper id="paper" elevation={1}>
                    <Loader id="login-loader" type="linear"/>
                    <form  className="form" >
                        <TextField
                            label="Username"
                            value={username}
                            onChange    ={(e) => setUsername(e.target.value)}
                            onKeyDown   ={(e) => keyPressHandler(e)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Password"
                            value={password}
                            onChange    ={(e) => setPassword(e.target.value)}
                            onKeyDown   ={(e) => keyPressHandler(e)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            type="password"
                            InputLabelProps={{ shrink: true }}
                        />
                        <div className="action">
                            <Button variant="contained" color="primary" size="large" onClick={ (e) => submitFormLogin(e) } >
                                Sign In
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    );
}

const mapStateToProps = ({ AUTHORIZED }) => ({ AUTHORIZED });

export default  connect(mapStateToProps)(Login); 