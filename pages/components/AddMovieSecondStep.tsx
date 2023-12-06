import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import {GetMovies, PostAddMovie} from "@/store/reducers/movieReducer";
import { useFormik } from 'formik';
import Stack from '@mui/material/Stack';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
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
    TextareaAutosize, Select, MenuItem
} from '@mui/material';
import {useAppDispatch} from "@/store";
import { useRouter } from "next/router";
import {PostAddTimeSlot} from "@/store/reducers/TimeslotReducer";
import {format, isBefore, isValid, startOfToday} from "date-fns";
import {Snakebar} from "@/utils/notistack";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useEffect} from "react";
import {useSelector} from "react-redux";

const  AddMovieSecondStep = () =>{
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [timeOptions, setTimeOptions] = React.useState([]);
    const [movieIds, setMovieId] = React.useState('');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const GetAllMovies = useSelector((state: any) => state.MovieManager);

    const handleTimeChange = (newTime) => {
        setSelectedTime(newTime);
    };

    const handleTimeAccept = () => {
        if (selectedTime) {
            const formattedTime = selectedTime.format('h:mm A');
            setTimeOptions((prevOptions) => [formattedTime]);
        }
    };
    const handleDelete = (index) => {
        // Create a new array without the item at the specified index
        const updatedTimeOptions = [...timeOptions.slice(0, index), ...timeOptions.slice(index + 1)];
        setTimeOptions(updatedTimeOptions);
    };
    const validationSchema = yup.object({
        total_seat: yup.number().required('Total seat is required'),
        premium_seat_available: yup.number().required('Premium seat available is required'),
        general_seat_available: yup.number().required('General seat available is required'),
        movie_date: yup.string().required('movie date is required'),
    });
    const initialValues = {
        total_seat: '',
        premium_seat_available: '',
        general_seat_available: '',
        ticket_type: '',
        movie_date: '',
        movie_id: null
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values,{resetForm}) => {
            // Handle form submission logic here
            console.log(values);
            const ticket_type = 'premium'
            const timeOptionsSlot =  JSON.stringify(timeOptions)
            dispatch(PostAddTimeSlot({AddTimeSlotDetail: values,timeOptionsSlot,ticket_type}))
            resetForm();
            setTimeOptions([]);
            setSelectedTime(null);
            formik.setFieldValue('movie_date', '');
        },
    });
    const movieId: any =
        typeof window !== "undefined" && localStorage.getItem("movie_id");
    React.useEffect(() => {
        if (movieId) {
            setMovieId(JSON.parse(movieId));
        }
    }, [movieId]);
    useEffect(() =>{
        dispatch(GetMovies())
    },[dispatch])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileTimePicker
                                    label={'Select time slots'}
                                    openTo="minutes"
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    onAccept={handleTimeAccept}
                                />
                            </LocalizationProvider>
                            <div>
                                {timeOptions.map((time, index) => (
                                   <>
                                       <p>
{time}                                       <IconButton variant="contained" color="primary" onClick={() => handleDelete(index)} aria-label="delete">
                                           <DeleteIcon />
                                       </IconButton>
                                       </p>
                                   </>
                                ))}
                            </div>
                            <Select
                                variant="outlined"
                                fullWidth
                                id="movie_id"
                                name="movie_id"
                                value={formik.values.movie_id}
                                onChange={formik.handleChange}
                                error={formik.touched.movie_id && Boolean(formik.errors.movie_id)}
                                helperText={formik.touched.movie_id && formik.errors.movie_id}
                            >
                                {GetAllMovies?.GetMovieData?.map((movies, index) => (
                                    <MenuItem key={movies.id} value={movies.id}>
                                        {movies.movie_name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Select movie date"
                                style={{width: 'fit-content'}}
                                id="movie_date"
                                name="movie_date"
                                onChange={(date) => {
                                    // const formattedDate = format(date?.$d, 'dd-MMM-yyyy');
                                    // formik.setFieldValue('release_date', formattedDate);

                                    if (isValid(date?.$d)) {
                                        const formattedDate = format(date?.$d, 'MMM dd, yyyy');
                                        formik.setFieldValue('movie_date', formattedDate);
                                    } else {
                                        Snakebar.error('Invalid date selected.')
                                    }

                                }}
                            />
                        </LocalizationProvider>
                            <TextField
                                label="Total seat"
                                variant="outlined"
                                fullWidth
                                id="total_seat"
                                name="total_seat"
                                value={formik.values.total_seat}
                                onChange={formik.handleChange}
                                error={formik.touched.total_seat && Boolean(formik.errors.total_seat)}
                                helperText={formik.touched.total_seat && formik.errors.total_seat}
                            />
                            <TextField
                                label="General seat available"
                                variant="outlined"
                                fullWidth
                                id="general_seat_available"
                                name="general_seat_available"
                                value={formik.values.general_seat_available}
                                onChange={formik.handleChange}
                                error={formik.touched.general_seat_available && Boolean(formik.errors.general_seat_available)}
                                helperText={formik.touched.general_seat_available && formik.errors.general_seat_available}
                            />
                            <TextField
                                label="Total premium seat available"
                                variant="outlined"
                                fullWidth
                                id="premium_seat_available"
                                name="premium_seat_available"
                                value={formik.values.premium_seat_available}
                                onChange={formik.handleChange}
                                error={formik.touched.premium_seat_available && Boolean(formik.errors.premium_seat_available)}
                                helperText={formik.touched.premium_seat_available && formik.errors.premium_seat_available}
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Add Time Slot
                            </Button>
                        </Stack>
                    </form>
        </>
    );
}
export default  AddMovieSecondStep