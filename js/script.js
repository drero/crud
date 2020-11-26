window.addEventListener('load', start);

var globalNames = ['André', 'Matheus', 'Valéria'];
var inputName = null;

// Seguencia de carregamento de códigos JAvascript
function start() {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    // event.preventDefault() Evita que a página
    // seja recarregada ao enviar o submite do fromulário
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    // console.log(globalNames);
    render();
  }
  function handleTyping(event) {
    // Captura as informações digitadas após o usuário  digitar enter
    if (event.key === 'Enter') {
      // console.log(event.target.value);
      // Push é responsável em pegar o elemento do vetor
      insertName(event.target.value);
    }
  }
  // Captura a digitação do usuario quando a tecla é soltada
  inputName.addEventListener('keyup', handleTyping);
  // Ao recarregar a página automaticamente vai para o campo de texto
  // onde o usuário deverá preencher o nome apenas digitando se ter que
  // selecionar o compo de texto
  inputName.focus();
}

function render() {
  // Função da ação de deletar
  // Index faz referencia ao i
  function createDeleteButton(index) {
    function deleteName() {
      // Como a função esta dentro de outra função agora a função Deleta Name
      // tem acesso ao index, e neste caso deletamos o index na posição 1
      // Metodo conhecido no react como closer
      globalNames.splice(index, 1);
      // Chamamos o render novamente po que acabmos de mexer no estado
      render();
    }
    // Criando o botão de apagar
    var button = document.createElement('button');
    // Adicionando um css no botão
    button.classList.add('deleteButton');
    // editando o botão
    button.textContent = 'x';
    // evento que determina o que acontecerá quando clicar no botão "x"
    button.addEventListener('click', deleteName);

    return button;
  }
  // Função para fazer o span clicavel para edição
  function createSpan(name) {
    // Função que ao cliocar retorna o intem para o input
    // para ficar editavel
    function editItem() {
      inputName.value = name;
      // Ao clicar no nome o usuario é redirecionado para o input para edição
      inputName.focus();
    }
    var span = document.createElement('span');
    // adicionando a classe CSS no span
    span.classList.add('clickable');
    span.textContent = name;
    // editItem é referente a edição do nome
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  // faz com que não dupliqueo array
  divNames.innerHTML = '';
  var ul = document.createElement('ul');
  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    // link com o botão deletar da função de deletar botao
    // O indice i é responsável em identificar qual elemento estou deletando
    var button = createDeleteButton(i);
    var span = createSpan(currentName);

    // adicionando filho ao elemento li
    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}
// Após o enter retorna o campo fazio e volta para o campo input
function clearInput() {
  inputName.value = '';
  inputName.focus();
}
