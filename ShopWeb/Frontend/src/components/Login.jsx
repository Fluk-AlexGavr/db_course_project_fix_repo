import { Popover, TextInput,Text, Button, PasswordInput } from "@mantine/core"
import './Login.css'
import { useState } from "react"
import axios from "axios";
import Cookie from "js-cookie"
import { useToggle } from "@mantine/hooks";
import React from "react";
function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isAuth,setIsAuth]=useState(false);
  const [drop,setDrop]=useState('');

  function HandleReload(){
    window.location.reload();
  }
  function logOut(){
    setIsAuth(false);
    Cookie.remove("isAuth","0",{sameSite: 'Strict',Secure:'true'});
    Cookie.remove("authEmail");
    HandleReload()
  }
  function HandleSubmit(event){

    event.preventDefault();
    axios.post('http://localhost:8081/users',{email,password})
    .then(()=>{
      Cookie.set("isAuth","1",{sameSite: 'Strict',Secure:'true'});
      Cookie.set("authEmail",email);  
      HandleReload();
  })
    .catch(err => console.log(err))
  }
  function AuthCheckDropDown(){
      if(Cookie.get("isAuth")=="1"){
        return(<>
          <div>Welcome!</div>
          <Button mt="xs"onClick={logOut}>Log Out</Button>
        </>)
      }
      else{
        return(<>
          <TextInput label="Email" placeholder="example@mail.com" size="xs" onChange={(event) => setEmail(event.currentTarget.value)}/>
          <PasswordInput label="Password" placeholder="Password" size="xs" mt="xs" onChange={(event) => setPassword(event.currentTarget.value)}/>
          <div><Button mt="xs" onClick={HandleSubmit}>Login</Button></div>
        </>)
      }
  }
    return(<>
    <Popover width={200} position="bottom" withArrow shadow="md" >
      <Popover.Target>
        <div>Войти</div>
      </Popover.Target>
      <Popover.Dropdown>
      {AuthCheckDropDown()}
      </Popover.Dropdown>
    </Popover>
    </>)
}
export default Login