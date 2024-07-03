import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { formatDisplayDate } from "../utils/dateUtils";

function Seat() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedMovie, movieTitle } = location.state || {};

  useEffect(() => {
    const fetchSeatsData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          `https://ticket-booking-backend-rylx.onrender.com/movies/${movieId}`
        );
        const movie = response.data.movie;
        if (movie) {
          const availableTimeSlots = movie.availableSlots;
          const dates = availableTimeSlots.map((slot) => slot.date);
          setAvailableDates(dates);
          setSelectedDate(dates[0]);
          const timeSlotsForSelectedDate = availableTimeSlots.find(
            (slot) => slot.date === dates[0]
          ).timeSlots;
          const times = timeSlotsForSelectedDate.map((slot) => slot.timeSlot);
          setAvailableTimeSlots(times);
          setSelectedTimeSlot(times[0]);
          const seatsForSelectedSlot = timeSlotsForSelectedDate.find(
            (slot) => slot.timeSlot === times[0]
          ).seats;
          setSeatsData(seatsForSelectedSlot);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchSeatsData();
  }, [movieId]);

  const handleSelect = async (date, timeSlot = null) => {
    setIsLoading(true); // Start loading
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
    setSelectedSeats([]); // Clear selected seats

    try {
      const response = await axios.get(
        `https://ticket-booking-backend-rylx.onrender.com/movies/${movieId}/timeslots/${date}`
      );
      const timeSlots = response.data.timeSlots;

      if (timeSlots.length > 0) {
        const times = timeSlots.map((slot) => slot.timeSlot);
        setAvailableTimeSlots(times);
        const selectedTimeSlotData = timeSlot
          ? timeSlots.find((slot) => slot.timeSlot === timeSlot)
          : timeSlots[0];
        const seatsForSelectedSlot = selectedTimeSlotData.seats;
        setSeatsData(seatsForSelectedSlot);
      } else {
        console.log("No time slots available for selected date.");
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleDateSelect = async (date) => {
    await handleSelect(date, null);
  };

  const handleTimeSlotSelect = async (timeSlot) => {
    await handleSelect(selectedDate, timeSlot);
  };

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const handleCart = () => {
    const selectedSeatDetails = selectedSeats.map((seatId) => {
      return seatsData.find((seat) => seat._id === seatId);
    });
    navigate("/cart", {
      state: {
        selectedSeats: selectedSeatDetails,
        movieTitle,
        selectedMovie,
        selectedDate,
        selectedTimeSlot,
      },
    });
  };

  const handleSeatHover = (seatId) => {
    setHoveredSeat(seatId); // Set the currently hovered seat ID
  };

  const handleSeatLeave = () => {
    setHoveredSeat(null); // Reset the currently hovered seat ID
  };

  // Function to format the date
//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
//     const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

//     const dayOfWeek = daysOfWeek[date.getUTCDay()];
//     const day = date.getUTCDate();
//     const month = months[date.getUTCMonth()];

//     return `${dayOfWeek} ${day} ${month}`;
//   };

  const renderSeats = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      );
    }

    if (seatsData.length === 0) {
      return <p>Loading...</p>;
    }

    const seatsRows = [];
    const rows = {}; // Object to group seats by row

    // Group seats by row
    seatsData.forEach((seat) => {
      if (!rows[seat.seatRow]) {
        rows[seat.seatRow] = [];
      }
      rows[seat.seatRow].push(seat);
    });

    // Iterate through each row and render seat buttons
    Object.keys(rows).forEach((row) => {
      const rowSeats = rows[row];
      seatsRows.push(
        <div key={row} className="flex justify-center mb-1">
          <div className="mr-8 font-medium items-center text-md text-gray-400 ">
            {row}
          </div>{" "}
          {/* Display row label */}
          {rowSeats.map((seat) => (
            <button
              key={seat._id}
              className={`seat w-7 h-7 mb-1 mx-2 p-2 rounded-md flex items-center justify-center text-xs ${
                !seat.available 
                  ? "bg-gray-400" // Booked seats
                  : selectedSeats.includes(seat._id)
                  ? "bg-green-500 text-white" // Selected seats
                  : "bg-white border border-green-500 text-transparent" // Available seats
              }`}
              disabled={!seat.available}
              onClick={() => handleSeatClick(seat._id)}
              onMouseEnter={() => handleSeatHover(seat._id)}
              onMouseLeave={() => handleSeatLeave(seat._id)}
            >
              {!seat.available || !selectedSeats.includes(seat._id) ? "" : seat.seatNumber}
            </button>
          ))}
        </div>
      );
    });

    return seatsRows;
  };

  const totalPayment = selectedSeats.length * 150;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-xl my-2 text-center"> {movieTitle}</h1>
      <div className="flex justify-center ">
        <div className="mr-4">
          <h2 className="text-md font-semibold mb-2">Select Date:</h2>
          <div className="flex flex-wrap">
            {availableDates.map((date) => (
              <button
                key={date}
                className={`px-3 py-1 rounded-full mr-2 mb-2 ${
                  selectedDate === date
                    ? "bg-green-500 text-black"
                    : "bg-white border border-black text-black"
                }`}
                onClick={() => handleDateSelect(date)}
              >
              { formatDisplayDate(date) }
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-md font-semibold mb-2">Select Time Slot:</h2>
          <div className="flex flex-wrap">
            {availableTimeSlots.map((timeSlot) => (
              <button
                key={timeSlot}
                className={` px-3 py-1 rounded-full mr-2 mb-2 ${
                  selectedTimeSlot === timeSlot
                    ? "bg-green-500 text-black"
                    : "bg-white border border-black text-black"
                }`}
                onClick={() => handleTimeSlotSelect(timeSlot)}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex justify-center items-center">
        <div className="screen mb-4"></div>
        <div className="flex flex-col space-y-3">
          {renderSeats()}
          {selectedSeats.length > 0 && (
            <div className="text-center mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleCart}
              >
                Pay ₹{totalPayment}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Seat;

