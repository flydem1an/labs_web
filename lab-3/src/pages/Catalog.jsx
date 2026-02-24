import React, { useState } from 'react';
import CarCard from '../components/CarCard';
import BookingModal from '../components/BookingModal';

export default function Catalog() {
    const cars = [
        {
            id: 1,
            brand: "Toyota",
            model: "Camry",
            price: 1200,
            image: "/images/toyota-camry.jpg",
            transmission: "Автомат",
            rating: 4.8
        },
        {
            id: 2,
            brand: "BMW",
            model: "3 Series",
            price: 2500,
            image: "/images/bmw-3-series.jpg",
            transmission: "Автомат",
            rating: 5.0
        },
        {
            id: 3,
            brand: "Renault",
            model: "Logan",
            price: 800,
            image: "/images/renault-logan.jpg",
            transmission: "Механіка",
            rating: 4.5
        },
        {
            id: 4,
            brand: "Mercedes",
            model: "Vito",
            price: 1000,
            image: "/images/mercedes-vito.jpg",
            transmission: "Механіка",
            rating: 4.7
        },
        {
            id: 5,
            brand: "Audi",
            model: "A5",
            price: 3000,
            image: "/images/audi-a5.jpg",
            transmission: "Автомат",
            rating: 4.9
        },
        {
            id: 6,
            brand: "Skoda",
            model: "Octavia",
            price: 900,
            image: "/images/skoda-octavia.jpg",
            transmission: "Механіка",
            rating: 4.6
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("default");
    const [category, setCategory] = useState("all");

    const [selectedCar, setSelectedCar] = useState(null);


    const filteredCars = cars.filter(car => {
        const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.model.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = category === "all" || car.transmission === category;

        return matchesSearch && matchesCategory;
    });

    const sortedCars = [...filteredCars].sort((a, b) => {
        if (sortType === "priceAsc") return a.price - b.price;
        if (sortType === "priceDesc") return b.price - a.price;
        if (sortType === "rating") return b.rating - a.rating;
        return 0;
    });


    const handleRentClick = (car) => setSelectedCar(car);
    const handleCloseModal = () => setSelectedCar(null);

    return (
        <div className="container">
            <section>
                <h2>Наш автопарк</h2>

                <div className="catalog-controls">
                    <input
                        type="text"
                        placeholder="Пошук (напр. BMW)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">Всі авто</option>
                        <option value="Автомат">Тільки Автомат</option>
                        <option value="Механіка">Тільки Механіка</option>
                    </select>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="default">За замовчуванням</option>
                        <option value="priceAsc">Спочатку дешевші</option>
                        <option value="priceDesc">Спочатку дорогі</option>
                        <option value="rating">За рейтингом</option>
                    </select>
                </div>

                <div className="car-grid">
                    {sortedCars.length > 0 ? (
                        sortedCars.map((car) => (
                            <CarCard key={car.id} car={car} onRent={handleRentClick} />
                        ))
                    ) : (
                        <p style={{textAlign: 'center', width: '100%', fontSize: '1.2rem'}}>
                            За вашим запитом нічого не знайдено 😢
                        </p>
                    )}
                </div>
            </section>

            <BookingModal
                car={selectedCar}
                isOpen={!!selectedCar}
                onClose={handleCloseModal}
            />
        </div>
    );
}