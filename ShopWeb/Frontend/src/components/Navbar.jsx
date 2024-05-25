import { Center, Flex, Grid, Popover } from '@mantine/core';
import './Navbar.css'
import {Link } from "react-router-dom";
import Login from './Login';
import Cart from './Cart';
import Cookies from 'js-cookie';
function Navbar(){
    if(Cookies.get("isAuth")=="1"){
        return (<>

            <Center >
                <Flex className='nav' gap={10}>
                    <Link to="/">ShopWEB</Link>
                    <Link to="/shop">Товары</Link>
                    <div><Login/></div>
                    <div><Cart/></div>
                </Flex>
            </Center>
            </>);
    }
    else{
        return(<>
            <Center >
                <Flex className='nav' gap={10}>
                    <Link to="/">ShopWEB</Link>
                    <div><Login/></div>
                </Flex>
            </Center>
        </>)
    }
}
export default Navbar;