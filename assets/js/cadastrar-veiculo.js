document.getElementById('form-veiculos').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const anoFab = document.getElementById('anoFab').value;
    const cor = document.getElementById('cor').value.trim();
    const tipo = document.getElementById('tipo').value;
    const km = document.getElementById('km').value;
    const num_portas = document.getElementById('num_portas').value;
    const preco = document.getElementById("preco").value;
    const url_imagem = document.getElementById('url_imagem').value.trim();
  
    if (!marca || !modelo || !anoFab || !cor || !tipo || !km || !num_portas || !url_imagem || !preco) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    const newVehicle = {
      id: Date.now(),
      marca,
      modelo,
      anoFab,
      cor,
      tipo,
      km: Number(km),
      preco,
      num_portas: Number(num_portas),
      url_imagem,
    };
  
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    
    veiculos.push(newVehicle);
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
  
    alert('Veículo cadastrado com sucesso!');
    document.getElementById('form-veiculos').reset();
  });
  