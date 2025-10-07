import { Typography ,IconButton, Button,Box} from "@mui/material";
import CreatePage from "./CreatePage";
import EditPage from './EditPage';
import {DataGrid} from '@mui/x-data-grid';
import { useEffect,useState } from "react"
import {Edit,DeleteOutline} from '@mui/icons-material'
import axios from 'axios';
import ToastMessage from './../Toasts/ToastMessage';
import Loading from "../LoadingComponent/Loading";

const DisplayPage = ()=>{
  const [data,setData] = useState([]);
  const [edit_id,getEditId]=useState('');
  const [flag,setFlag]= useState(false);
  const [status,setStatus]= useState('');
  const [msg,setMsg] = useState('');
  const [loading,setLoading] = useState(false);
  const [page,setPage] = useState('display');


async function getData(){
  setLoading(true);
  const op = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/company_details`);
   if(op.data.length>0){
      setLoading(false);
      setData(op.data)
   }
   else{
    setLoading(false);
   }
  }

  useEffect(()=>{
   try{
   getData();
   }
 catch(err)
  { }
  },[])

  useEffect(()=>{
try{
  async function fetchData(){
    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_entire_data?id=${edit_id}`);
    console.log(data.data[0]);

  }
  if(edit_id!= '' && edit_id != 'undefined')
    fetchData();
}
catch(err){

}
  },[edit_id])

  let  columns = [
    {field:"id",headerName:'S.No',width:30},
    {field:'name',headerName:"Company Name", width:100},
    {field:'about',headerName:"About the Company", width:100},
    {field:"edit",headerName:'Edit Details',width:50,
      renderCell:(params)=>(<IconButton><Edit onClick={()=>{
        getEditId(params.id);
        setPage('editpage');
      }}/></IconButton>)},
    {field:"delete",headerName:"Delete",width:30,renderCell:(params)=>(<IconButton><DeleteOutline onClick={async()=>{
      try{
        setLoading(true);
  const del_data = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_company_det?id=${params.id}`);

  if(del_data.data?.msg != undefined)
       {   
        await getData();
        setFlag(true);
        setStatus('success');
        setMsg('Details deleted successfully!!')
      }
  else{
        setLoading(false);
      }
      }
      catch(err){
         setLoading(false);
      }
    }}/></IconButton>)}]


    return (<>
     {loading === true ? <Loading/> : <>
      {page=='display' && <>
    <Box sx={{display:"flex",alignItems:"center",width:"100%"}}>
    <Typography sx={{flex:6}}>Company Details</Typography>
    <Button sx={{textTransform:"none",flex:6,'&:hover':{backgroundColor:"transparent"}}} disableRipple
    onClick={()=>setPage('createpage')}>Create New Entry</Button>
    </Box>
    <DataGrid rows={data} columns={columns} disableColumnMenu />
    </>}
    {page=='createpage' &&  <CreatePage/>}
    {page=='editpage' && <EditPage/>}  
      </>}

      {flag === true && <ToastMessage status={status} message={msg}/>}
    </>)
}

export default DisplayPage;