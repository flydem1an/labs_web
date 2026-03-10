import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Catalog() {
    const [cars, setCars] = useState([]); 

    const [searchTerm, setSearchTerm] = useState('');
    const [filterTransmission, setFilterTransmission] = useState('Всі авто');
    const [sortOption, setSortOption] = useState('За замовчуванням');
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "cars"));
                const carsData = [];
                querySnapshot.forEach((doc) => {
                    carsData.push({ id: doc.id, ...doc.data() });
                });
                setCars(carsData);
            } catch (error) {
                console.error("Помилка при завантаженні машин:", error);
            }
        };

        fetchCars();
    }, []);

    const handleRentClick = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    const filteredCars = cars.filter(car => {
        const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              car.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTransmission = filterTransmission === 'Всі авто' || car.transmission === filterTransmission;
        return matchesSearch && matchesTransmission;
    }).sort((a, b) => {
        if (sortOption === 'Від дешевих до дорогих') return a.price - b.price;
        if (sortOption === 'Від дорогих до дешевих') return b.price - a.price;
        return 0;
    });

    return (
        <div className="catalog-page">
            <div className="container">
                <h2 style={{ textAlign: 'center', margin: '30px 0' }}>Наш автопарк</h2>
                
                <div className="filters" style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <input 
                        type="text" 
                        placeholder="Пошук (напр. BMW)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <select value={filterTransmission} onChange={(e) => setFilterTransmission(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="Всі авто">Всі авто</option>
                        <option value="Автомат">Автомат</option>
                        <option value="Механіка">Механіка</option>
                    </select>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="За замовчуванням">За замовчуванням</option>
                        <option value="Від дешевих до дорогих">Від дешевих до дорогих</option>
                        <option value="Від дорогих до дешевих">Від дорогих до дешевих</option>
                    </select>
                </div>

                <div className="cars-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {filteredCars.length > 0 ? (
                        filteredCars.map(car => (
                            <CarCard key={car.id} car={car} onRent={handleRentClick} />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Завантаження машин...</p>
                    )}
                </div>

                {isModalOpen && (
                    <BookingModal 
                        car={selectedCar} 
                        isOpen={isModalOpen} 
                        onClose={closeModal} 
                    />
                )}
            </div>
        </div>
    );
}