import * as Yup from 'yup';
import {useState} from 'react';
import {useFormik, Form, FormikProvider} from 'formik';
import {useNavigate} from 'react-router-dom';
// material
import {Stack, TextField, IconButton, InputAdornment, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';

import usersApi from '../../../api/users';

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const retrieveUsers = async () => {
        const response = await usersApi.get("/users");
        return response.data;
    };

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
        lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
        mobile: Yup.string()
            .min(10, "Contact number must be 10 digit")
            .max(10, "Contact number must be 10 digit").notRequired(),
        username: Yup.string().required("Username is required"),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobile: '',
            username: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (formUser) => {
            const users = await retrieveUsers();

            const userExists = users.find((user) => user.username === formUser.username);

            if (!userExists) {
                const id = users[users.length - 1].id + 1;
                const name = `${formUser.firstName} ${formUser.lastName}`;
                const newUser = {id, ...formUser, name, ...{firstName: undefined, lastName: undefined}};
                await usersApi.post("/users", newUser);
                setUserExists(false);
                setSignupSuccess(true);
                navigate('/login', {replace: true});
            } else {
                setUserExists(true);
            }
        },
    });

    const {errors, touched, handleSubmit, isSubmitting, getFieldProps} = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                        <TextField
                            fullWidth
                            label="First name"
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />

                        <TextField
                            fullWidth
                            label="Last name"
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Stack>

                    <TextField
                        fullWidth
                        autoComplete="email"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Mobile number"
                        {...getFieldProps('mobile')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                        }}
                        error={Boolean(touched.mobile && errors.mobile)}
                        helperText={touched.mobile && errors.mobile}
                    />

                    <TextField
                        fullWidth
                        label="Username"
                        {...getFieldProps('username')}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                    />
                    {userExists && (
                        <Typography variant="inherit" color="red">
                            User already exists with this username
                        </Typography>
                    )}

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />

                    <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                        Register
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
}
