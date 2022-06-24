import * as Yup from 'yup';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useFormik, Form, FormikProvider} from 'formik';
// material
import {
    Link,
    Stack,
    Checkbox,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Typography
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// component
import {useDispatch} from "react-redux";
import Iconify from '../../../components/Iconify';

import usersApi from '../../../api/users';
import { login } from '../../../features/user/userSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);
    const [checkUser, setCheckUser] = useState(false);

    const retrieveUsers = async () => {
        const response = await usersApi.get("/users");
        return response.data;
    };

    useEffect(() => {
        const getAllUsers = async () => {
            const allUsers = await retrieveUsers();
            if (allUsers) {
                setUsers(allUsers);
            }
        };
        getAllUsers();
    }, []);

    const LoginSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        username: Yup.string().required("Username is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: async (user) => {
            let userInfo = users.find((u) => u.username === user.username);

            if (user.username.includes("@")) {
                userInfo = users.find((u) => u.email === user.username);
            }

            if (userInfo && user.password === userInfo.password) {
                navigate('/', {replace: true});
                dispatch(login(userInfo))
                return;
            }
            setCheckUser(true);
        },
    });

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        label="Username"
                        {...getFieldProps('username')}
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                    <FormControlLabel
                        control={<Checkbox {...getFieldProps('remember')} checked={values.remember}/>}
                        label="Remember me"
                    />

                    <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Login
                </LoadingButton>
                {checkUser && (
                    <Typography variant="inherit" color="red">
                        Incorrect username or password
                    </Typography>
                )}
            </Form>
        </FormikProvider>
    );
}
