import {Box,Typography,TextField,Button} from '@mui/material';
const EditPage =()=>{
   
    return(<>

   <Box sx={{width:"70%",margin:"10vw auto",border:"1px solid green",borderRadius:"5px"}}>
        <Typography>Create New record</Typography>
        <form>
<label htmlFor="company_name"> Company Name</label>
<TextField variant='outlined' type='text' id = 'company_name' />
<label htmlFor="about"> About the Company.</label>
<TextField variant='outlined' type='text' id = 'about' />
<label htmlFor="yof">Founded Year</label>
<TextField variant='outlined' type='text' id = 'yof' />
<label htmlFor="emp_count"> Employee Count</label>
<TextField variant='outlined' type='text' id = 'emp_count' />
<label htmlFor="comp_type"> Product/Service Based</label>
<TextField variant='outlined' type='text' id = 'comp_type' />
<label htmlFor="revenue"> Total revenue</label>
<TextField variant='outlined' type='text' id = 'revenue' />
<label htmlFor="logo">Company Logo.</label>
<TextField variant='outlined' type='file' id = 'logo' />
<label htmlFor="loc"> Location</label>
<TextField variant='outlined' type='text' id = 'loc' />
<label htmlFor="street">Street</label>
<TextField variant='outlined' type='text' id = 'street' />
<label htmlFor="zip">Zip</label>
<TextField variant='outlined' type='text' id = 'zip' />
<Button type='submit'>Modify</Button>
        </form>
        </Box>
    </>)
}

export default EditPage;