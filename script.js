class Pet {
  constructor(nome, especie, status, raca, caracteristicas, ultimaLocalizacao, ultimaData, detalhes, recompensa, telefone, emoji) {
    this.nome = nome;
    this.especie = especie;
    this.status = status;
    this.raca = raca;
    this.caracteristicas = caracteristicas;
    this.ultimaLocalizacao = ultimaLocalizacao;
    this.ultimaData = ultimaData;
    this.detalhes = detalhes;
    this.recompensa = recompensa;
    this.telefone = telefone;
    this.emoji = emoji;

    switch(this.especie)
    {
        case "Cachorro":
            this.emoji = "🐕";
            break;
        case "Gato":
            this.emoji = "🐈";
            break;
        default:
            this.emoji = "🐦";
    }
  }
}

let pets = [];

async function getPetData(){

  const request = await fetch("https://sheetdb.io/api/v1/mqons4xip2bv8");

  if (!request.ok)
  {
    console.error("Failed");
    return;
  }

  const data = await request.json();
  console.log(data);

  for(let i = 0; i < data.length; i++)
  {
    /* const pet = new Pet(object.nome, object.especie, object.status,
                        object.raca, object.caracteristicas, object.ultimaLocalizacao, 
                        object.ultimaData, object.detalhes, object.recompensa, 
                        object.telefone); */

    const pet = data[i];
    pets.push(pet);
    console.log(pets);
  }

}

getPetData();

  // DADOS DEMO
/*  pets = [
    new Pet('Rex',     'Cachorro', 'perdido', "Lavrador", "Cego", 'Centro, Lorena', '07/04/2026', "Detalhes", 100, "129971834"),
    new Pet(2, 'Mimi',    'Gato',     'perdido',   'Santana, Lorena',      '5 dias atrás', 'R$ 150'),
    new Pet(3, 'Bolinha', 'Cachorro', 'encontrado','Pq. dos Anjos, Lorena','1 dia atrás',  'R$ 200'),
    new Pet(4, 'Luna',    'Gato',     'perdido',   'São José, Lorena',     '3 dias atrás', 'R$ 100'),
    new Pet(5, 'Thor',    'Cachorro', 'perdido',   'Vila Nova, Lorena',    'Hoje',         'R$ 500'),
    new Pet(6, 'Fifi',    'Outro',     'encontrado','Centro, Lorena',       '3 dias atrás', 'R$ 80'),
]; */

let filtroAtivo = 'todos';

function renderPets(array) {
    const grid = document.getElementById('pets-grid');
    grid.innerHTML = array.map(p => `
      <div class="pet-card" onclick="showToast('Ver detalhes de ${p.nome}')">
        <div class="pet-img">${p.emoji}</div>
        <div class="pet-specie">${p.especie}</div>
        <div class="pet-body">
          <span class="pet-status ${p.status === 'perdido' ? 'status-perdido' : 'status-encontrado'}">
            ${p.status === 'perdido' ? '🔴 Perdido' : '🟢 Encontrado'}
          </span>
          <div class="pet-name">${p.nome}</div>
          <div class="pet-info">📍 ${p.ultimaLocalizacao}</div>
          <div class="pet-footer">
            <span class="reward-badge">💰 ${p.recompensa}</span>
            <span class="pet-date">${p.ultimaData}</span>
          </div>
        </div>
      </div>
    `).join('');
}

function filterPets(tipo, el) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    filtroAtivo = tipo;
    const filtrado = tipo === 'todos' ? pets
      : tipo === 'encontrado' ? pets.filter(p => p.status !== 'encontrado')
      : pets.filter(p => p.especie === tipo);
    renderPets(filtrado);
}

renderPets(pets);

  // MODAL
function openModal(id) {
    document.getElementById('modal-' + id).classList.add('open');
}
function closeModal(id) {
    document.getElementById('modal-' + id).classList.remove('open');
}

// TOAST
let toastTimer;
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-text').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

async function enviarDados(data){

  const response = await fetch('https://api.npoint.io/80554e22afddaf7d08cd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ data: [data] })
    });
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
}

async function cadastrar(e) {
  e.preventDefault();
  // showToast(msg);
  const data = new Pet(
  document.getElementById('nomeForm').value,
  document.getElementById('especieForm').value,
  "perdido",
  document.getElementById('racaForm').value,
  document.getElementById('caracteristicasForm').value,
  document.getElementById('ultimaLocalizacaoForm').value,
  document.getElementById('ultimaDataForm').value,
  document.getElementById('detalhesForm').value,
  document.getElementById('recompensaForm').value,
  document.getElementById('telefoneForm').value,
  )
  console.log(data);
    try {
      await enviarDados(data);
        console.log("Dados enviados com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar dados:", error); 
      } 
    }
  // PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}