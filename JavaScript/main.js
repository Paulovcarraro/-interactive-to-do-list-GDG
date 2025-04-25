document.addEventListener("DOMContentLoaded", () => {
  // Referência aos elementos do formulário, lista e modal
  const form = document.getElementById("form-tarefas");
  const listaTarefas = document.getElementById("listaTarefas");
  const modalEdicao = document.getElementById("modal-edicao");
  const formEdicao = document.getElementById("form-edicao");
  const btnSalvarEdicao = document.getElementById("salvar-edicao");
  const btnCancelarEdicao = document.getElementById("cancelar-edicao");
  const editarTarefaInput = document.getElementById("editar-tarefa");
  const editarDescricaoInput = document.getElementById("editar-descricao");
  const editarConcluidaInput = document.getElementById("editar-concluida");
  const mensagemErroEdicao = document.getElementById("mensagem-erro-edicao");


  // Lista de tarefas
  let tarefas = [];
  let indiceEditando = null; // Índice da tarefa sendo editada

  // Evento ao enviar nova tarefa
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Pega os valores dos inputs
    const tarefa = document.getElementById("tarefa").value;
    const descricao = document.getElementById("descricao").value;

    // Validação: exibir mensagem se inválido
    if (!tarefa || !descricao) {
      alert("Por favor, insira uma tarefa e descrição válidas.");
      return;
    }

    // Cria objeto e adiciona à lista
    const novaTarefa = { tarefa, descricao, concluida: false };
    tarefas.push(novaTarefa);

    // Atualiza a interface e limpa formulário
    renderizarTarefas();
    form.reset();
  });

  // Renderiza as tarefas na tabela
  function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
      const tr = document.createElement("tr");
      if (tarefa.concluida) {
        tr.classList.add("concluida");
      }

      // Tarefa
      const tdTarefa = document.createElement("td");
      tdTarefa.textContent = tarefa.tarefa;

      // Descrição
      const tdDescricao = document.createElement("td");
      tdDescricao.textContent = tarefa.descricao;

      // Ações: editar/excluir/concluir
      const tdAcoes = document.createElement("td");

      const btnConcluir = document.createElement("button");
      btnConcluir.textContent = "Concluir";
      btnConcluir.className = "btn-concluir";
      btnConcluir.addEventListener("click", () => {
        concluirTarefa(index);
      });

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.className = "btn-excluir";
      btnExcluir.addEventListener("click", () => {
        excluirTarefa(index);
      });

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.className = "btn-editar";
      btnEditar.addEventListener("click", () => {
        abrirModalEdicao(index); // Abre o modal de edição
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

  function concluirTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida; // Alterna o status
    renderizarTarefas();
  }

  function abrirModalEdicao(index) {
    indiceEditando = index; // Salva o índice da tarefa que está sendo editada
    const tarefaParaEditar = tarefas[index];

    // Preenche os campos do modal com os valores da tarefa
    editarTarefaInput.value = tarefaParaEditar.tarefa;
    editarDescricaoInput.value = tarefaParaEditar.descricao;
    editarConcluidaInput.checked = tarefaParaEditar.concluida;
    mensagemErroEdicao.textContent = ""; // Limpa qualquer mensagem de erro anterior

    modalEdicao.classList.remove("hidden"); // Exibe o modal
  }

  function salvarEdicao() {
    if (!editarTarefaInput.value || !editarDescricaoInput.value) {
      mensagemErroEdicao.textContent = "Por favor, preencha todos os campos.";
      return;
    }

    // Atualiza a tarefa com os valores do modal
    tarefas[indiceEditando] = {
      tarefa: editarTarefaInput.value,
      descricao: editarDescricaoInput.value,
      concluida: editarConcluidaInput.checked,
    };

    renderizarTarefas(); // Atualiza a tabela
    modalEdicao.classList.add("hidden"); // Esconde o modal
    indiceEditando = null; // Reseta o índice
    formEdicao.reset();
  }

  // Event listeners para os botões do modal
  btnSalvarEdicao.addEventListener("click", salvarEdicao);

  btnCancelarEdicao.addEventListener("click", () => {
    modalEdicao.classList.add("hidden"); // Esconde o modal
    indiceEditando = null; // Reseta o índice
    formEdicao.reset();
  });

  renderizarTarefas();
});
