document.addEventListener('DOMContentLoaded', () => {
    // Referência aos elementos do formulário, lista e total
    const form = document.getElementById('form-tarefas');
    const listaTarefas = document.getElementById('listaTarefas');
    // const totalSpan = document.getElementById('total'); // Removido, você não tem isso no HTML
  
    // Lista de tarefas
    let tarefas = [];
  
    // Índice do item que está sendo editado
    let indiceEditando = null;
  
    // Evento ao enviar nova tarefa
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Pega os valores dos inputs
      const tarefa = document.getElementById('tarefa').value;
      const descricao = document.getElementById('descricao').value;
  
      // Validação: exibir mensagem se inválido
      if (!tarefa || !descricao) {
        alert('Por favor, insira uma tarefa e descrição válidas.');
        return;
      }
  
      // Cria objeto e adiciona à lista
      const novaTarefa = { tarefa, descricao, concluida: false }; // Adicionado 'concluida'
      tarefas.push(novaTarefa);
  
      // Atualiza a interface e limpa formulário
      renderizarTarefas();
      form.reset();
    });
  
    // Renderiza as tarefas na tabela
    function renderizarTarefas() {
      listaTarefas.innerHTML = '';
  
      tarefas.forEach((tarefa, index) => { // Use o índice aqui
        const tr = document.createElement('tr');
        if (tarefa.concluida) {
          tr.classList.add('concluida'); // Adiciona classe para marcar como concluída
        }
  
        // Tarefa
        const tdTarefa = document.createElement('td');
        tdTarefa.textContent = tarefa.tarefa;
  
        // Descrição
        const tdDescricao = document.createElement('td');
        tdDescricao.textContent = tarefa.descricao;
  
        // Ações: editar/excluir/concluir
        const tdAcoes = document.createElement('td');
  
        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = 'Concluir';
        btnConcluir.className = 'btn-concluir';
        btnConcluir.addEventListener('click', () => {
          concluirTarefa(index);
        });
  
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.className = 'btn-excluir';
        btnExcluir.addEventListener('click', () => {
          excluirTarefa(index); // Passa o índice para excluirTarefa
        });
  
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.className = 'btn-editar';
        btnEditar.addEventListener('click', () => {
          editarTarefa(index); // Passa o índice para editarTarefa
        });
  
        tdAcoes.appendChild(btnConcluir);
        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
  
  
        // Monta a linha
        tr.appendChild(tdTarefa);
        tr.appendChild(tdDescricao);
        tr.appendChild(tdAcoes);
  
        // Adiciona à tabela
        listaTarefas.appendChild(tr);
      });
    
    }
  
    function excluirTarefa(index) {
      tarefas.splice(index, 1);
      renderizarTarefas();
    }
  
    function editarTarefa(index) {
      const tarefaParaEditar = tarefas[index];
  
      const novaTarefa = prompt("Editar Tarefa:", tarefaParaEditar.tarefa);
      const novaDescricao = prompt("Editar Descrição:", tarefaParaEditar.descricao);
  
  
      if (novaTarefa !== null && novaDescricao !== null) {
        tarefas[index] = {
          tarefa: novaTarefa,
          descricao: novaDescricao,
          concluida: tarefas[index].concluida // Mantém o status de conclusão
        };
        renderizarTarefas();
      }
    }
  
    function concluirTarefa(index) {
      tarefas[index].concluida = true;
      renderizarTarefas();
    }
  
    renderizarTarefas();
  });
  