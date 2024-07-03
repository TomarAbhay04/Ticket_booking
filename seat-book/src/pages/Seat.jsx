import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function Seat() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [seatsData, setSeatsData] = useState([]);
    const [hoveredSeat, setHoveredSeat] = useState(null);
    const { movieId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedMovie, movieTitle} = location.state || {};
                               
    useEffect(() => {
        console.log(movieTitle, selectedMovie);
        const fetchSeatsData = async () => {
            try {
                const response = await axios.get(`https://ticket-booking-backend-rylx.onrender.com/movies/${movieId}`);
                const movie = response.data.movie
                if (movie) {
                    const availableTimeSlots = movie.availableSlots;
                    const dates = availableTimeSlots.map(slot => slot.date);
                    setAvailableDates(dates);
                    setSelectedDate(dates[0]);
                    const timeSlotsForSelectedDate = availableTimeSlots.find(slot => slot.date === dates[0]).timeSlots;
                    const times = timeSlotsForSelectedDate.map(slot => slot.timeSlot);
                    setAvailableTimeSlots(times);
                    setSelectedTimeSlot(times[0]);
                    // console.log(selectedTimeSlot)
                    const seatsForSelectedSlot = timeSlotsForSelectedDate.find(slot => slot.timeSlot === times[0]).seats;
                    setSeatsData(seatsForSelectedSlot);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSeatsData();
    }, [movieId]);

    const handleSelect = async (date, timeSlot = null) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null);
    
        try {
            const response = await axios.get(`https://ticket-booking-backend-rylx.onrender.com/movies/${movieId}/timeslots/${date}`);
            const timeSlots = response.data.timeSlots;
    
            if (timeSlots.length > 0) {
                const times = timeSlots.map(slot => slot.timeSlot);
                setAvailableTimeSlots(times);
                setSelectedTimeSlot(timeSlot ? timeSlot : times[0]);
    
                const selectedTimeSlotData = timeSlot ? timeSlots.find(slot => slot.timeSlot === timeSlot) : timeSlots[0];
                const seatsForSelectedSlot = selectedTimeSlotData.seats;
                setSeatsData(seatsForSelectedSlot);
            } else {
                console.log("No time slots available for selected date.");
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };
    
    const handleDateSelect = async (date) => {
        await handleSelect(date);
    };
    
    const handleTimeSlotSelect = async (timeSlot) => {
        await handleSelect(selectedDate, timeSlot);
    };
    

    const handleSeatClick = (seatId) => {
        setSelectedSeats(prevSelectedSeats => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter(seat => seat !== seatId);
            } else {
                return [...prevSelectedSeats, seatId];
            }
        });
    };

    const handleCart = () => {
        const selectedSeatDetails = selectedSeats.map(seatId => {
            return seatsData.find(seat => seat._id === seatId);
        });
        navigate('/cart', { state: { selectedSeats: selectedSeatDetails, movieTitle,selectedMovie,selectedDate, selectedTimeSlot,  } });
    };
    
    const handleSeatHover = (seatId) => {
        setHoveredSeat(seatId); // Set the currently hovered seat ID
    };

    const handleSeatLeave = () => {
        setHoveredSeat(null); // Reset the currently hovered seat ID
    };

    const renderSeats = () => {
        if (seatsData.length === 0) {
            return <p>Loading...</p>;
        }
    
        const seatsRows = [];
        // const seatsPerRow = 10; // Number of seats per row
        const rows = {}; // Object to group seats by row
    
        // Group seats by row
        seatsData.forEach(seat => {
            if (!rows[seat.seatRow]) {
                rows[seat.seatRow] = [];
            }
            rows[seat.seatRow].push(seat);
        });
    
        // Iterate through each row and render seat buttons
        Object.keys(rows).forEach(row => {
            const rowSeats = rows[row];
            seatsRows.push(
                <div key={row} className="flex justify-center mb-1">
                    <div className="mr-8 font-medium items-center text-md text-gray-400 ">{row}</div> {/* Display row label */}
                    {rowSeats.map(seat => (
                        <button
                            key={seat._id}
                            className={`seat ${seat.available ? 'bg-gray-300 border-solid border-green-500' : 'bg-gray-300'} ${selectedSeats.includes(seat._id) ? 'bg-green-500' : ''} ${hoveredSeat === seat._id ? 'bg-green-500' : '' } w-7 h-7 mb-1 mx-2 p-2 rounded-md flex items-center justify-center text-xs text-green-800 `}
                            disabled={!seat.available}
                            onClick={() => handleSeatClick(seat._id)}
                            onMouseEnter={() => handleSeatHover(seat._id)} // Add onMouseEnter event listener
                            onMouseLeave={() => handleSeatLeave(seat._id)}
                        >
                            {seat.seatNumber}
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
            <h1 className='text-xl my-2 text-center'> {movieTitle}</h1> 
            {/* {console.log(movieTitle)} */}
            <div className="flex justify-center ">
                <div className="mr-4"> 
                    <h2 className="text-md font-semibold mb-2">Select Date:</h2>
                    <div className="flex flex-wrap">
                        {availableDates.map(date => (
                            <button
                                key={date}
                                className={`bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2 ${selectedDate === date ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleDateSelect(date)}
                            >
                                {date}
                                {/* console.log(date) */}
                            </button>
                        ))}
                    </div>
                </div>
                <div> 
                    <h2 className="text-md font-semibold mb-2">Select Time Slot:</h2>
                    <div className="flex flex-wrap">
                        {availableTimeSlots.map(timeSlot => (
                            <button
                                key={timeSlot}
                                className={`bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2 ${selectedTimeSlot === timeSlot ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleTimeSlotSelect(timeSlot)}
                            >
                                {timeSlot}
                                {/* console.log(timeSlot) */}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-8 flex justify-center items-center">
                <div className="screen mb-4"></div>
                <div className="flex flex-col space-y-3">
                    {renderSeats()}
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="container mx-auto mb-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded m-10" onClick={handleCart}>
                        Pay Rs. {totalPayment}
                        {/* console.log(totalPayment) */}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Seat;
