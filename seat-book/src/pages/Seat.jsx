import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart.jsx';


function Seat() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();


    const handleSeatClick = (seatId) => {
        const isSelected = selectedSeats.includes(seatId);

        setSelectedSeats((prevSelectedSeats) =>
            isSelected
                ? prevSelectedSeats.filter((seat) => seat !== seatId)
                : [...prevSelectedSeats, seatId]
        );
    };



    // ... (existing code)

    const handleCart = () => {
        // Redirect to the payment page
        // navigate('/cart');
        navigate('/cart', { state: { selectedSeats } });
        

    };

    const renderSeats = () => {
        const totalRows = 4; // Number of rows
        const seatsPerRow = 10; // Number of seats in each row

        const seats = [];

        for (let i = 0; i < totalRows; i++) {
            const rowSeats = [];
            const seatRowId = String.fromCharCode(65 + i);
            // Convert index to letter (A, B, C, ...)

            rowSeats.push(
                <div key={seatRowId} className="row-label text-lg font-bold p-2 m-1">
                    {seatRowId}
                </div>
            );

            for (let j = 0; j < seatsPerRow; j++) {
                const fullSeatId = (j + 1); // Display seat numbers from 1 to 10

                const isSelected = selectedSeats.includes(`${seatRowId}${fullSeatId}`);
                // console.log(`${seatRowId}${fullSeatId}`);

                rowSeats.push(
                    <div
                        key={fullSeatId}
                        className={`seat ${isSelected ? 'bg-green-500' : 'bg-gray-200'} p-2 m-1 cursor-pointer`}
                        style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onClick={() => handleSeatClick(`${seatRowId}${fullSeatId}`)}
                    >
                        {fullSeatId}
                    </div>
                );
            }

            seats.push(
                <div key={seatRowId} className="flex flex-row items-center space-x-8 ">
                    {rowSeats}
                </div>
            );
        }

        return seats;
    };

    // ... (existing code)

    const totalPayment = selectedSeats.length * 150;

    return (

        <>

            <div className="container mx-auto mt-8 flex justify-center items-center">
                <div className="screen mb-4"></div>
                <div className="flex flex-col space-y-2">
                    {renderSeats()}
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="container mx-auto mb-4 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded m-10" onClick={handleCart}>
                        Pay Rs. {totalPayment}
                    </button>
                </div>
            )}

        </>

    );
}



export default Seat;
