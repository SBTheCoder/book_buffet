import React, { useState } from "react";
import { validation } from "../validators/validation";

const BookingComponent = () => {
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

    const [messages] = useState({
        "EMAILID_ERROR": "Please enter a valid email",
        "PLATE_COUNT_ERROR": "Plate count(s) should be 1 or more",
        "BUFFET_NAME_ERROR": "Please select buffet type",
        "BOOKED_ON_ERROR": "Booking date should be after today's date",
        "ERROR": "Something went wrong",
        "MANDATORY": "Enter all the form fields"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const validateField = (name, value) => {
        let errors = formErrors;
        switch (name) {
            case "buffetName": if (!validation.validateBuffet(value)) {
                errors.buffetNameError = messages.BUFFET_NAME_ERROR;
            }
            else {
                errors.buffetNameError = "";
            }
                break;
            case "emailId": if (validation.validEmail(value) === false) {
                errors.emailIdError = messages.EMAILID_ERROR;
            }
            else {
                errors.emailIdError = "";
            }
                break;
            case "plateCount": if (!validation.validPlateCount(value)) {
                errors.plateCountError = messages.PLATE_COUNT_ERROR;
            }
            else {
                errors.plateCountError = "";
            }
                break;
            case "bookedOn": if (!validation.validDate(value)) {
                errors.bookedOnError = messages.BOOKED_ON_ERROR;
            }
            else {
                errors.bookedOnError = "";
            }
                break;
            default:
                break;


        }
        if (Object.values(errors).every((value) => value === "")) {
            setValid(true);
        }
        else {
            setValid(false);
        }
        setFormErrors({ ...formErrors, [name]: value });
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        validateField(name, value);
        return setState({ ...state, [name]: value });
    }
    const handleClick = (e)=>{
        let {name , value} = e.target;
        validateField(name, value);
    }

    return (
        <React.Fragment>
            <div className="CreateBooking" >
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br />
                        <div className="card" style={{background: "#4abcf6"}}>
                            <div className="card-header bg-custom">
                                <h4 style={{background:"pink"}} >Book Your Buffet </h4>

                            </div>
                            <div className="card-body">
                                <form className="form" onSubmit={(event) => { handleSubmit() }}>
                                    <div className="form-group">
                                        <label> Buffet Name</label>
                                        <select name="buffetName" className="form-control" value={state.buffetName} onChange={handleChange} >
                                            <option value='' disabled>Select a buffet</option>
                                            <option value='SouthIndianFestivalSpecial'>South Indian Festival Special</option>
                                            <option value='NorthIndianFestivalSpecial'>North Indian Festival Special</option>
                                            <option value='ChineseSpecial'>Chinese Special</option>
                                        </select>
                                        {formErrors.buffetNameError ? <span className="text-danger">{messages.BUFFET_NAME_ERROR}</span> : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Id</label>
                                        <input type="email" name="emailId" className="form-control" placeholder="Enter your email"
                                            value={state.emailId} onChange={handleChange} onClick={handleClick} required />
                                        {formErrors.emailIdError ? <span className="text-danger">{messages.EMAILID_ERROR}</span> : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Plate Count</label>
                                        <input type="number" name="plateCount" className="form-control" placeholder="Number of plates" value={state.plateCount} onChange={handleChange} required />
                                        {formErrors.plateCountError ? <span className="text-danger">{messages.PLATE_COUNT_ERROR}</span> : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Booking Date</label>
                                        <input type="date" name="bookedOn" className="form-control" value={state.bookedOn} onChange={handleChange} required />
                                        {formErrors.bookedOnError ? <span className="text-danger">{messages.BOOKED_ON_ERROR}</span> : null}
                                    </div>
                                    <br />
                                    <button type="submit" name="active" className="btn-btn-primary" style={{background:"lightgreen"}}>Book Buffet</button>
                                    {mandatory ? <div id="mandatory" className="text-danger">{messages.MANDATORY}</div> : null}
                                    {errorMessage ? <div id="error" className="text-danger">{messages.ERROR}</div> : null}
                                    {successMessage ? <div id="success" className="text-success">Booked successfully</div> : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default BookingComponent;
