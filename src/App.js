import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookingComponent from "./components/BookingComponent";
import ViewBooking from "./components/ViewBooking";
import UpdateBooking from "./components/UpdateBooking";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg p-2 navbar-dark bg-primary">
          <span className="navbar-brand">Sirsi Special Restaurant</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/BookingComponent">Book buffet</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ViewBooking">View Booking</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/Home" element={<App/>}/>
          <Route path="/BookingComponent" element={<BookingComponent />} />
          <Route path="/ViewBooking" element={<ViewBooking/>} />
          <Route path="/update-booking/:id" element={<UpdateBooking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
