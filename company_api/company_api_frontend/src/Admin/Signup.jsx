import {  Typography,Box,  TextField, Link, Button,useTheme ,InputAdornment} from "@mui/material";
import { useEffect, useState } from "react";
import {Controller,useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { schema_signup,schema_signin,schema_otp } from "../Validators/Validators";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Loading from "../LoadingComponent/Loading";
import { useNavigate } from "react-router-dom";


const SignUp =()=>{

const [signstatus,setStatus] = useState('signup');
const[otp_timer,setOtpTimer] = useState(20);
const nav = useNavigate();
const [signuppwd, setSignUpPwd] = useState(false);
const [t_type,setType] = useState('password');
const [signinpwd, setSignInPwd] = useState(false);
const [l_type,setSType] = useState('password');
const [loading,isLoading] = useState(false);
//timer function
function setTimer(){
     
    const id = setInterval(() => {
      setOtpTimer((prevState) => {
        if (prevState > 1) {
                if(prevState > 9)
          return prevState - 1;
        else     if(prevState <= 9)
                 return (`0${prevState-1}`);
        } else {
          clearInterval(id); 
          return '00';
        }
      });
    }, 1000);
}

useEffect(()=>{
if(localStorage.getItem('jwt') != undefined){
        nav('/admin/dashboard')
}
},[])


   useEffect(() => {
  if (signstatus === 'otp')
        setTimer();
  }, [signstatus]);

    
    const theme= useTheme();
    const signupForm = useForm({defaultValues:{email:"",name:'',password:""},resolver: yupResolver(schema_signup),shouldUnregister:true})
    const signInForm = useForm({defaultValues:{login_email:"",login_password:""},resolver: yupResolver(schema_signin),shouldUnregister:true})
    const signotpForm = useForm({defaultValues:{otp_email:"",otp:""},resolver: yupResolver(schema_otp),shouldUnregister:true})

   const signupSubmit = async(e)=>{

    try{
      isLoading(true);
       let id ;
       let result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/count`);

       if(result.data != undefined)
           id = (result.data.count)+1; 
        else
             {
                isLoading(false);
                throw new Error('Please retry!!');

             }   
        
       let newUser = await  axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/signup`,{id:id,email:e.email,name:e.name,password:e.password})
       if(newUser.data!= undefined){
                      alert('Signup successful! Redirecting to login page' );
                      setStatus('signin'); 
                      isLoading(false);     
       }
        
       else{
        isLoading(false);
        throw new Error('Error! Please retry!!')
       }
           
    }
    catch(err){

    }
}

    const signinSubmit =async(e)=>{
        try{
                isLoading(true)
                const verify_user = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`,{email:e.login_email,password:e.login_password});
                if(verify_user.data != undefined){
                        alert('Kindly check your mailbox for OTP Verification!');
                }

                else{
                        isLoading(false)
                        throw new Error('Error Please retry');   
                }

                const get_otp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/sendotp?email=${e.login_email}`)
                if(get_otp.data != undefined){
                 if(get_otp.data.token)
                  {
                        setStatus('otp');
                        localStorage.setItem('jwt_otp_token',get_otp.data.token)
                        isLoading(false);
                  }    

                }
                else{
                         isLoading(false)
                         throw new Error('Error Please retry');
                       
                }
        } 
        catch(err){

        }
    }

    const signotpSubmit= async(e)=>{
     try{
     isLoading(true);
     const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/verifyotp`,{email:e.otp_email,otp:e.otp},{
        headers:{
                'jwt_otp_token': localStorage.getItem('jwt_otp_token')
        }
     });

     if(data.data != undefined){
          localStorage.setItem('jwt',data.data.token);
          localStorage.removeItem('jwt_otp_token')
          alert('login successful, taking you to home page!');
          nav('/admin/dashboard');
     }
     else{
            isLoading(false)
             throw new Error('Error Please retry');   
         }
     }
     catch(err){
   
     }
    }

    return(<>
    {loading ? <Loading/> : <>
    <Box sx={{padding:"4vw 2vw",width:"20%",margin:"7vw auto",borderRadius:"10px",boxShadow:"2px 2px 2px lightgrey,-2px -2px 2px lightgrey"}}>
        
        {signstatus === 'signup' && <>
        <Typography variant='h5' >Sign Up</Typography>
        <Typography  sx={{marginTop:"0.3vw",fontSize:theme.custom.labelFontSize}}>Create an account or <Link sx={{cursor:"pointer"}} onClick={()=>setStatus('signin')}>Sign in</Link></Typography>
        <Box sx={{marginTop:"1.5vw"}}>
        <form  onSubmit={signupForm.handleSubmit(signupSubmit)} >
<label htmlFor="email">Email address</label>
<Controller name='email' control={signupForm.control} render={({field,fieldState})=>(
        <TextField placeholder="example@lorem.com" size='small' variant='outlined' autoComplete='off' type='email' id = 'email' fullWidth {...field} error={!!fieldState.error} helperText={fieldState.error?.message}/>)}/>

<label htmlFor="name"> User name</label>
<Controller name='name' control={signupForm.control} render={({field,fieldState})=>(
        <TextField  placeholder='Kiruthiga' size='small'  variant='outlined' autoComplete='off' type='text' id = 'name' fullWidth {...field} error={!!fieldState.error} helperText={fieldState.error?.message}/>)}/>

<label htmlFor="password"> Password</label>
<Controller control={signupForm.control}  name='password' render={({field,fieldState})=>(
        <TextField  size='small'  variant='outlined' autoComplete="off" type={l_type} id = 'password' fullWidth {...field} error={!!fieldState.error} helperText={fieldState.error?.message}
         InputProps={{endAdornment:<InputAdornment position="end" onClick={()=>{
                setSignUpPwd(!signuppwd);
                if(signuppwd === true)
                        setSType('password')
                else
                        setSType('text')
                }}>
                {signuppwd === true && <VisibilityOutlinedIcon sx={{cursor:"pointer"}}/> }
                 {signuppwd === false && <VisibilityOffOutlinedIcon sx={{cursor:"pointer"}}/> }
                </InputAdornment>}}/>
)}/>

<Button type='submit' sx={{textTransform:"none",marginTop:"1.5vw"}} variant="contained" disableRipple>Sign up</Button>
        </form>
        </Box>
         </>}


               {signstatus === 'signin' && <>
              <Typography variant='h5' >Sign In</Typography>
        <Typography  sx={{marginTop:"0.3vw",fontSize:theme.custom.labelFontSize}}>Login to your account or <Link sx={{cursor:"pointer"}} onClick={()=>setStatus('signup')}>Sign up</Link></Typography>
        <Box sx={{marginTop:"1.5vw"}}>
        <form onSubmit={signInForm.handleSubmit(signinSubmit)}>
<label htmlFor="login_email">Email address</label>
<Controller name='login_email' control={signInForm.control} render={({field,fieldState})=>(
        <TextField  size='small' placeholder="example@lorem.com"  variant='outlined' type='email' id = 'login_email' fullWidth autoComplete="off" {...field} error={!!fieldState.error} helperText={fieldState.error?.message}/>
)}/>

<label htmlFor="login_password"> Password</label>
<Controller name="login_password" control={signInForm.control} render={({field,fieldState})=>(
        <TextField  size='small'  variant='outlined' type={t_type}  id = 'login_password' fullWidth autoComplete="off" {...field} error={!!fieldState.error} helperText={fieldState.error?.message}
        InputProps={{endAdornment:<InputAdornment position="end" onClick={()=>{
                setSignInPwd(!signinpwd);
                if(signinpwd === true)
                        setType('password')
                else
                        setType('text')
                }}>
                {signinpwd === true && <VisibilityOutlinedIcon sx={{cursor:"pointer"}}/> }
                 {signinpwd === false && <VisibilityOffOutlinedIcon sx={{cursor:"pointer"}}/> }
                </InputAdornment>}}/>
)}/>

<Button type='submit' sx={{textTransform:"none",marginTop:"1.5vw"}} variant="contained" disableRipple>Generate OTP</Button>
        </form>
        </Box>
         </>}


             {signstatus === 'otp' && <>
              <Typography variant='h5' >Sign In</Typography>
        <Typography  sx={{marginTop:"0.3vw",fontSize:theme.custom.labelFontSize}}>Login to your account or <Link sx={{cursor:"pointer"}} onClick={()=>setStatus('signup')}>Sign up</Link></Typography>
        <Box sx={{marginTop:"1.5vw"}}>
        <form onSubmit={signotpForm.handleSubmit(signotpSubmit)}>
<label htmlFor="otp_email">Email address</label>
<Controller name='otp_email' control={signotpForm.control} render={({field,fieldState})=>(
        <TextField  size='small' placeholder="example@lorem.com"  variant='outlined' type='email'   id = 'otp_email' fullWidth autoComplete="off" {...field} error={!!fieldState.error} helperText={fieldState.error?.message}/>
)}/>

<label htmlFor="otp">Enter OTP</label>
<Controller name='otp' control={signotpForm.control} render={({field,fieldState})=>(
        <TextField  size='small'  variant='outlined' type='text' id = 'otp' autoComplete='off' fullWidth  {...field} error={!!fieldState.error} helperText={fieldState.error?.message}/>
)}/>

{otp_timer === '00' && <>
<Link  sx={{cursor:"pointer", display:"inline-block",fontSize:theme.custom.labelFontSize,marginTop:"0.9vw" }} onClick={async()=>{
setTimer();
try{
        
                // const get_otp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/sendotp?email=${e.login_email}`)
                // if(get_otp.data != undefined){
                //  if(get_otp.data.token)
                //   {
                //         setStatus('otp');
                //         localStorage.setItem('jwt_otp_token',get_otp.data.token)
                //         isLoading(false);
                //   }    

                // }
                // else{
                //          isLoading(false)
                //          throw new Error('Error Please retry');
                       
                // }
}
catch(err){

}
}}>resend OTP in <span sx={{fontSize:theme.custom.labelFontSize,textDecoration:"none",display:"inline-block",marginLeft:"1vw"}}>00:{otp_timer}</span> </Link>
</>}

{otp_timer !=='00' && <>
<Typography  sx={{color:"#1976d2", display:"inline-block", cursor:'not-allowed',fontSize:theme.custom.labelFontSize,marginTop:"0.9vw" }}>resend OTP in <span sx={{fontSize:theme.custom.labelFontSize,textDecoration:"none",marginLeft:"1vw"}}>00:{otp_timer}</span> </Typography>
        </>}

<Button type='submit' sx={{display:"block",textTransform:"none",marginTop:"1.5vw"}} variant="contained" disableRipple>Login</Button>
        </form>
        </Box>
         </>}
    </Box>
    </>}
    </>)
}

export default SignUp;