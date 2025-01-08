import carros from './carros.js';

async function fetchVehicles() {
  const storedVehicles = JSON.parse(localStorage.getItem('vehicles'));

  if (storedVehicles && storedVehicles.length > 0) {
    renderVehicles(storedVehicles);
    return;
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API');
    }

    const data = await response.json();

    const vehicles = data.slice(0, 8);

    vehicles.forEach(vehicle => {
      if (!vehicle.id) {
        vehicle.id = generateUniqueId();
      }

      vehicle.model = getRandomModel();
      vehicle.color = getRandomColor();
      vehicle.type = getRandomType();
      vehicle.kilometers = getRandomKilometers();
      vehicle.doors = getRandomDoors();
      vehicle.image = getRandomCarImage();
      vehicle.price = getRandomPrice();
    });

    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    renderVehicles(vehicles);
  } catch (error) {
    console.error('Erro ao buscar os veículos:', error);
  }
}

function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000); 
}

function renderVehicles(vehicles) {
  const vehicleList = document.getElementById('vehicle-list');
  vehicleList.innerHTML = '';

  vehicles.forEach(vehicle => {
    const vehicleCard = document.createElement('div');
    vehicleCard.classList.add('col-md-4', 'vehicle-card');
    vehicleCard.setAttribute('data-id', vehicle.id); 

    vehicleCard.innerHTML = `
      <div class="card">
        <img src="${vehicle.image}" alt="${vehicle.model}" class="vehicle-img">
        <div class="card-body">
          <h5 class="card-title">${vehicle.model}</h5>
          <p class="card-text"><strong>Marca:</strong> ${vehicle.albumId}</p>
          <p class="card-text"><strong>Modelo:</strong> ${vehicle.model}</p>
          <p class="card-text"><strong>Ano:</strong> 2021</p>
          <p class="card-text"><strong>Cor:</strong> ${vehicle.color}</p>
          <p class="card-text"><strong>Tipo:</strong> ${vehicle.type}</p>
          <p class="card-text"><strong>Quilometragem:</strong> ${vehicle.kilometers} km</p>
          <p class="card-text"><strong>Portas:</strong> ${vehicle.doors}</p>
          <p class="card-text"><strong>ID:</strong> ${vehicle.id}</p>
          <p class="price">R$ ${vehicle.price}</p>
        </div>
      </div>
    `;

    vehicleList.appendChild(vehicleCard);
  });
}

function getRandomModel() {
  const models = ['Fusca', 'Gol', 'Civic', 'Corolla', 'Onix', 'Mobi'];
  return models[Math.floor(Math.random() * models.length)];
}

function getRandomColor() {
  const colors = ['Preto', 'Branco', 'Vermelho', 'Azul', 'Prata', 'Verde'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomType() {
  const types = ['Sedan', 'Hatch', 'SUV', 'Picape', 'Crossover'];
  return types[Math.floor(Math.random() * types.length)];
}

function getRandomKilometers() {
  return Math.floor(Math.random() * 20000) + 1000;
}

function getRandomDoors() {
  return Math.floor(Math.random() * 3) + 2;
}

function getRandomPrice() {
  return (Math.floor(Math.random() * (300 - 80 + 1)) + 80).toFixed(2);
}

function getRandomCarImage() {
  return carros[Math.floor(Math.random() * carros.length)];
}

document.addEventListener('DOMContentLoaded', fetchVehicles);
