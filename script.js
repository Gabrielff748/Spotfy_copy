// Open modal
document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("addTrackModal").style.display = "flex";
});

// Close modal
document.getElementById("closeModalBtn").addEventListener("click", function () {
  document.getElementById("addTrackModal").style.display = "none";
});

// Close modal when clicking outside of modal content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("addTrackModal")) {
    document.getElementById("addTrackModal").style.display = "none";
  }
});

const listaMusicas = document.querySelector('.lista-musicas')



async function carregarMusicas() {
  try {
    const url = 'http://localhost:3000/musicas'
    const resposta = await fetch(url)
    const musicas = await resposta.json()
    
    if (!resposta.ok) {
      throw new Error('Erro ao carregar musicas!!')
    }

    musicas.forEach(musica => {
      const estruturaHtml = 
      `<tr>
      <td>${musica.id}</td>
      <td>
      <img src="${musica.capa}" alt="Faixa ${musica.id}" />
      <td><p>${musica.nome}</p></td>
      </td>
      <td>${musica.streams}</td>
      <td>${musica.duracao}</td>
      <td><a href="#" class="play-button">▶</a></td>
      <td><span class="botao-fechar-card" onclick="excluirMusica('${musica.id}')">&times;</span></td>
      </tr>`
      
      listaMusicas.innerHTML += estruturaHtml
    });
    
  } catch(erro) {
    console.error(erro.message)
  }

}
carregarMusicas()


async function adicionarMusica() {
  const nomeDigitado = document.querySelector('#trackName').value
  const duracaoDigitado = document.querySelector('#trackDuration').value
  const streamsDigitado = document.querySelector('#trackStreams').value
  const urlImagemDigitado = document.querySelector('#trackImage').value

  
  
  try {

    const musica = {
      nome: nomeDigitado,
      duracao: duracaoDigitado,
      streams: streamsDigitado,
      capa: urlImagemDigitado
    }
    
    const url = 'http://localhost:3000/musicas'
    const resposta = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(musica)
    })
    if (!resposta.ok) {
      throw new Error('Erro ao adicionar musica!')
    }
    alert('Produto Adicionado com sucesso!!!')
    listaMusicas.innerHTML = ''
    carregarMusicas()
  } catch(erro) {
    console.error(erro.message)
  }
}

async function excluirMusica(id) {
  try {

    const url = `http://localhost:3000/musicas/${id}`
    const resposta = await fetch(url, {
      method: 'DELETE'
    })

    if (!resposta.ok) {
      throw new Error('Erro ao deletar Musica!!')
    }
    
    if (resposta.status === 200) {
      alert('Musica excluída com sucesso!');
      listaMusicas.innerHTML = ''
      carregarMusicas();
    } else {
      alert('Erro ao excluir a musica.');
    }
  } catch (erro) {
    console.error(erro.message)
  }
  
}