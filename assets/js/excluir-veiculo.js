const $ = (selector) => document.querySelector(selector);

function carregarVeiculos() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  renderVeiculos(veiculos);
}

function renderVeiculos(veiculos) {
  const veiculoList = $('#lista-veiculos');
  veiculoList.innerHTML = '';

  if (veiculos.length === 0) {
    veiculoList.innerHTML = '<p class="text-center text-muted">Nenhum veículo cadastrado.</p>';
    return;
  }

  veiculos.forEach((veiculo) => {
    const veiculoCard = document.createElement('div');
    veiculoCard.classList.add('col-md-6', 'col-lg-4');

    veiculoCard.innerHTML = `
      <div class="card h-100">
        <img src="${veiculo.url_imagem}" class="card-img-top" alt="${veiculo.modelo}">
        <div class="card-body">
          <h5 class="card-title">${veiculo.modelo}</h5>
          <p class="card-text"><strong>Marca:</strong> ${veiculo.marca}</p>
          <p class="card-text"><strong>Ano:</strong> ${veiculo.anoFab}</p>
          <p class="card-text"><strong>Cor:</strong> ${veiculo.cor}</p>
          <p class="card-text"><strong>Tipo:</strong> ${veiculo.tipo}</p>
          <p class="card-text"><strong>Quilometragem:</strong> ${veiculo.km} km</p>
          <p class="card-text"><strong>Portas:</strong> ${veiculo.num_portas}</p>
          <button class="btn btn-danger w-100 mt-3" data-id="${veiculo.id}">Excluir</button>
        </div>
      </div>
    `;

    veiculoList.appendChild(veiculoCard);
  });

  document.querySelectorAll('.btn-danger').forEach((button) => {
    button.addEventListener('click', () => deleteVehicle(button.dataset.id));
  });
}

function deleteVehicle(id) {
  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  veiculos = veiculos.filter((veiculo) => veiculo.id !== parseInt(id, 10));

  localStorage.setItem('veiculos', JSON.stringify(veiculos));
  renderVeiculos(veiculos);

  alert('Veículo excluído com sucesso!');
}

document.addEventListener('DOMContentLoaded', carregarVeiculos);
