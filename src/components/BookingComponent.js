import React, { useState } from "react";
import axios from "axios";
import { validation } from "../validators/validation";

const BookingComponent = () => {
    const url = "http://localhost:4000/booking/";
    const [state, setState] = useState({
        buffetName: "",
        bookedOn: "",
        emailId: "",
        plateCount: ""
    });

    const [mandatory, setMandatory] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [valid, setValid] = useState(false);

    const [formErrors, setFormErrors] = useState({
        emailIdError: "",
        plateCountError: "",
        buffetNameError: "",
        bookedOnError: ""
    });

    const messages = {
        EMAILID_ERROR: "Please enter a valid email",
        PLATE_COUNT_ERROR: "Plate count(s) should be 1 or more",
        BUFFET_NAME_ERROR: "Please select buffet type",
        BOOKED_ON_ERROR: "Booking date should be after today's date",
        ERROR: "Something went wrong",
        MANDATORY: "Enter all the form fields"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (valid) {
            try {
                const response = await axios.post(url, state);
                if (response.status === 201) {
                    setSuccessMessage("Booked successfully");
                    setErrorMessage("");
                    setMandatory(false);
                }
            } catch (error) {
                setErrorMessage(messages.ERROR);
            }
        } else {
            setMandatory(true);
            setErrorMessage(messages.MANDATORY);
        }
    };

    const validateField = (name, value) => {
        let errors = { ...formErrors };
        switch (name) {
            case "buffetName":
                errors.buffetNameError = validation.validateBuffet(value) ? "" : messages.BUFFET_NAME_ERROR;
                break;
            case "emailId":
                errors.emailIdError = validation.validEmail(value) ? "" : messages.EMAILID_ERROR;
                break;
            case "plateCount":
                errors.plateCountError = validation.validPlateCount(value) ? "" : messages.PLATE_COUNT_ERROR;
                break;
            case "bookedOn":
                errors.bookedOnError = validation.validDate(value) ? "" : messages.BOOKED_ON_ERROR;
                break;
            default:
                break;
        }

        setFormErrors(errors);
        setValid(Object.values(errors).every((error) => error === ""));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        validateField(name, value);
    };

    return (
        <React.Fragment>
            <div className="CreateBooking">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br />
                        <div className="card" style={{ background: "#f0f8ff" }}>
                            <div className="card-header bg-custom">
                                <h4 style={{ background: "#ffcccb" }}>Book Your Buffet</h4>
                            </div>
                            <div className="card-body">
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Buffet Name</label>
                                        <select
                                            name="buffetName"
                                            className="form-control"
                                            value={state.buffetName}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a buffet
                                            </option>
                                            <option value="SouthIndianFestivalSpecial">
                                                South Indian Festival Special
                                            </option>
                                            <option value="NorthIndianFestivalSpecial">
                                                North Indian Festival Special
                                            </option>
                                            <option value="ChineseSpecial">Chinese Special</option>
                                        </select>
                                        {formErrors.buffetNameError && (
                                            <span className="text-danger">
                                                {formErrors.buffetNameError}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Id</label>
                                        <input
                                            type="email"
                                            name="emailId"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={state.emailId}
                                            onChange={handleChange}
                                            required
                                        />
                                        {formErrors.emailIdError && (
                                            <span className="text-danger">
                                                {formErrors.emailIdError}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Plate Count</label>
                                        <input
                                            type="number"
                                            name="plateCount"
                                            className="form-control"
                                            placeholder="Number of plates"
                                            value={state.plateCount}
                                            onChange={handleChange}
                                            required
                                        />
                                        {formErrors.plateCountError && (
                                            <span className="text-danger">
                                                {formErrors.plateCountError}
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Booking Date</label>
                                        <input
                                            type="date"
                                            name="bookedOn"
                                            className="form-control"
                                            value={state.bookedOn}
                                            onChange={handleChange}
                                            required
                                        />
                                        {formErrors.bookedOnError && (
                                            <span className="text-danger">
                                                {formErrors.bookedOnError}
                                            </span>
                                        )}
                                    </div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ background: "#28a745", borderColor: "#28a745" }}
                                        disabled={!valid}
                                    >
                                        Book Buffet
                                    </button>
                                    {mandatory && (
                                        <div id="mandatory" className="text-danger">
                                            {messages.MANDATORY}
                                        </div>
                                    )}
                                    {errorMessage && (
                                        <div id="error" className="text-danger">
                                            {errorMessage}
                                        </div>
                                    )}
                                    {successMessage && (
                                        <div id="success" className="text-success">
                                            {successMessage}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default BookingComponent;
