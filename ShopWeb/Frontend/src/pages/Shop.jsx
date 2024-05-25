import axios from "axios";
import { useEffect, useState } from "react";
import "./Shop.css";
import {Button, Center, SimpleGrid, em} from '@mantine/core';
import Cookies from 'js-cookie';

//components
function addToCart(prod){
    axios.post("http://localhost:8081/addCart",{
        email: Cookies.get("authEmail"),
        product: Number(prod)}).then(
        (response)=>{
        console.log(response)
    });
};

function shopthing(){
    const arr = getDB()
    var renderOutput = arr.map(item => 
    <div className="MainElement" key={item.id}>
        <img src={item.img}className="shopElement" width="200" height="200"></img>
        <div className="shopElement">{item.name}</div>
        <Center>
            <div className="shopElement price">{item.price}$</div>
            <Button onClick={()=>addToCart(item.id)}>Buy</Button>
        </Center>
    </div>
    );

    return(    <SimpleGrid cols={arrLength(arr)}>   {renderOutput}    </SimpleGrid>)
}

function arrLength(array){
    if (array.length <3){
        return array.length
    }
    else{return 3}
}

//main
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

function Shop(){
    if( Cookies.get("isAuth") == undefined ){
        window.location.href = '/'
        console.log("cookie does not exist")
    }
    if(Cookies.get("isAuth")=='1'){
        return(<><div>
            <Center className="pagename">Товары</Center>
            <Center> {shopthing()}</Center>
            </div>
            </>)
    }
    
}
export default Shop