import * as React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {LoginAuthFunc} from "@/store/reducers/LoginAuth";
import {useAppDispatch} from "@/store";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Link from "next/link";
import {RegisterUserFunc} from "@/store/reducers/Signup";
export default function Register() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const validationSchema = yup.object({
        name: yup.string().min(3).required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleSubmit = (values, { setSubmitting }) => {
        // Handle register logic here
       dispatch(RegisterUserFunc({SignupDetail: values,router}))
        setSubmitting(false);
    };
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={10} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Sign Up
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Field
                                    name="name"
                                    label="Name"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="name" />}

                                />
                                <Field
                                    name="email"
                                    label="Email"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="email" />}

                                />
                                <Field
                                    name="password"
                                    label="Password"
                                    type="password"
                                    as={TextField}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={<ErrorMessage name="password" />}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: 16 }}
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: 16 }}
                                    onClick={() => router.push('/')}
                                >
                                    Sign In
                                </Button>
                            </Form>
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
