import * as React from 'react';
import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    InputLabel,
    Input,
    FormControl,
    IconButton,
    TextareaAutosize, Box
} from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import Stack from '@mui/material/Stack';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {LoginAuthFunc} from "@/store/reducers/LoginAuth";
import {useAppDispatch} from "@/store";
import { useFormik } from 'formik';
import {File} from "next/dist/compiled/@edge-runtime/primitives";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { format, isValid,isBefore, startOfToday } from 'date-fns';
import {Snakebar} from "../../utils/notistack"
import Textarea from '@mui/joy/Textarea';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {GetSingleMovie, PostAddMovie, UpdateMovie} from "@/store/reducers/movieReducer";
import {useEffect} from "react";
import {Delete, DeleteOutline, Update} from '@mui/icons-material';
import {GetSingleSlot} from "@/store/reducers/TimeslotReducer";

const AddMovieFirstStep = (props) =>{
    const {GetSingleMovieData,id} = props
    const dispatch = useAppDispatch();
    const router = useRouter();
    const GetSingleTimeSlotData = useSelector((state: any) => state.TimeslotReducer.GetSingleTimeSlotData);


    const initialValues = {
        movie_name: GetSingleMovieData?.movie_name,
        movie_banner: null,
        director_name: GetSingleMovieData?.director_name,
        cenema_name: GetSingleMovieData?.cenema_name,
       // release_date: GetSingleMovieData?.release_date,
        details: GetSingleMovieData?.details,
        duration: GetSingleMovieData?.duration,
        movie_type: GetSingleMovieData?.movie_type,
        location_name: GetSingleMovieData?.location_name,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: (values,{resetForm}) => {
            // Handle form submission logic here
             console.log(values);
            dispatch(UpdateMovie({UpdateMovieDetail: values,id}))
        },
    });
    useEffect(() =>{
        dispatch(GetSingleSlot({id}))
    },[dispatch])
    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Movie Name"
                        variant="outlined"
                        fullWidth
                        id="movie_name"
                        name="movie_name"
                        value={formik.values.movie_name}
                        onChange={formik.handleChange}
                        error={formik.touched.movie_name && Boolean(formik.errors.movie_name)}
                        helperText={formik.touched.movie_name && formik.errors.movie_name}
                    />
                    <FormControl fullWidth>
                        <Input
                            type="file"
                            id="movie_banner"
                            name="movie_banner"
                            onChange={(event) =>{
                                const file = event.currentTarget.files[0];
                                formik.setFieldValue('movie_banner', file);
                            }}
                            onBlur={formik.handleBlur}
                            style={{ display: 'none' }} // Hide the default file input
                        />
                        <label htmlFor="movie_banner">
                            <IconButton
                                color="primary"
                                component="span"
                                aria-label="upload picture"
                            >
                                <CloudUploadIcon style={{fontSize: '3rem', margin: 0}} />
                            </IconButton>
                        </label>
                        {formik.touched.movie_banner && formik.errors.movie_banner && (
                            <Typography variant="caption" color="error">
                                {formik.errors.movie_banner}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        label="Director Name"
                        variant="outlined"
                        fullWidth
                        id="director_name"
                        name="director_name"
                        value={formik.values.director_name}
                        onChange={formik.handleChange}
                        error={formik.touched.director_name && Boolean(formik.errors.director_name)}
                        helperText={formik.touched.director_name && formik.errors.director_name}
                    />
                    <TextField
                        label="Cinema Name"
                        variant="outlined"
                        fullWidth
                        id="cenema_name"
                        name="cenema_name"
                        value={formik.values.cenema_name}
                        onChange={formik.handleChange}
                        error={formik.touched.cenema_name && Boolean(formik.errors.cenema_name)}
                        helperText={formik.touched.cenema_name && formik.errors.cenema_name}
                    />

                    <TextField
                        label="Details"
                        variant="outlined"
                        fullWidth
                        id="details"
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        error={formik.touched.details && Boolean(formik.errors.details)}
                        helperText={formik.touched.details && formik.errors.details}
                        minRows={10}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select release date"
                            style={{width: 'fit-content'}}
                            id="release_date"
                            name="release_date"
                            value={formik.values.release_date}
                            onChange={(date) => {
                                // const formattedDate = format(date?.$d, 'dd-MMM-yyyy');
                                // formik.setFieldValue('release_date', formattedDate);

                                if (isValid(date?.$d)) {
                                    // Check if the date is today or in the future
                                    if (isBefore(date?.$d, startOfToday())) {
                                        Snakebar.error('Please select today or a future date')
                                        // console.error('Please select today or a future date.');
                                    } else {
                                        // Format the date and set it in the formik state
                                        const formattedDate = format(date?.$d, 'MMM dd, yyyy');
                                        formik.setFieldValue('release_date', formattedDate);
                                    }
                                } else {
                                    Snakebar.error('Invalid date selected.')
                                }

                            }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Duration"
                        variant="outlined"
                        fullWidth
                        id="duration"
                        name="duration"
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        error={formik.touched.duration && Boolean(formik.errors.duration)}
                        helperText={formik.touched.duration && formik.errors.duration}
                    />
                    <Select
                        variant="outlined"
                        fullWidth
                        id="movie_type"
                        name="movie_type"
                        value={formik.values.movie_type}
                        onChange={formik.handleChange}
                        error={formik.touched.movie_type && Boolean(formik.errors.movie_type)}
                        helperText={formik.touched.movie_type && formik.errors.movie_type}
                    >
                        <MenuItem value="Action">Action</MenuItem>
                        <MenuItem value="Drama">Drama</MenuItem>
                        <MenuItem value="Documentary">Documentary</MenuItem>
                        <MenuItem value="Romance">Romance</MenuItem>
                        <MenuItem value="Adventure">Adventure</MenuItem>
                        <MenuItem value="Thriller">Thriller</MenuItem>
                    </Select>
                    <TextField
                        label="Location name"
                        variant="outlined"
                        fullWidth
                        id="location_name"
                        name="location_name"
                        value={formik.values.location_name}
                        onChange={formik.handleChange}
                        error={formik.touched.location_name && Boolean(formik.errors.location_name)}
                        helperText={formik.touched.location_name && formik.errors.location_name}
                    />
                    {/* Add other fields similarly */}
                    <Button type="submit" variant="contained" color="primary">
                        Update Movie
                    </Button>
                </Stack>
            </form>
            <Box sx={{my: 4}}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Time Slot</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {
                    GetSingleTimeSlotData?.map((slot,index) => (
                        <>
                                        <TableRow>
                                            <TableCell>{++index}</TableCell>
                                            <TableCell>{JSON.parse(slot?.time_slot)}</TableCell>
                                            <TableCell><Button color={'primary'} size={'small'} variant={'outlined'} onClick={() => router.push(`slot/${slot.id}`)}><Update color={'primary'}></Update></Button></TableCell>
                                        </TableRow>
                        </>
                    ))
                }
                            {/* Add more rows as needed */}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </>
    )
}

export default AddMovieFirstStep