import   * as yup from 'yup';

const schema_signup = yup.object({
email: yup.string().email('Enter valid Email Id').required('Email is required!!'),
name:yup.string().required('Name is required').matches(/^[a-zA-Z]{3,}(?:\s*[a-zA-Z]*)?[a-zA-Z]$/,"Name should contain only alphabets"),
password:yup.string().required('password is required!!').min(8,"Minium 8 characters required").max(12,"maxium 12 characters")
})

const schema_signin = yup.object({
login_email: yup.string().email('Enter valid Email Id').required('Email is required!!'),
login_password:yup.string().required('password is required!!').min(8,"Minimum 8 characters required").max(12,"maximum 12 characters")
})

const schema_otp= yup.object({
otp_email: yup.string().email('Enter valid Email Id').required('Email is required!!'),
otp: yup.string().required('Otp field is required').min(4,'OTP must be atleast 4 characters in length').max(4,'More than 4 characters are not allowed').matches(/^[0-9]{4}$/,'Only numbers are allowed')
})
// matches(/[]/,'Password should contain atleat one capital letter , one number and one special charcater')



const schema_create_company = yup.object({
    company_name: yup.string().required('Company name is required').min(2,'Minimum 2 characters are required').max(20,'Maximum length is 20 '),
    about_company: yup.string().required('Description is required').min(2,'Minimum 2 characters are required').max(40,'Maximum length is 40 '),
    yof : yup.string().required('Year of Founded is required').matches(/^[0-9]{4}$/,'Founded Year should contain only number').min(4,'Year should have 4 digts').max(4,'Mor ethan 4 digits is not allowed').test('Year validation','Cannot be future year',(value)=> value <= (new Date().getFullYear())),
    emp_count : yup.number().required('Employee Count is required').positive('Should contain only positive value'),
    comp_type: yup.string().required('Company type is required').test('comp_type','Select a valid value',(value)=>value  != 'Select a value'),
    revenue: yup.number().required('Total Revenue is required').positive('Should contain only positive value'),
    company_logo: yup.mixed().test('File_Check','Company Logo is required',(value)=>value && value.length >0).test('File Type','Only .jpg, .png or .jpeg files are allowed',(value)=> value && ['image/png','image/jpg','image/jpeg'].includes(value[0]?.type?.toLowerCase()))
                  .test('file size','max file shouldnt exceed 2MB',(value)=>value && value[0]?.size <= 2*1024*1204),
    // address: yup.array().of(
    //     yup.object({loc: yup.string().required('Location is required'),
    // street: yup.string().required('Street name is required'),
    // zipcode: yup.number().required('Pincode is required').min(6,'Minimum length is 6 characters').max(6,'Maximum length shouldn\'t exceed 6 characters')})
    // )
}) ;
export {schema_signup,schema_signin,schema_otp,schema_create_company};