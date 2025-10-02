import { Box ,useTheme} from "@mui/material";
const Loading = ()=>{
    const theme = useTheme();
return(<>
<Box sx={{margin:"20vw auto",width:"3.5vw",height:"3vw",padding:"1vw",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<Box sx={{width:"10%",borderRadius:"5px",border:theme.custom.lightgrey,backgroundColor:theme.custom.lightgrey}} className='loader3'></Box>
<Box sx={{width:"10%",borderRadius:"5px",border:theme.custom.lightgrey,backgroundColor:theme.custom.lightgrey}} className='loader2'></Box>
<Box sx={{width:"10%",borderRadius:"5px",border:theme.custom.lightgrey,backgroundColor:theme.custom.lightgrey}} className='loader1'></Box>
<Box sx={{width:"10%",borderRadius:"5px",border:theme.custom.lightgrey,backgroundColor:theme.custom.lightgrey}} className='loader2'></Box>
<Box sx={{width:"10%",borderRadius:"5px",border:theme.custom.lightgrey,backgroundColor:theme.custom.lightgrey}} className='loader3'></Box>
</Box>
</>)
}
export default Loading;


