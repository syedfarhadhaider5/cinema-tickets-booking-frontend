import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import {GetMovies, GetSingleMovie, PostAddMovie} from "@/store/reducers/movieReducer";
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
    TextareaAutosize, Select, MenuItem, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import {useAppDispatch} from "@/store";
import { useRouter } from "next/router";
import {GetSingleSlot, UpdateSingleTimeSlot,GetSingleTimeSlot} from "@/store/reducers/TimeslotReducer";
import {format, isBefore, isValid, startOfToday} from "date-fns";
import {Snakebar} from "@/utils/notistack";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const  AddMovieSecondStepUpdate = (props) =>{
    const {GetSingleTimeSlotData,slotid} = props
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [timeOptions, setTimeOptions] = React.useState( []);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [userLogin, setUserLogin] = React.useState<any>();
    const [id, setSelectedMovieId] = useState('');
    const [timeSlot, setTimeSlot] = useState([]);

    const handleTimeChangeUpdate = (newTime) => {
        setSelectedTime(newTime);
    };

    const handleTimeAcceptUpdate= () => {
        if (selectedTime) {
            const formattedTime = selectedTime.format('h:mm A');
            setTimeOptions((prevOptions) => [formattedTime]);
        }
    };
    const handleDeleteUpdate = (index) => {
        // Create a new array without the item at the specified index
        const updatedTimeOptions = [...timeOptions.slice(0, index), ...timeOptions.slice(index + 1)];
        setTimeOptions(updatedTimeOptions);
    };
    const validationSchema = yup.object({
        movie_date: yup.string().required('Select movie date'),
    });
    const initialValues = {
        total_seat: GetSingleTimeSlotData?.total_seat,
        premium_seat_available: GetSingleTimeSlotData?.premium_seat_available,
        general_seat_available: GetSingleTimeSlotData?.general_seat_available,
        ticket_type: '',
        movie_date: '',
        slot_id: '',
        movie_id: ''
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values,{resetForm}) => {
            const SlotId = GetSingleTimeSlotData?.id
            const ticket_type = 'premium'
            const timeOptionsSlot =  JSON.stringify(timeOptions)
            console.log(values)
            console.log(timeOptionsSlot)
            //dispatch(UpdateSingleTimeSlot({UpdateTimePayload: values}))
            dispatch(UpdateSingleTimeSlot({values,SlotId,ticket_type,timeOptionsSlot}))
            // resetForm();
            // setTimeOptions([]);
            // setSelectedTime(null);
            // formik.setFieldValue('movie_date', '');
        },
    });
    React.useEffect(() => {
        if (GetSingleTimeSlotData?.time_slot) {
            setTimeOptions(JSON.parse(GetSingleTimeSlotData?.time_slot));
        }
    }, [GetSingleTimeSlotData]);
    const LoginTokenAvailable: any =
        typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    useEffect(() => {
        if (LoginTokenAvailable) {
            setUserLogin(JSON.parse(LoginTokenAvailable));
        }
        // if(userLogin && userLogin?.type !== "admin"){
        //     router.push('/app')
        // }else{
        //     router.push('/')
        // }
    }, [LoginTokenAvailable,router]);



    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker
                            label={'Select time slots'}
                            openTo="minutes"
                            value={selectedTime}
                            onChange={handleTimeChangeUpdate}
                            onAccept={handleTimeAcceptUpdate}
                        />
                    </LocalizationProvider>
                    <div>
                        {timeOptions.map((time, index) => (
                            <>
                                <p>
                                    {time}
                                    <IconButton variant="contained" color="primary" onClick={() => handleDeleteUpdate(index)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                </p>
                            </>
                        ))}
                    </div>
                    {GetSingleTimeSlotData?.movie_date}
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
                        Update Time Slot
                    </Button>
                </Stack>
            </form>
        </>
    );
}
export default  AddMovieSecondStepUpdate