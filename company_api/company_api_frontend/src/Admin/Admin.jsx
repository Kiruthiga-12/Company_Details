import { AppBar, Toolbar, Typography, Button,useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Admin=()=>{
        const [switch_image,setImage] = useState('../Images/icon-sun.svg');
        const theme = useTheme();
    return(<>
           <AppBar>
            <Toolbar>
                <Typography sx={{cursor:"pointer"}}>Company Details API</Typography>
                <Button sx={{'.MuiButtonBase-root-MuiButton-root':{border:"1px solid green"},marginLeft:"78vw",border:"1px solid green"}}><img sx={{width:"0.5vw",height:"0.5vw"}} src={switch_image} alt='switch icon'/></Button>
            </Toolbar>
        </AppBar>
        <Outlet/>
    </>)
}

export default Admin;