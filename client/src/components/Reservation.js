import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Reservation() {
  const [size, setSize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col justify-center items-center font-header text-primary">
        <h1 className="relative flex items-center align w-3/4 lg:w-2/4 lg:mx-auto mx-5 font-header -mt-10 lg:my-8">
          <div className="flex-grow border-t border-primary"></div>
          <span className="flex-shrink text-primary font-header text-4xl">
            Make a Reservation
          </span>
          <div className="flex-grow border-t border-primary"></div>
        </h1>
        <div className="w-4/5 md:w-1/2 shadow-2xl mt-12">
          <form className=" p-3 w-11/12 mx-auto mt-2 flex flex-col justify-evenly items-start">
            {/* <input
              className="w-full my-3 border-b-2 focus:outline-none"
              type="number"
              name="size"
              id="size"
              placeholder="Party Size"
              value={size}
              onChange={handleSizeChange}
              required
            /> */}
            <select
              name="size"
              id="size"
              className="bg-white w-full my-3 border-b-2 focus:outline-none"
            >
              {size === "" && (
                <option value="" disabled>
                  Party Size
                </option>
              )}
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8 People</option>
              <option value="9">9 People</option>
              <option value="10">10 People</option>
              <option value="11">11 People</option>
              <option value="12">12 People</option>
              <option value="13">13 People</option>
              <option value="14">14 People</option>
              <option value="15">15 People</option>
            </select>
            <input
              type="date"
              name="Date"
              id="date"
              className="bg-white w-full my-3 border-b-2 focus:outline-none placeholder:text-mainText"
              placeholder="Date of Reservation"
              onChange={handleDateChange}
              value={date}
              required
            />
            <input
              type="time"
              name="time"
              id="time"
              className="bg-white w-full my-3 border-b-2 focus:outline-none placeholder:text-mainText"
              placeholder="Time of Arrival"
              onChange={handleTimeChange}
              value={time}
              required
            />
            <button type="submit" className="btn w-full mt-4">
              Book now
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Reservation;
