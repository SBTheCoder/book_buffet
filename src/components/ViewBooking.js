import axios from 'axios';
import React, { useState } from 'react';

const url = "http://localhost:4000/bookings/";

const ViewBooking = () => {
    const [state, setState] = useState({
        bookingId: "",
        bookingDate: "",
        infoMessage: "",
    });
    const [messages] = useState({
        INFO: "The booking has been deleted! Please refresh the page.",
    });

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    // Get booking by ID
    const getBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${url}${state.bookingId}`);
            setState({
                ...state,
                bookingDate: response.data.bookedOn,
                buffetName: response.data.buffetName,
                emailId: response.data.emailId,
                plateCount: response.data.plateCount,
                infoMessage: "Booking fetched successfully",
            });
        } catch (err) {
            console.error("Error fetching booking:", err);
            setState({ ...state, infoMessage: "Booking not found or an error occurred!" });
        }
    };

    // Delete booking by ID
    const deleteBooking = async () => {
        try {
            await axios.delete(`${url}${state.bookingId}`);
            setState({ ...state, infoMessage: messages.INFO });
        } catch (err) {
            console.error("Error deleting booking:", err);
            setState({ ...state, infoMessage: "Error deleting booking" });
        }
    };

    // Update booking
    const updateBooking = async () => {
        const updatedData = {
            buffetName: state.buffetName,
            bookedOn: state.bookingDate,
            emailId: state.emailId,
            plateCount: state.plateCount,
        };
        try {
            await axios.put(`${url}${state.bookingId}`, updatedData);
            setState({ ...state, infoMessage: "Booking updated successfully!" });
        } catch (err) {
            console.error("Error updating booking:", err);
            setState({ ...state, infoMessage: "Error updating booking" });
        }
    };

    return (
        <React.Fragment>
            <div className='row'>
                <div className='col-md-10 offset-md-1'>
                    <br />
                    <div className='card'>
                        <div className='card-header bg-custom'>
                            <h4>View Booking</h4>
                        </div>
                        <div className='card-body view'>
                            <form className='form' onSubmit={getBooking}>
                                <div className='form-group'>
                                    <label>Booking Id</label>
                                    <input
                                        type="text"
                                        name="bookingId"
                                        placeholder='Enter a booking id'
                                        value={state.bookingId}
                                        onChange={handleChange}
                                    />
                                    <button type="submit" className='btn btn-primary mt-2'>Get Booking</button>
                                </div>
                                {state.infoMessage && <p className='text-info mt-2'>{state.infoMessage}</p>}
                                <table className='table bordered'>
                                    <thead className='thead'>
                                        <tr>
                                            <th>Booking Id</th>
                                            <th>Buffet Name</th>
                                            <th>Email Id</th>
                                            <th>Plate Count</th>
                                            <th>Booking Date</th>
                                            <th>Action Items</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{state.bookingId}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="buffetName"
                                                    value={state.buffetName || ''}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="emailId"
                                                    value={state.emailId || ''}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="plateCount"
                                                    value={state.plateCount || ''}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="bookingDate"
                                                    value={state.bookingDate || ''}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className='btn btn-danger mt-2 ms-2'
                                                    onClick={deleteBooking}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className='btn btn-success mt-2 ms-2'
                                                    onClick={updateBooking}
                                                >
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ViewBooking;
