import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import '../styles/styleReservar.css';
import { Carousel } from 'react-bootstrap';
import IglesiaDeSantiago from '../img/IglesiaDeSantiago.jpg';
import SantaMaria from '../img/SantaMaria.jpg';
import SanJorge from '../img/SanJorge.jpg';
import SantoDomingo from '../img/SantoDomingo.jpg';

function Reservar2() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [occupiedDays, setOccupiedDays] = useState([]);
    const [occupiedTimes, setOccupiedTimes] = useState({});

    useEffect(() => {
        if (selectedDate !== null) {
            fetchAvailableTimes(selectedDate);
        }
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(""); // Limpiar la hora seleccionada al cambiar la fecha
    };

    const fetchAvailableTimes = (date) => {
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const times = occupiedTimes[formattedDate] ? occupiedTimes[formattedDate] : [];
        setAvailableTimes(times);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleReservation = () => {
        if (!selectedTime) {
            enqueueSnackbar("Por favor, seleccione una hora.", { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
            return;
        }

        const formattedDate = selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

        setOccupiedTimes((prev) => ({
            ...prev,
            [formattedDate]: [...(prev[formattedDate] || []), selectedTime]
        }));

        setOccupiedDays((prev) => [...new Set([...prev, formattedDate])]);

        enqueueSnackbar(`Reserva realizada para el ${formattedDate} a las ${selectedTime}`, {
            variant: 'success',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            onClose: () => navigate('/pasarela-de-pago')
        });
    };

    const tileDisabled = ({ date }) => {
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return occupiedDays.includes(formattedDate);
    };

    const tileClassName = ({ date }) => {
        const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        return occupiedDays.includes(formattedDate) ? 'occupied-day' : null;
    };

    return (
        <div className="reservar-container">
            <div className="carousel-container">
                <Carousel interval={ 3000 } slide={ false } fade={ false }>
                    <Carousel.Item>
                        <img src={ IglesiaDeSantiago } alt="Imagen Iglesia De Santiago" className='imgCarrusel'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ SantaMaria } alt="Imagen Santa Maria" className='imgCarrusel'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ SanJorge } alt="Imagen San Jorge" className='imgCarrusel'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={ SantoDomingo } alt="Imagen Santo Domingo" className='imgCarrusel'/>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="calendar-container">
                <h2>Seleccione su fecha y hora</h2>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                />
                {selectedDate !== null && (
                    <div className="form-container">
                        <h2>Seleccione su hora</h2>
                        <div className="time-selector">
                            <select value={selectedTime} onChange={handleTimeChange}>
                                <option value="">Seleccione una hora</option>
                                {availableTimes.length > 0 ? (
                                    availableTimes.map((time, index) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))
                                ) : (
                                    <>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="13:00">13:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                        <option value="17:00">17:00</option>
                                        <option value="18:00">18:00</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <button onClick={handleReservation} className="btn-reservar">Reservar</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Reservar2 />
        </SnackbarProvider>
    );
}
