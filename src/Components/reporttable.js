import React, { useState, useEffect } from 'react';
import './reporttable.css';
import axios from 'axios';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('all');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/requests/'); // Replace with your backend API endpoint
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
                // Handle error state or logging as needed
            }
        };

        fetchReports();
    }, []);

    const filterReports = () => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return reports.filter((report) => {
            const started = new Date(report.startDate);
            return (!fromDate || started >= from) && (!toDate || started <= to);
        });
    };
    const formatReturnTime = (returnTime) => {
        const date = new Date(returnTime);
        return date.toString().split(' GMT')[0];
    };

    const renderTable = () => {
        const filteredReports = filterReports().filter(report => {
            switch (selectedReport) {
                case 'all':
                    return true;
                case 'delayed':
                    return report.delay;
                case 'notReturned':
                    return !report.returned;
                case 'returned':
                    return report.returned;
                default:
                    return false;
            }
        });

        const filteredRows = filteredReports.map((report, index) => (
            <tr key={index}>
                <td>{report.name}</td>
                <td>{report.rollno}</td>
                <td>{report.hostelid}</td>
                <td>{report.requestType}</td>
                <td>{report.startDate} - {report.fromTime}</td>
                <td>{report.endDate} - {report.toTime}</td>
                <td>{report.return_time ? formatReturnTime(report.return_time) : 'N/A'}</td>
                <td style={{ color: report.delay ? 'red' : 'green' }}>
                    {report.delay ? 'Delayed' : 'Not Delayed'}
                </td>
                <td>{report.acceptedBy}</td>
            </tr>
        ));

        return (
            <>
                <h3>{selectedReport.charAt(0).toUpperCase() + selectedReport.slice(1)} Reports</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Hostel ID</th>
                            <th>Request Type</th>
                            <th>Started</th>
                            <th>Ended</th>
                            <th>Returned</th>
                            <th>Delayed</th>
                            <th>Accepted By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows}
                    </tbody>
                </table>
            </>
        );
    };

    return (
        <div className="requests-report">
            <h2>Student Request Reports</h2>
            <div className="toggle-buttons">
                <button onClick={() => setSelectedReport('all')}>All Reports</button>
                <button onClick={() => setSelectedReport('delayed')}>Delayed</button>
                <button onClick={() => setSelectedReport('notReturned')}>Not Returned</button>
                <button onClick={() => setSelectedReport('returned')}>Returned</button>
            </div>
            <div className="date-filters">
                <label>
                    From Date:
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </label>
                <label>
                    To Date:
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </label>
            </div>
            <div>
                {renderTable()}
            </div>
        </div>
    );
};

export default Reports;
