import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Backdrop, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "@/store";
import { GetSingleTimeSlot, GetSingleTimeSlotByNormalUser } from "@/store/reducers/TimeslotReducer";
import { useSelector } from "react-redux";
import { Snakebar } from "../../../utils/notistack";
import { GetSingleMovie, GetSingleMovieByNormalUser } from "@/store/reducers/movieReducer";
import { BookMovieSeat } from "@/store/reducers/TicketReducer";
import { Snackbar } from "../../../utils/notistack";

const Index = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id, tag } = router.query;
    const [selectedSeat, setSelectedSeat] = useState(null);

    const GetSingleTimeSlotData = useSelector((state: any) => state.TimeslotReducer.GetSingleTimeSlotByIdNormalUserData);
    const GetSingleMovieSlotData = useSelector((state: any) => state.MovieManager.GetSingleMovieByNormalUserData);
    const Ticket = useSelector((state: any) => state.TicketManager);
    const [buttonStates, setButtonStates] = useState(Array(50).fill(false));
    const [selectedButton, setSelectedButton] = useState(null);
    const [savedButtonInfo, setSavedButtonInfo] = useState(null);
    const [fullName, setFullName] = useState('');
    const [CNIC, setCnic] = useState('');
    const [sir, setSir] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [isSuccess, setSuccess] = useState(false);
    const [userLogin, setUserLogin] = React.useState<any>();

    useEffect(() => {
        dispatch(GetSingleTimeSlotByNormalUser({ id }))
    }, [dispatch, id])
    const getSeatInfo = (index) => {
        return (
            index < 10 ? `A${index + 1}` :
                index < 20 ? `B${index + 1}` :
                    index < 30 ? `C${index + 1}` :
                        index < 40 ? `D${index + 1}` :
                            index < 50 ? `E${index + 1}` :
                                ''
        );
    };
    const handleButtonClick = (index) => {

        const selectedCount = buttonStates.filter((isSelected) => isSelected).length;

        if (selectedCount < 3 || buttonStates[index]) {
            // Create a copy of the selectedButtons array
            const newSelectedButtons = [...buttonStates];
            // Toggle the selected state of the clicked button
            newSelectedButtons[index] = !newSelectedButtons[index];
            // Update the state with the new array
            setButtonStates(newSelectedButtons);
            // Set the selected button index
            setSelectedButton(index);

            // Set the saved button info
            const seatInfo = getSeatInfo(index);
            setSavedButtonInfo((prevSavedButtonInfo) => {
                // Ensure that prevSavedButtonInfo is an array
                const newSavedButtonInfo = Array.isArray(prevSavedButtonInfo) ? [...prevSavedButtonInfo] : [];

                if (newSelectedButtons[index]) {
                    // If the button is selected, add it to the array
                    newSavedButtonInfo.push(seatInfo);
                } else {
                    // If the button is deselected, remove it from the array
                    const indexToRemove = newSavedButtonInfo.indexOf(seatInfo);
                    if (indexToRemove !== -1) {
                        newSavedButtonInfo.splice(indexToRemove, 1);
                    }
                }

                return newSavedButtonInfo;
            });
        } else {
            // Show an error message or handle the exceeded limit as needed
            Snakebar.error('You can only select up to 3 seats.');
        }
    };

    const mId = GetSingleTimeSlotData?.movie_id
    function isValidEmail(email) {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidMobileNumber(mobileNumber) {
        // Basic mobile number validation assuming a 10-digit format
        const mobileRegex = /^\d{11}$/;
        return mobileRegex.test(mobileNumber);
    }
    const handleReset = () => {
        // Reset the form or any other necessary state
        setSuccess(false);
        router.push('/app/tickets')
    };
    const handleTicketBooking = async () => {
        if (fullName === '') {
            Snakebar.error("Full Name required")
        } else if (sir === '') {
            Snakebar.error("Sir Name required")
        } else if (CNIC === '') {
            Snakebar.error("CNIC required")
        } else if (contactNumber === '') {
            Snakebar.error("phone number required")
        } else if (contactEmail === '') {
            Snakebar.error("email required")
        } else if (!isValidEmail(contactEmail)) {
            Snakebar.error("Invalid email format");
        } else if (!isValidMobileNumber(contactNumber)) {
            Snakebar.error("Invalid phone number");
        } else {
            const currentDate = new Date();

            const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).format(currentDate);
            const BookMovieSeatDetail = {
                movie_id: mId,
                booking_date: GetSingleTimeSlotData?.movie_date,
                time_slot_id: GetSingleTimeSlotData?.id,
                user_id: userLogin?.id,
                seat_number: savedButtonInfo !== null ? savedButtonInfo : '',
                cnic: CNIC,
                sir_name: sir,
                full_name: fullName,
                contact_number: contactNumber,
                contact_email: contactEmail,
                ticket_type: tag === 'premium' ? 'premium' : 'general',

            }
            const response = await dispatch(BookMovieSeat({ BookMovieSeatDetail }))
            console.log(response.payload)
            if (response.payload === 201) {
                setSelectedButton(null);
                setSuccess(true);
                setFullName('')
                setCnic('')
                setContactNumber('')
                setContactEmail('')
                setSir('')
                setSavedButtonInfo(null)
            }
        }
    }
    useEffect(() => {
        dispatch(GetSingleMovieByNormalUser({ mId }))
    }, [dispatch, mId])
    useEffect(() => {
        dispatch(GetSingleTimeSlotByNormalUser({ id }))
    }, [dispatch, id])
    const LoginTokenAvailable: any =
        typeof window !== "undefined" && localStorage.getItem("bookmeLoginToken");
    React.useEffect(() => {
        if (LoginTokenAvailable) {
            setUserLogin(JSON.parse(LoginTokenAvailable));
        }
    }, [LoginTokenAvailable, router]);
    return (
        <>
            <Grid container style={{ marginTop: 40 }} spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper elevation={3} sx={{ my: 1, py: 1, px: 2 }}>
                        <Box sx={{ my: 1, py: 1, px: 2, border: .1, borderColor: 'primary.main', borderRadius: 2 }} style={{ width: '100%' }}>
                            <Typography variant="h5" sx={{ py: 1 }}>Seat Selection</Typography>
                            <Box sx={{ my: 1, py: 3, px: 2, border: .1, borderColor: 'primary.main', borderRadius: 2 }} style={{ width: '100%' }}>
                                {
                                    GetSingleTimeSlotData?.GetSingleTimeSlotByIdNormalUserLoading ?
                                        <>
                                            <Stack spacing={1}>
                                                {/* For variant="text", adjust the height via font-size */}

                                                {/* For other variants, adjust the size with `width` and `height` */}
                                                <Skeleton variant="rectangular" height={40} />
                                                <Skeleton variant="rectangular" height={40} />
                                                <Skeleton variant="rectangular" height={40} />
                                                <Skeleton variant="rectangular" height={40} />
                                                <Skeleton variant="rectangular" height={40} />
                                                <Skeleton variant="rectangular" height={40} />
                                            </Stack>
                                        </>
                                        :
                                        <>
                                            <Box sx={{
                                                width: '100%',
                                                overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid primary'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>

                                                    <img
                                                        src={`/movie-top-screen.png`}
                                                        style={{ textAlign: 'center' }}
                                                    />
                                                </div>
                                                <Box display={'flex'} flexWrap={'wrap'}>
                                                    {buttonStates.map((isRed, index) => (
                                                        <>
                                                            <Button
                                                                key={index}
                                                                onClick={() => handleButtonClick(index)}
                                                                color={isRed ? 'secondary' : 'primary'}
                                                                variant={isRed ? 'contained' : 'outlined'}
                                                                sx={{ m: 1 }}
                                                                disabled={
                                                                    (tag === 'premium' ? GetSingleTimeSlotData?.premium_seat_available - 1 < index : 50 - GetSingleTimeSlotData?.general_seat_available > index) ||
                                                                    (GetSingleMovieSlotData?.tickets || []).some(ticket => {
                                                                        const ticketSeatNumber = ticket?.seat_number;
                                                                        const formattedIndex = index < 10 ? `A${index + 1}` : index < 20 ? `B${index + 1}` : index < 30 ? `C${index + 1}` : index < 40 ? `D${index + 1}` : index < 50 ? `E${index + 1}` : '';

                                                                        return ticketSeatNumber === index.toString() || ticketSeatNumber === formattedIndex;
                                                                    })
                                                                }

                                                            >
                                                                {index < 10 ? `A${index + 1}` : index <= 20 ? `B${index + 1}` : index < 30 ? `C${index + 1}` : index < 40 ? `D${index + 1}` : index < 50 ? `E${index + 1}` : ''}
                                                            </Button>
                                                        </>
                                                    ))}
                                                </Box>
                                            </Box>
                                        </>
                                }
                            </Box>
                        </Box>
                        {/*   2nd section */}
                        <Grid container style={{ marginTop: 20, marginBottom: 20 }} spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <Box sx={{ my: 1, py: 1, px: 2, }}>
                                    <Box sx={{ border: .1, py: 3, px: 2, borderColor: 'primary.main', borderRadius: 2 }} display={'flex'} flexDirection={'column'} style={{ width: '100%' }} >
                                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} >
                                            <Box>
                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Box sx={{ py: .5, px: .5, border: .1, borderColor: 'primary.main', borderRadius: 2, width: 30, height: 30 }} size={'small'} variant="outlined" color="primary" >
                                                    </Box>&nbsp;&nbsp;
                                                    <Typography variant={'subtitle2'}>Seat Available</Typography>
                                                </Box>
                                                <br />
                                                <Box display={'flex'} alignItems={'center'}>
                                                    <Box sx={{ py: .5, px: .5, border: .1, borderColor: 'action.disabled', borderRadius: 2, width: 30, height: 30, backgroundColor: 'action.disabled' }} size={'small'} variant="outlined" color="primary" >
                                                    </Box>&nbsp;&nbsp;
                                                    <Typography variant={'subtitle2'}>Seat UnAvailable</Typography>
                                                </Box>
                                            </Box>
                                            <Box display={'flex'} alignItems={'center'}>
                                                <Box sx={{ py: .5, px: .5, border: .1, borderColor: 'secondary.main', borderRadius: 2, width: 30, height: 30, backgroundColor: 'secondary.main' }} size={'small'} variant="outlined" color="primary" >
                                                </Box>&nbsp;&nbsp;
                                                <Typography variant={'subtitle2'}>Seat
                                                    Selected</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}></Grid>
                        </Grid>
                    </Paper>

                    <Paper elevation={3} sx={{ my: 5, p: 2 }}>
                        <Typography variant="h5" sx={{ py: 1 }}>Customer Details</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                row
                                aria-label="title"
                                name="title"
                                value={sir}
                                sx={{ marginBottom: 3 }}
                                onChange={(e) => setSir(e.target.value)}
                            >
                                <FormControlLabel value="mr" control={<Radio />} label="Mr" />
                                <FormControlLabel value="mrs" control={<Radio />} label="Mrs" />
                                <FormControlLabel value="miss" control={<Radio />} label="Miss" />
                            </RadioGroup>
                        </FormControl>
                        {/* form */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 3 }}
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    label="CNIC"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 3 }}
                                    value={CNIC}
                                    onChange={(e) => setCnic(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    {/* section */}
                    <Paper elevation={3} sx={{ my: 5, p: 2 }}>
                        <Typography variant="h5" sx={{ py: 1 }}>Contact Details</Typography>
                        {/* form */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    label="Contact Number"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 3 }}
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: 3 }}
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={() => handleTicketBooking()}
                            color={'primary'}
                            variant={'contained'}
                            sx={{ my: 2 }}
                            style={{ width: '100%' }}
                        >
                            Book
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper elevation={3} sx={{ my: 1, py: 1, px: 2 }}>
                        <Box sx={{ my: 1, pt: 1, border: .1, borderColor: 'primary.main', borderRadius: 2 }} style={{ width: '100%' }}>
                            <Box sx={{ fontSize: '3', fontWeight: 'bold' }}>
                                <Typography variant="h6" sx={{ py: 1, px: 2 }}>{GetSingleMovieSlotData && GetSingleMovieSlotData.movie_name}</Typography>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box sx={{ py: 1, px: 2 }}><Typography>{GetSingleMovieSlotData?.cenema_name}</Typography></Box>
                                <Box sx={{ py: 1, px: 2 }}>
                                    <Typography>{GetSingleTimeSlotData?.movie_date}</Typography>
                                </Box>
                            </Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box sx={{ py: 1, px: 2 }}><Typography></Typography></Box>
                                <Box sx={{ py: 1, px: 2 }}>
                                    <Typography>{GetSingleTimeSlotData?.time_slot && JSON.parse(GetSingleTimeSlotData?.time_slot)}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ border: 0.1, borderColor: 'primary.main', width: '100%' }}></Box>

                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box sx={{ py: 1, px: 2 }}><Typography variant={'subtitle1'}>Subtotal</Typography></Box>
                                <Box sx={{ py: 1, px: 2 }}>
                                    <Typography variant={'subtitle1'}>
                                        {
                                            savedButtonInfo !== null ?
                                                <>
                                                    {tag === 'premium' ? GetSingleTimeSlotData?.premium_seat_price * savedButtonInfo.length : GetSingleTimeSlotData?.general_seat_price * savedButtonInfo.length}
                                                </> : '---'
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ border: 0.1, borderColor: 'primary.main', width: '100%' }}></Box>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box sx={{ py: 1, fontWeight: 'bold', px: 2 }}><Typography variant={'h6'}>Total</Typography></Box>
                                <Box sx={{ py: 1, fontWeight: 'bold', px: 2 }}>
                                    <Typography variant={'h6'}>
                                        {
                                            savedButtonInfo !== null ?
                                                <>
                                                    {tag === 'premium' ? GetSingleTimeSlotData?.premium_seat_price * savedButtonInfo.length : GetSingleTimeSlotData?.general_seat_price * savedButtonInfo.length}
                                                </> : '---'
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            {/* backdrop */}
            <Backdrop open={isSuccess}>
                <div>
                    <Typography variant="h4" color={'primary'}>Welcome! Ticket Booked.</Typography>
                    <Button variant="contained" size={'small'} color="primary" onClick={handleReset}>
                        Close
                    </Button>
                </div>
            </Backdrop>
        </>
    )
}

export default Index