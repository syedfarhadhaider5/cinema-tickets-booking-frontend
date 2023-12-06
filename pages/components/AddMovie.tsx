
import React, {useEffect, useState} from 'react';
import {Button, Stepper, Step, StepLabel, Typography, Grid, Box} from '@mui/material';
import Login from "@/pages/components/Login";
import AddMovieFirstStep from "@/pages/components/AddMovieFirstStep";
import AddMovieSecondStep from "@/pages/components/AddMovieSecondStep";
import AddMovieThirdStep from "@/pages/components/AddMovieThirdStep";

const AddMovie = () =>{
    const [activeStep, setActiveStep] = useState(0);
    const [movieIds, setMovieId] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1 );
    };
    const handleComplete = () => {
        // Handle form submission or completion logic here
    };
    const movieId: any =
        typeof window !== "undefined" && localStorage.getItem("movie_id");
    React.useEffect(() => {
        if (movieId) {
            setMovieId(JSON.parse(movieId));
            setActiveStep(1)
        }
    }, [movieId]);
// Step components
    const Step1 = ({ onNext }) => (
        <div>
            <Grid container   style={{marginTop: 40 }}>
                <Grid item xs={12} sm={12} md={2}></Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" style={{marginTop: 10,marginBottom: 10}}>Create Movie</Typography>
                    <AddMovieFirstStep />
                    <Box sx={{my: 2}}>
                        <Button variant="contained" color="primary" onClick={onNext}>
                            Next
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="primary" disabled={activeStep > 0 ? false : true} onClick={handleBack}>
                            Back
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}></Grid>
            </Grid>
        </div>
    );

    const Step2 = ({ onNext }) => (
        <div>
            <Grid container   style={{marginTop: 40 }}>
                <Grid item xs={12} sm={12} md={2}>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" style={{marginTop: 10,marginBottom: 10}}>Add move time slot</Typography>
                    <AddMovieSecondStep />
                    <Box sx={{my: 2}}>

                        <Button variant="contained" color="primary" disabled={movieIds ? true : false} onClick={handleBack}>
                            Back
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                </Grid>
            </Grid>
        </div>
    );

    const Step3 = () => (
        <div>
            <Grid container   style={{marginTop: 40 }}>
                <Grid item xs={12} sm={12} md={2}></Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6">Publish</Typography>
                    <AddMovieThirdStep />
                    <Box sx={{my: 2}}>
                        <Button variant="contained" color="primary" onClick={handleComplete}>
                            Complete
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" color="primary" onClick={handleBack}>
                            Back
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}></Grid>
            </Grid>
        </div>
    );

    return(
        <>
            <div>
                <Stepper activeStep={activeStep} alternativeLabel style={{marginTop: 40}}>
                    <Step>
                        <StepLabel>Add movie</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Add TimeSlot</StepLabel>
                    </Step>
                </Stepper>

                {activeStep === 0 && <Step1 onNext={handleNext} />}
                {activeStep === 1 && <Step2 onNext={handleNext} />}
            </div>
        </>
    )
}

export default AddMovie;