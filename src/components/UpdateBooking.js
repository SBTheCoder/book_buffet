import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        buffetName: "",
        bookedOn: "",
        emailId: "",
        plateCount: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const url = `http://localhost:4000/bookings/${id}`;

    // Fetch the booking data by ID on component mount
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setBooking(response.data);
            })
            .catch(error => {
                setErrorMessage("Failed to fetch booking details");
                console.error(error);
            });
    }, [url]);

    // Update the booking details
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(url, booking);
            setSuccessMessage("Booking updated successfully");
            setErrorMessage("");
            setTimeout(() => navigate('/'), 2000); // Navigate back after 2 seconds
        } catch (error) {
            setErrorMessage("Failed to update booking");
            console.error(error);
        }
    };

    // Handle changes to form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
    };

    return (
        <div className="container mt-4">
            <h3>Update Booking</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Buffet Name</label>
                    <select
                        name="buffetName"
                        className="form-control"
                        value={booking.buffetName}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a buffet</option>
                        <option value="SouthIndianFestivalSpecial">South Indian Festival Special</option>
                        <option value="NorthIndianFestivalSpecial">North Indian Festival Special</option>
                        <option value="ChineseSpecial">Chinese Special</option>
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label>Email ID</label>
                    <input
                        type="email"
                        name="emailId"
                        className="form-control"
                        placeholder="Enter email"
                        value={booking.emailId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Plate Count</label>
                    <input
                        type="number"
                        name="plateCount"
                        className="form-control"
                        placeholder="Number of plates"
                        value={booking.plateCount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <label>Booking Date</label>
                    <input
                        type="date"
                        name="bookedOn"
                        className="form-control"
                        value={booking.bookedOn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Booking</button>
                {successMessage && <p className="text-success mt-2">{successMessage}</p>}
                {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UpdateBooking;
