import { Drawer,Button, Grid, Center,Text, Flex,CloseButton } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function cartDrawer(){
    
    function getUserCart(){
        const [cart,setCart]=useState([])
        var email = Cookies.get('authEmail');
            axios.post('http://localhost:8081/getCart',{email:email}).then((response)=>{
            var data = response.data
            setCart(data)
        })
        return cart
    }



    function delCart(uid) {
        axios.post('http://localhost:8081/removeCart', { unique_id:uid })
            .then(() => {
                console.log(uid);
            })
            .catch(err => console.log(err));
    }




    
    function getDB(){
        const[values,setValues]=useState([]);
    
            axios.get('http://localhost:8081/things',{
                timeout : 10000
            })
            .then(response => {
                const data = response.data;
                const valuesArray = data.map(item=>({
                    id:item.id,
                    name:item.name,
                    price:item.price,
                    img: item.img
                }))
                setValues(valuesArray);
            })
            .catch(error=>{
                console.error(error);
            });  
    
        return values
    }
    var arr = getDB()
    var cart = getUserCart()
    var cart = cart.map(item=>
        {
        const product = arr[item.product_id-1];
        if(product){
            return({
                uid: item.unique_id,
                name: product.name,
                img: product.img,
                price:product.price
            })

        }

    })
    var result = cart.map(item=>{return(
    <Center><Flex direction="row" gap="md" mt="sm">
        <img src={item.img} width={50} height={50}/>
        <div>{item.name}</div>
        <div>{item.price}$</div>
        <CloseButton size="xl" onClick={()=>{delCart(item.uid)}} />
    </Flex>
    </Center>)}

    )
    return(result)
}
function Cart(){
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
        <Drawer offset={8} radius="md" opened={opened} onClose={close} title="Корзина" position="right">
            <Flex direction="column">{cartDrawer()}</Flex>
        </Drawer>
        <Link onClick={open}>Cart</Link>
      </>);
}
export default Cart