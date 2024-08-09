import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { formatDisplayDate } from "../utils/dateUtils";
import Loader from '../components/Loader';
import "../styles/loader.css";
import '../styles/Seat.css';

function Seat() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [isLoadingSeats, setIsLoadingSeats] = useState(true);
  const [isLoadingTimeSlots, setIsLoadingTimeSlots] = useState(false);
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedMovie, movieTitle, movieImage } = location.state || {};

  useEffect(() => {
    const fetchSeatsData = async () => {
      setIsLoadingSeats(true);
      try {
        const response = await axios.get(
          `https://ticket-booking-tl5b.onrender.com/movies/${movieId}`
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
        setIsLoadingSeats(false);
      }
    };

    fetchSeatsData();
  }, [movieId]);

  const handleSelect = async (date, timeSlot = null) => {
    setIsLoadingTimeSlots(true);
    setIsLoadingSeats(true);
    setSelectedDate(date);
    setSelectedSeats([]);

    try {
      const response = await axios.get(
        `https://ticket-booking-tl5b.onrender.com/movies/${movieId}/timeslots/${date}`
      );
      const timeSlots = response.data.timeSlots;

      if (timeSlots.length > 0) {
        const times = timeSlots.map((slot) => slot.timeSlot);
        setAvailableTimeSlots(times);

        const newSelectedTimeSlot = timeSlot ? timeSlot : times[0];
        setSelectedTimeSlot(newSelectedTimeSlot);

        const selectedTimeSlotData = timeSlots.find((slot) => slot.timeSlot === newSelectedTimeSlot);
        const seatsForSelectedSlot = selectedTimeSlotData ? selectedTimeSlotData.seats : [];
        setSeatsData(seatsForSelectedSlot);
      } else {
        console.log("No time slots available for selected date.");
      }
    } catch (error) {
      console.error("Error fetching time slots:", error);
    } finally {
      setIsLoadingTimeSlots(false);
      setIsLoadingSeats(false);
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
        movieImage,
      },
    });
  };

  const handleSeatHover = (seatId) => {
    setHoveredSeat(seatId);
  };

  const handleSeatLeave = () => {
    setHoveredSeat(null);
  };

  const renderSeats = () => {
    if (isLoadingSeats) {
      return <Loader />;
    }

    if (seatsData.length === 0) {
      return <p>Loading...</p>;
    }

    const seatsRows = [];
    const rows = {};

    seatsData.forEach((seat) => {
      if (!rows[seat.seatRow]) {
        rows[seat.seatRow] = [];
      }
      rows[seat.seatRow].push(seat);
    });

    Object.keys(rows).forEach((row) => {
      const rowSeats = rows[row];
      seatsRows.push(
        <div key={row} className="flex justify-center mb-1">
          <div className="mr-2 font-medium items-center text-xs text-gray-400">
            {row}
          </div>
          <div className="flex">
            {rowSeats.map((seat) => (
              <button
                key={seat._id}
                className={`seat w-6 h-6 mb-1 mx-1 p-1 rounded-sm flex items-center justify-center text-xs ${
                  !seat.available 
                    ? "bg-gray-300"
                    : selectedSeats.includes(seat._id)
                    ? "bg-gray-800 text-white"
                    : "bg-white border border-black text-transparent hover:bg-gray-800 hover:text-white"
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
        </div>
      );
    });

    return seatsRows;
  };

  const totalPayment = selectedSeats.length * 150;

  return (
    <div className="relative container mx-auto mt-4 pb-16 seat-container">
      <h1 className="text-xl my-2 text-center">{movieTitle}</h1>
      <div className="flex justify-center flex-wrap">
        <div className="mr-4 date-selection">
          <h2 className="text-md font-semibold mb-2">Select Date:</h2>
          <div className="flex flex-wrap">
            {availableDates.map((date) => (
              <button
                key={date}
                className={`px-2 py-1 rounded-full mr-2 mb-2 text-xs ${
                  selectedDate === date
                    ? "bg-gray-800 text-white"
                    : "bg-white border border-black text-black"
                }`}
                onClick={() => handleDateSelect(date)}
              >
                {formatDisplayDate(date)}
              </button>
            ))}
          </div>
        </div>
        <div className="time-section">
          <h2 className="text-md font-semibold mb-2 ">Select Time Slot:</h2>
          <div className="flex flex-wrap ">
            {isLoadingTimeSlots ? (
              <Loader />
            ) : (
              availableTimeSlots.map((timeSlot) => (
                <button
                  key={timeSlot}
                  className={`px-2 py-1 rounded-full mr-2 mb-2 text-xs ${
                    selectedTimeSlot === timeSlot
                      ? "bg-gray-800 text-white"
                      : "bg-white border border-black text-black"
                  }`}
                  onClick={() => handleTimeSlotSelect(timeSlot)}
                >
                  {timeSlot}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex flex-col items-center seat-layout">
        <div className="flex flex-col space-y-2">
          {renderSeats()}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2 z-10">
          <button
            className="font-extrabold px-4 py-2 rounded-md "
            onClick={handleCart}
          >
            Pay ₹{totalPayment}
          </button>
        </div>
      )}

      <div className="relative bottom-0 left-0 right-0 top-10 flex justify-center mb-14 z-0">
        <img
          src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg"
          alt="Movies Screen Icon"
          width="375"
          height="44"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default Seat;
