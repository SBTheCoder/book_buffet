import React, { useState } from "react";

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
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        return setState({ ...state, [name]: value });


    }

    return (
        <React.Fragment>
            <div className="CreateBooking">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br />
                        <div className="card">
                            <div className="card-header bg-custom">
                                <h4> Book Your Buffet </h4>

                            </div>
                            <div className="card-body">
                                <form className="form" onSubmit={(event) => { }}>
                                    <div className="form-group">
                                        <label> Buffet Name</label>
                                        <select name="buffetName" className="form-control" value="">
                                            <option value=''>Select a buffet</option>
                                            <option value='SouthIndianFestivalSpecial'>South Indian Festival Special</option>
                                            <option value='NorthIndianFestivalSpecial'>North Indian Festival Special</option>
                                            <option value='ChineseSpecial'>Chinese Special</option>
                                        </select>
                                        {/* <span className="text-danger">Error bc</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Id</label>
                                        <input type="email" name="emailId" className="form-control" placeholder="Enter your email"
                                            value={state.emailId} onChange={handleChange} required />
                                        {/* <span className="text-danger">{messages.EMAILID_ERROR}</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label>Plate Count</label>
                                        <input type="number" name="plateCount" className="form-control" placeholder="Number of plates" required />
                                        {/* <span className="text-danger">{messages.PLATE_COUNT_ERROR}</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label>Booking Date</label>
                                        <input type="date" name="bookedOn" className="form-control" required />
                                    </div>
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
