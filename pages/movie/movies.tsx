import {useSelector} from "react-redux";
import {useAppDispatch} from "@/store";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {DeleteSingleMovie, GetMovies} from "@/store/reducers/movieReducer";
import Stack from '@mui/material/Stack';
import {Delete, DeleteOutline, Update} from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import {Grid, Card, CardContent, Typography, Skeleton, Box, CardActions, Button, IconButton} from '@mui/material';
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
const Movies = () => {
    const [movies,setMovies] = useState([]);
    const GetAllMovies = useSelector((state: any) => state.MovieManager);
    const delMovie = useSelector((state: any) => state.MovieManager);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [userLogin, setUserLogin] = useState<any>();

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = (movieId) => {
        setOpen(true);
        setSelectedMovieId(movieId);
    };

    const handleDeleteMovie = (id) => {
        dispatch(DeleteSingleMovie({id}))
        setOpen(false);
    }
    useEffect(() =>{
        dispatch(GetMovies())
    },[dispatch,open])
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
    return(
        <>
            {
                GetAllMovies.GetMovieLoading  ?
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
                            GetAllMovies.GetMovieData && Array.isArray(GetAllMovies.GetMovieData) ?
                            (GetAllMovies.GetMovieData.map((movie, index) => (
                        <>
                            <Grid item xs={12} sm={4} md={3} key={index}>
                                <Card style={{cursor: 'pointer'}}>
                                    {/* Replace this image source with your movie banner */}
                                    <img
                                        src={`http://localhost/cenema-ticket-booking-backend/public/uploads/${movie.movie_banner}`}
                                        alt={movie.name}
                                        style={{ width: '100%', height: '300px' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{movie.movie_name}</Typography>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2, fontSize: '1px'}}>
                                            <Typography variant="subtitle2">Director: </Typography>
                                            <Typography variant="subtitle2"> {movie.director_name}</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                            <Typography variant="subtitle2">Cinema: </Typography>
                                            <Typography variant="subtitle2"> {movie.cenema_name}</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2, fontSize: '1px' }}>
                                            <Typography variant="subtitle2">Time Slot:</Typography>
                                            <Typography variant="subtitle2">
                                                {movie.time_slots.map((timeSlot, index) => (
                                                    <span key={index}> {JSON.parse(timeSlot.time_slot).join(", ")}</span>
                                                ))}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                            <Typography variant="subtitle2">Total Seat: </Typography>
                                            <Typography variant="subtitle2">
                                                {movie.time_slots.map((timeSlot, index) => (
                                                    <span key={index}> {timeSlot.total_seat}</span>
                                                ))}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                            <Typography variant="subtitle2">General Seat: </Typography>
                                            <Typography variant="subtitle2">
                                                {movie.time_slots.map((timeSlot, index) => (
                                                    <span key={index}> {timeSlot.general_seat_available}</span>
                                                ))}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                            <Typography variant="subtitle2">Premium Seat: </Typography>
                                            <Typography variant="subtitle2">
                                                {movie.time_slots.map((timeSlot, index) => (
                                                    <span key={index}> {timeSlot.premium_seat_available}</span>
                                                ))}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                            <Typography variant="subtitle2">Update: </Typography>
                                            <Update fontSize="small" variant="outlined" color="primary" onClick={() => router.push(`${movie?.id}`)} />
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" sx={{my: .2}}>
                                            <Typography variant="subtitle2">Delete: </Typography>
                                            <Delete fontSize="small" variant="outlined" color="primary" onClick={() => handleOpen(`${movie?.id}`)} />
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
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Delete
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        <Typography variant="subtitle2">Are you sure you want to delete this movie and all associated data?</Typography>
                        <Box sx={{my: 2}}>
                            <Button variant="contained" size={'small'} color="primary" onClick={handleClose}>
                                No
                            </Button>&nbsp;&nbsp;
                            <Button variant="contained"  size={'small'} color="primary"  onClick={() => handleDeleteMovie(selectedMovieId)}>
                                Yes
                            </Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default Movies