import {Component}from 'react';
import ToastMessage from '../Toasts/ToastMessage';
import { Thermostat } from '@mui/icons-material';
import CreatePage from '../Admin/CreatePage';

class ErrorBoundary extends Component{
constructor(props){
    super(props);
    this.state={
        is_Error:false  ,
        err_msg:""
    }
  }
 static getDerivedStateFromError(){
    return{is_Error:true}
  }
 componentDidCatch(err,info){
    if(err){
        this.setState({err_msg : err.message})
    }
  }
  render(){
    return(<>
       {this.state.is_Error == true ?<ToastMessage status='error' message={this.state.err_msg}/> : <>{this.props.children} </> }
    </>)
  }
}

export default ErrorBoundary;