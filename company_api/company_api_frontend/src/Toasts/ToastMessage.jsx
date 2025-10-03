import { Box, Typography } from "@mui/material";

const ToastMessage=(props)=>{
    return(<>
    {props.status =='success' && <>
   <Box sx={{backgroundColor:'seagreen',color:'whitesmoke',width:"100%"}}>
   <Typography>{props.message}</Typography>
   </Box>
    </>}
    {props.status =='error' && <>
    <Box sx={{backgroundColor:'red',color:'whitesmoke'}}>
   <Typography>{props.message}</Typography>
   </Box>
    </>}
    </>)

}

export default ToastMessage;