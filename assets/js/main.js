import carros from './carros.js';

async function fetchVehicles() {
  const storedVeiculos = JSON.parse(localStorage.getItem('veiculos'));

  if (storedVeiculos && storedVeiculos.length > 0) {
    renderVehicles(storedVeiculos);
    return;
  }

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos');

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API');
    }

    const data = await response.json();

    const veiculos = data.slice(0, 8);

    veiculos.forEach(veiculo => {
      if (!veiculo.id) {
        veiculo.id = generateUniqueId();
      }

      veiculo.marca = getRandomBrand();
      veiculo.modelo = getRandomModel();
      veiculo.cor = getRandomColor();
      veiculo.tipo = getRandomType();
      veiculo.km = getRandomKilometers();
      veiculo.num_portas = getRandomDoors();
      veiculo.url_imagem = getRandomCarImage();
      veiculo.preco = getRandomPrice();
    });

    localStorage.setItem('veiculos', JSON.stringify(veiculos));

    renderVehicles(veiculos);
  } catch (error) {
    console.error('Erro ao buscar os veículos:', error);
  }
}

function generateUniqueId() {
  return Date.now() + Math.floor(Math.random() * 1000); 
}

function renderVehicles(veiculos) {
  const listaVeiculos = document.getElementById('lista-veiculos');
  listaVeiculos.innerHTML = '';

  veiculos.forEach(veiculo => {
    const veiculoCard = document.createElement('div');
    veiculoCard.classList.add('col-md-4', 'card-veiculos');
    veiculoCard.setAttribute('data-id', veiculo.id); 

    veiculoCard.innerHTML = `
      <div class="card">
        <img src="${veiculo.url_imagem}" alt="${veiculo.modelo}" class="veiculo-img">
        <div class="card-body">
          <h5 class="card-title">${veiculo.modelo}</h5>
          <p class="card-text"><strong>Marca:</strong> ${veiculo.marca}</p>
          <p class="card-text"><strong>Modelo:</strong> ${veiculo.modelo}</p>
          <p class="card-text"><strong>Ano:</strong> 2021</p>
          <p class="card-text"><strong>Cor:</strong> ${veiculo.cor}</p>
          <p class="card-text"><strong>Tipo:</strong> ${veiculo.tipo}</p>
          <p class="card-text"><strong>Quilometragem:</strong> ${veiculo.km} km</p>
          <p class="card-text"><strong>Portas:</strong> ${veiculo.num_portas}</p>
          <p class="card-text"><strong>ID:</strong> ${veiculo.id}</p>
          <p class="price">R$ ${veiculo.preco}</p>
        </div>
      </div>
    `;

    listaVeiculos.appendChild(veiculoCard);
  });
}

function getRandomBrand() {
  const marcas = ['Toyota', 'Volkswagen', 'Honda', 'Chevrolet', 'Ford', 'Fiat'];
  return marcas[Math.floor(Math.random() * marcas.length)];
}

function getRandomModel() {
  const modelos = ['Fusca', 'Gol', 'Civic', 'Corolla', 'Onix', 'Mobi'];
  return modelos[Math.floor(Math.random() * modelos.length)];
}

function getRandomColor() {
  const cores = ['Preto', 'Branco', 'Vermelho', 'Azul', 'Prata', 'Verde'];
  return cores[Math.floor(Math.random() * cores.length)];
}

function getRandomType() {
  const tipos = ['Sedan', 'Hatch', 'SUV', 'Picape', 'Crossover'];
  return tipos[Math.floor(Math.random() * tipos.length)];
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
