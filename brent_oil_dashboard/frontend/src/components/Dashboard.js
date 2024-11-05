
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [metrics, setMetrics] = useState({});

    useEffect(() => {
        // Fetch historical data
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));

        // Fetch model metrics
        axios.get('http://127.0.0.1:5000/api/metrics')
            .then(response => setMetrics(response.data))
            .catch(error => console.error("Error fetching metrics:", error));
    }, []);

    return (
        <div>
            <h1>Brent Oil Price Dashboard</h1>
            <div className="metrics">
                <h3>Model Performance Metrics</h3>
                <p>ARIMA RMSE: {metrics.ARIMA?.RMSE}</p>
                <p>ARIMA MAE: {metrics.ARIMA?.MAE}</p>
                <p>LSTM RMSE: {metrics.LSTM?.RMSE}</p>
                <p>LSTM MAE: {metrics.LSTM?.MAE}</p>
            </div>

            <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Dashboard;
