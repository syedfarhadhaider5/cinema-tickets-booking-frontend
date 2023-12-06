import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,BarChart, Bar } from 'recharts';
import { Grid, Paper, Typography } from '@mui/material';

 const  AdminDashboard = () => {
    const data = [
        { name: 'Jan', Movies: 400,  amt: 2400 },
        { name: 'Feb', Movies: 300,  amt: 2400 },
        { name: 'Mar', Movies: 500,  amt: 2400 },
        { name: 'Apr', Movies: 200,  amt: 2400 },
        { name: 'May', Movies: 600,  amt: 2400 },
        { name: 'Jun', Movies: 800,  amt: 2400 },
    ];
     const ticketSales = [
         { month: 'Jan', TicketsSold: 50 },
         { month: 'Feb', TicketsSold: 80 },
         { month: 'Mar', TicketsSold: 120 },
         { month: 'Apr', TicketsSold: 90 },
         { month: 'May', TicketsSold: 150 },
         { month: 'Jun', TicketsSold: 110 },
     ];

     return(
        <>
            <Grid container>
                <Grid item xs={10} sm={7} md={6}>
                    <Paper elevation={3} style={{ padding: 20, marginTop: 40, width: 'fit-content'}}>
                        <Typography variant="h5" gutterBottom>
                            Movie Launch
                        </Typography>
                        <LineChart
                            width={450}
                            height={250}
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Movies" stroke="#8884d8" />
                        </LineChart>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={7} md={6}>
                    <Paper elevation={3} style={{ padding: 20,marginTop: 40, width: 'fit-content' }}>
                        <Typography variant="h5" gutterBottom>
                            Ticket Sales by Month
                        </Typography>
                        <BarChart
                            width={450}
                            height={250}
                            data={ticketSales}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="TicketsSold" fill="#8884d8" />
                        </BarChart>
                    </Paper>
                </Grid>
                </Grid>
        </>
    )
}

export default AdminDashboard