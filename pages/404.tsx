import {Button, Typography} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { Grid } from '@mui/material';

const NotFoundPage = () => {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
            <section className="flex items-center h-full p-16">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <Typography variant="h1" align="center" gutterBottom>
                            Error 404
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            Sorry, we couldn&apos;t find this page.
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            But dont worry, you can find plenty of other things on our homepage.
                        </Typography>
                        <Typography  align="center" gutterBottom>
                            <Link href='/' >
                                <Button variant='outlined'  color='primary'>Back to homepage</Button>
                            </Link>
                        </Typography>
                    </div>
                </div>
            </section>
            </Grid>
        </Grid>
    )
}

export default NotFoundPage