import { Snackbar,IconButton } from "@mui/material";
import { useState } from "react";
import {Clear} from '@mui/icons-material';

const ToastMessage=(props)=>{
    const [status,setStatus]= useState(true)
    return(<>
    {props.status =='success' && <>
    <Snackbar open={status} message={props.message} anchorOrigin={{vertical:'top',horizontal:"center"}}
    sx={{'& .MuiSnackbarContent-root':{backgroundColor:"seagreen",color:"whitesmoke"}}} 
    action={<IconButton><Clear  sx={{color:"whitesmoke"}} onClick={()=>setStatus(false)}/></IconButton>}
    autoHideDuration={4000}    />
    </>}
   
    {props.status == 'error' && <>
   <Snackbar open={status} message={props.message}  anchorOrigin={{vertical:'top',horizontal:"center"}}
    sx={{'& .MuiSnackbarContent-root':{backgroundColor:"#d32f2f",color:"whitesmoke"}}} 
    action={<IconButton><Clear  sx={{color:"whitesmoke"}} onClick={()=>setStatus(false)}/></IconButton>} 
    autoHideDuration={4000}/>
    </>}
    </>)

}

export default ToastMessage;