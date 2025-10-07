import {Box,Typography,TextField,Button, TableContainer, Table, TableBody, TableRow, TableCell, MenuItem} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import CloudUploadSharpIcon from '@mui/icons-material/CloudUploadSharp';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema_create_company} from '../Validators/Validators';
import  axios from 'axios';
import {useState} from 'react';
import Loading from '../LoadingComponent/Loading';
import  ToastMessage from '../Toasts/ToastMessage';
const CreatePage =()=>{
    const [state,isLoading] = useState(false);
    const {control,handleSubmit,register,formState:{errors},watch} = useForm({defaultValues:{
    company_name:'',
    about_company:'',
    yof:2025,
    emp_count:0,
    comp_type:"Select a value",
    revenue: 100,
    company_logo:'',
    address:[{
        loc:"Select location",
        street:"",
        zipcode:""
    }]
   },resolver:yupResolver(schema_create_company),shouldUnregister:true});

const options = [ 'Product based','Service based','Sass','Select a value'];
const locations = ['Chennai','Mumbai','Hyderabad','Bangalore','Kochi','Delhi','Jaipur','Select location'];
const file = watch('company_logo');
const [flag, setFlag]=useState(false);
const [status,setStatus] = useState('');
const [msg,setMessage] = useState('');

   const onSubmit=async(e)=>{
    
try{
    isLoading(true);
    const c_count = await  axios.get(`${process.env.REACT_APP_BACKEND_URL}/company/count`);
    if(c_count != undefined){
    const id = Number(c_count.data.count) +1;
    if(id !=0){
        const formData = new FormData();
    formData.append('id',id);
    formData.append('company_name',e.company_name)
    formData.append('about_company',e.about_company)
    formData.append('founded_year',e.yof)
    formData.append('emp_count',e.emp_count)
    formData.append('company_type',e.comp_type)
    formData.append('revenue',e.revenue)
    formData.append('company_logo',e.company_logo[0])
 const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/add_company`,formData,{
 headers:{
    'Content-type':'multipart/formdata'
    }
  }) 

  if(data != undefined)
     { 
        setStatus('success');
        setMessage('Company Details added Successfully!!');
        setFlag(true)
     }
  else 
  {
    console.lo('block1')
     isLoading(false);
     throw new Error('Error while adding!!')
  }
    }
else{
    console.lo('block2')
  isLoading(false);
        throw new Error('please try again')   
}
    }
    else{
        console.lo('block3')
        isLoading(false);
        throw new Error('please try again')
    } 
}
catch(err){
    console.log('block4')
    isLoading(false);
    console.log(err)
    }
   }
    return(<>
{state === true ? <Loading/> : <>
   <Box sx={{width:"100%",margin:"0.5vw 0vw 2vw"}}>
        <Typography>Create New record</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
<TableContainer sx={{width:"50%",marginTop:"1vw"}}>
    <Table>
        <TableBody>
            <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label htmlFor="company_name" className='label1'> Company Name: </label>
                </TableCell>
                <TableCell  sx={{'&.MuiTableCell-root':{border:'none'}}}>
                <Controller name ='company_name' control={control} render={({field,fieldState})=>(
                <TextField autoComplete='Off' variant='standard' {...field} type='text' id = 'company_name' error={!!fieldState.error} helperText={fieldState.error?.message}  />
                )}/>
                
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label htmlFor="about_company" className='label1'> About the Company:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <Controller name='about_company' control={control} render={({field,fieldState})=>(
                        <TextField  autoComplete='Off' variant='standard' type='text' id = 'about_company' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message}/>
                    )}/>
                
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label htmlFor="yof" className='label1'>Founded Year:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <Controller name='yof' control={control} render={({field,fieldState})=>(
                        <TextField autoComplete='Off' variant='standard' type='text' id = 'yof' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message}/>
                    )}/>
                
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label htmlFor="emp_count" className='label1'> Employee Count:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                        <Controller name ='emp_count' control={control} render={({field,fieldState})=>(
                            <TextField autoComplete='Off' variant='standard' type='text' id = 'emp_count' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message} />
                        )}/>
                
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label htmlFor="comp_type" className='label1'> Company Type:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                        <Controller name='comp_type' control={control} render={({field,fieldState})=>(
                            <TextField  select  variant='standard' type='text' id = 'comp_type' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message}>
                            {options && options.map((li)=><MenuItem key={li} value={li}>{li}</MenuItem>)}
                            </TextField>
                        )}/>
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label htmlFor="revenue" className='label1'> Total revenue:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                <Controller name='revenue' control={control} render={({field,fieldState})=>(
                    <TextField autoComplete='Off' variant='standard' type='text' id = 'revenue' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message} />
                )}/>
                
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    <label className='label1'>Company Logo:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                    
                <input type='file' id='company_logo_upload' style={{display:"none"}} accept='.png,.jpg,.jpeg'
                {...register('company_logo')} />
                <label htmlFor='company_logo_upload'>
                <Button disableRipple component='span' sx={{textTransform:"none"}} startIcon={<CloudUploadSharpIcon/>}>Upload file</Button>
                {file && <p style={{display:'inline-block',color:'grey',fontSize:"11px"}}>{file[0]?.name}</p>}
                </label>
                
                </TableCell>
                </TableRow>

                <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                <label htmlFor="loc" className='label1'> Location:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                        <Controller name='loc' control={control} render={({field,fieldState})=>(
                            <TextField autoComplete='Off' select variant='standard' type='text' id = 'loc' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message} >
                            {locations && locations.map((li)=><MenuItem key={li} value={li}>{li}</MenuItem>)}
                            </TextField>
                        )}/>
                </TableCell>
                </TableRow>

                {/* <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                <label htmlFor="street" className='label1'>Street:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                        <Controller name='street' control={control} render={({field,fieldState})=>(
                            <TextField autoComplete='Off' variant='standard' type='text' id = 'street' {...field} error={!!fieldState.error} helperText ={fieldState.error?.message} />
                        )}/>
                </TableCell>
                </TableRow> */}

                {/* <TableRow>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                <label htmlFor="zipcode" className='label1'>Zip:</label>
                </TableCell>
                <TableCell sx={{'&.MuiTableCell-root':{border:'none'}}}>
                        <Controller name='zipcode' control={control} render={({field,fieldState})=>(
                            <TextField autocomplete='Off' variant='standard' type='text' id = 'zipcode'  {...field} error={!!fieldState.error} helperText ={fieldState.error?.message}/>
                        )}/>
                </TableCell>
                </TableRow>  */}


        </TableBody>
    </Table>
</TableContainer>

{errors.company_logo && <p style={{    color: '#d32f2f',fontFamily: 'Ubuntu',fontWeight: '400',fontSize: '0.75rem',
lineHeight:'1.66',textAlign: 'left',marginTop: '3px',marginRight: '0',marginBottom: '0',marginLeft: '16vw'}}>
{errors.company_logo?.message}</p>}
<Button type='submit' sx={{textTransform:"none",marginTop:"1.5vw"}} variant="contained" disableRipple>Create</Button>
        </form>
        </Box>
        </>}
            {flag == true && <ToastMessage  status={status} message = {msg}/>}
    </>)
}

export default CreatePage;