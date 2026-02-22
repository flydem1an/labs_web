const cars = [
    { id: 1, brand: "Toyota", model: "Camry", price: 1200, image: "Toyota Camry", transmission: "Автомат", rating: 4.8 },
    { id: 2, brand: "BMW", model: "3 Series", price: 2500, image: "BMW 3 Series", transmission: "Автомат", rating: 5.0 },
    { id: 3, brand: "Renault", model: "Logan", price: 800, image: "Renault Logan", transmission: "Механіка", rating: 4.5 },
    { id: 4, brand: "Mercedes", model: "Vito", price: 1000, image: "Mercedes Vito", transmission: "Механіка", rating: 4.7 },
    { id: 5, brand: "Audi", model: "A5", price: 3000, image: "Audi A5", transmission: "Автомат", rating: 4.9 }
];

const carGrid = document.querySelector('.car-grid');
const bookingGrid = document.getElementById('my-bookings');
const modal = document.getElementById("bookingModal");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
let selectedCar = null;

function renderCars() {
    carGrid.innerHTML = '';
    let i = 0;
    while (i < cars.length) {
        const car = cars[i];
        const carHTML = `
            <article class="car-card">
                <div class="car-image-placeholder">${car.image}</div>
                <h3>${car.brand} ${car.model}</h3>
                <p class="price">${car.price} грн/доба</p>
                <ul class="car-details">
                    <li>Трансмісія: ${car.transmission}</li>
                    <li>Рейтинг: ⭐ ${car.rating}</li>
                </ul>
                <button class="btn-rent" onclick="openModal(${car.id})">Орендувати</button>
            </article>
        `;
        carGrid.innerHTML += carHTML;
        i++;
    }
}

renderCars();

function openModal(carId) {
    selectedCar = cars.find(c => c.id === carId);
    document.getElementById("modalTitle").innerText = `Бронювання ${selectedCar.brand} ${selectedCar.model}`;
    document.getElementById("modalPricePerDay").innerText = selectedCar.price;
    document.getElementById("modalTotalPrice").innerText = "0";
    document.getElementById("modalDays").innerText = "0";
    startDateInput.value = '';
    endDateInput.value = '';
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

startDateInput.addEventListener('change', calculatePrice);
endDateInput.addEventListener('change', calculatePrice);

function calculatePrice() {
    if (!startDateInput.value || !endDateInput.value) return;

    const start = new Date(startDateInput.value);
    const end = new Date(endDateInput.value);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
        document.getElementById("modalTotalPrice").innerText = "0";
        document.getElementById("modalDays").innerText = "Помилка дати";
        return;
    }

    const total = diffDays * selectedCar.price;
    document.getElementById("modalDays").innerText = diffDays;
    document.getElementById("modalTotalPrice").innerText = total;
}

function confirmBooking() {
    const total = document.getElementById("modalTotalPrice").innerText;

    if (total === "0" || document.getElementById("modalDays").innerText === "Помилка дати") {
        alert("Будь ласка, виберіть коректні дати!");
        return;
    }

    const bookingHTML = `
        <div class="booking-item">
            <h4>${selectedCar.brand} ${selectedCar.model}</h4>
            <p>📅 Період: ${startDateInput.value} — ${endDateInput.value}</p>
            <p class="status confirmed" style="color: green;">Статус: Підтверджено</p>
            <p class="price">Всього до сплати: ${total} грн</p>
            <button class="btn-cancel" onclick="deleteBooking(this)">Скасувати бронювання</button>
        </div>
    `;

    bookingGrid.insertAdjacentHTML('afterbegin', bookingHTML);
    closeModal();
    alert("Успішно заброньовано!");
    document.getElementById('bookings').scrollIntoView({behavior: 'smooth'});
}

function deleteBooking(button) {
    if (confirm("Ви точно хочете скасувати це бронювання?")) {
        button.parentElement.remove();
    }
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}