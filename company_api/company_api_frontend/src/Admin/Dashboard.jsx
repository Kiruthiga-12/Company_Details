import {Box,Button } from "@mui/material";
import { useState } from "react";
import DisplayPage from "./DisplayPage";
import { useNavigate } from "react-router-dom";
const Dashboard =()=>{
      const nav = useNavigate();
      const [page,setPage] = useState('dashboard')
    return(<>

    <Box sx={{width:"98%",margin:"8vw auto",display:"flex",justifyContent:"space-between"}}>
<Box sx={{flex:2}}>
        <Button  sx={{textTransform:"none",display:"block"}} variant="contained" disableRipple fullWidth
        onClick={()=>setPage('dashboard')}>Dashboard</Button>
   <Button  sx={{textTransform:"none",display:"block",marginTop:"1vw"}} variant="contained" disableRipple fullWidth>Edit Profile</Button>
<Button  sx={{textTransform:"none",marginTop:"1vw",display:"block"}} variant="contained" disableRipple fullWidth 
onClick={()=>{
    localStorage.removeItem('jwt');
nav('/admin');
}}>Logout</Button>
</Box>
{page=='dashboard' && <>
<Box sx={{flex:10,border:"1px solid green",marginLeft:"2vw",padding:"1vw",borderRadius:"5px",overflowX:"hidden",marginBottom:"1vw"}}>
     <DisplayPage />
</Box>
</>}
    </Box>
    </>)
}

export default Dashboard;