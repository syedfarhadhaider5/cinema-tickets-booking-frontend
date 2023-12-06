import {useSelector} from "react-redux";
import {useAppDispatch} from "@/store";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
    DeleteSingleMovie,
    GetMovies,
    GetMoviesByNormalUser,
    GetSingleMovie,
    GetSingleMovieByNormalUser, PostAddMovie
} from "@/store/reducers/movieReducer";
import Stack from '@mui/material/Stack';
import {Delete, DeleteOutline, Update} from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Skeleton,
    Box,
    CardActions,
    Button,
    IconButton,
    Paper
} from '@mui/material';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    border: 'none'
};
import Drawer from '@mui/material/Drawer';

const Index = () => {
    const [movies,setMovies] = useState([]);
    const GetAllMovies = useSelector((state: any) => state.MovieManager);
    const SingleMovie = useSelector((state: any) => state.MovieManager.GetSingleMovieByNormalUserData);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [userLogin, setUserLogin] = useState<any>();
    const [open, setOpen] = useState(false);
    const [SelectSlotId, setSlotId] = useState(null);
    const currentDate = new Date();
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const toggleDrawer = (mId) => {
        setOpen(!open);
        dispatch(GetSingleMovieByNormalUser({mId}))
    };

    const handleClose = () => {
        setOpen(false);
    };
    function formatDate(date) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

// Function to get the next three dates
    function getNextThreeDates() {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 3; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            dates.push(formatDate(nextDate));
        }

        return dates;
    }
    const dates = getNextThreeDates();
    const [selectedDate, setSelectedDate] = useState(dates[0]);

    const handleChange = (event) => {
       // console.log(event.target.value)
        setSelectedDate(event.target.value)
    };


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
    useEffect(() =>{
        dispatch(GetMoviesByNormalUser())
    },[dispatch])
    return(
        <>
            {
                GetAllMovies.GetMoviesByNormalLoading  ?
                    <Grid container spacing={2} style={{marginTop: 40, cursor: 'pointer'}}>
                        {[1, 2, 3, 4,5,6,7,8,9].map((index) => (
                            <Grid item xs={12} sm={4} md={3} key={index}>
                                <Stack spacing={1}>
                                    {/* For variant="text", adjust the height via font-size */}
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                                    {/* For other variants, adjust the size with `width` and `height` */}
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton variant="rectangular" height={60} />
                                    <Skeleton variant="rounded" height={60} />
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                    :
                    <Grid container spacing={2}   style={{marginTop: 40}}>

                        {
                            GetAllMovies.GetMoviesByNormalData && Array.isArray(GetAllMovies.GetMoviesByNormalData) ?
                                (GetAllMovies.GetMoviesByNormalData.map((movie, index) => (
                                    <>
                                        <Grid item xs={12} sm={4} md={3} key={index}>
                                            <Card style={{cursor: 'pointer'}} onClick={() => toggleDrawer(`${movie?.id}`)}>
                                                {/* Replace this image source with your movie banner */}
                                                <img
                                                    src={`http://localhost/cenema-ticket-booking-backend/public/uploads/${movie.movie_banner}`}
                                                    alt={movie.name}
                                                    style={{ width: '100%', height: '300px' }}
                                                />
                                                <CardContent>
                                                    <Typography variant={'h6'} style={{ fontSize: '14px', fontWeight: 'bold' }}>{movie.movie_name}</Typography>

                                                    <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                                        <Typography variant="subtitle2">Total Seat: </Typography>
                                                        <Typography variant="subtitle2">
                                                            {movie.time_slots.map((timeSlot, index) => (
                                                               <>
                                                                   {
                                                                       timeSlot.movie_date === formattedDate ?
                                                                           <>
                                                                               <span key={index}> {timeSlot.total_seat}</span>
                                                                           </>
                                                                           :
                                                                           '-,'
                                                                   }
                                                               </>
                                                            ))}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                                        <Typography variant="subtitle2">General Seat: </Typography>
                                                        <Typography variant="subtitle2">
                                                            {movie.time_slots.map((timeSlot, index) => (
                                                                <>
                                                                    {
                                                                        timeSlot.movie_date === formattedDate ?
                                                                            <>
                                                                                <span key={index}> {timeSlot.general_seat_available}</span>
                                                                            </>
                                                                            :
                                                                            '-,'
                                                                    }
                                                                </>
                                                            ))}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                                        <Typography variant="subtitle2">Premium Seat: </Typography>
                                                        <Typography variant="subtitle2">
                                                            {movie.time_slots.map((timeSlot, index) => (
                                                                <>
                                                                    {
                                                                        timeSlot.movie_date === formattedDate ?
                                                                            <>
                                                                                <span key={index}> {timeSlot.premium_seat_available}</span>
                                                                            </>
                                                                            :
                                                                            '-,'
                                                                    }
                                                                </>
                                                            ))}
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                                        <Typography variant="subtitle2">Time: </Typography>
                                                        <Typography variant="subtitle2">
                                                            {movie.time_slots.map((timeSlot, index) => (
                                                                <>
                                                                    {
                                                                        timeSlot.movie_date === formattedDate ?
                                                                            <>
                                                                                <span key={index}> {JSON.parse(timeSlot.time_slot)}</span>
                                                                            </>
                                                                            :
                                                                            '-,'
                                                                    }
                                                                </>
                                                            ))}
                                                        </Typography>
                                                    </Box>

                                                </CardContent>
                                            </Card>
                                        </Grid>

                                    </>
                                )))
                                :
                                <div>Movie data is not available.</div>
                        }
                    </Grid>

            }
            <Drawer anchor="right" open={open} onClose={handleClose}>
                {/* Content inside the right drawer */}
                <Box style={{ width: '50vh', padding: '16px',overflowY: 'auto' }} display="flex" flexDirection={"column"}   sx={{my: .2}}>
                    <Box style={{border: '1px solid #ccc', borderRadius: '8px', padding: '16px'}}>
                        <img
                            src={`http://localhost/cenema-ticket-booking-backend/public/uploads/${SingleMovie?.movie_banner}`}
                            alt={SingleMovie?.name}
                            style={{ width: '60%', height: '200px' }}
                        />
                        <Typography variant={'h6'} style={{ fontSize: '14px', fontWeight: 'bold' }}>{SingleMovie?.movie_name}</Typography>
                    </Box>
                    <Box sx={{my: 2}}>
                        <Typography variant={'h2'} style={{ fontSize: '18px', fontWeight: 'bold', }}>Ticket Details</Typography>
                    </Box>
                    <Box>
                        <form>
                            <Select
                                variant="outlined"
                                fullWidth
                                value={selectedDate}
                                onChange={handleChange}
                            >
                                {dates.map((date, index) => (
                                    <MenuItem key={index}  value={date}>{date}</MenuItem>
                                    ))}
                            </Select>
                        </form>
                        {GetAllMovies.GetSingleMovieByNormalUserData?.time_slots && (
                            GetAllMovies.GetSingleMovieByNormalUserData?.time_slots[0]?.movie_date === selectedDate ?
                                (<>
                                    <Box sx={{my: 2}}>
                                        {GetAllMovies.GetSingleMovieByNormalUserData?.time_slots[0]?.time_slot && Array.isArray(JSON.parse(GetAllMovies.GetSingleMovieByNormalUserData.time_slots[0].time_slot)) ?
                                            GetAllMovies.GetSingleMovieByNormalUserData.time_slots.map((time, index) => (
                                                <Box sx={{my: 1}} display="flex" flexDirection={'column'} >
                                                    <Typography variant={'h6'} style={{marginBottom: 5}} color={'primary'}>Screen-{++index}</Typography>
                                                    <Button key={index} style={{width: '40%'}}  variant="outlined" color="primary" onClick={() => setSlotId(time.id)}>
                                                        {JSON.parse(time.time_slot)}
                                                    </Button>
                                                    {
                                                        SelectSlotId === time.id ?
                                                            <>
                                                                <Box sx={{py: 2}} display="flex" justifyContent={'space-between'} alignItems={'center'}>
                                                                    <Box  display="flex" flexDirection={'column'}>
                                                                        <Button  key={index} style={{width: '100%'}} size={'small'} variant="contained" color="primary" onClick={() => router.push(`app/${time.id}/general`)}>
                                                                            General Seat&nbsp;Rs&nbsp;{time.general_seat_price}
                                                                        </Button>
                                                                        <br/>
                                                                        <Button  key={index} style={{width: '100%'}} size={'small'} variant="contained" color="primary" onClick={() => router.push(`app/${time.id}/premium`)}>
                                                                            Premium Seat&nbsp;Rs&nbsp;{ time.premium_seat_price}
                                                                        </Button>
                                                                    </Box>
                                                                    <Box>
                                                                        <IconButton  key={index} style={{width: '50%'}} size={'small'} variant="contained" color="primary" onClick={() => setSlotId(null)}>
                                                                           <Delete />
                                                                        </IconButton>
                                                                    </Box>
                                                                </Box>
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                </Box>
                                            )) :
                                            <p>No time slots available</p>
                                        }
                                    </Box>
                                </>)
                                :
                                (<>
                                    <Box sx={{my: 2}}>
                                        <Typography variant={'h2'} style={{ fontSize: '18px', fontWeight: 'bold', }}>This Movies Not Available Today</Typography>
                                    </Box>
                                </>)
                        )}
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default Index