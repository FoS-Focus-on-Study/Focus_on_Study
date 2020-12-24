const subjectList = document.querySelector('.aloneToDoBox .subjectList');

function checkboxChangeEvent(event) {
  const checkbox = event.target;
  const span = checkbox.nextElementSibling;
  span.classList.toggle('checked');
}

function deleteToDoEvent(e) {
  const li = e.currentTarget.parentNode;
  const ul = li.parentNode;
  const subjectName =
    ul.parentNode.previousElementSibling.firstElementChild.innerHTML;

  /* 로컬스토리지에서 삭제 */
  const LS_todos = localStorage.getItem(`FoS_${subjectName}`);
  let todos = JSON.parse(LS_todos);

  const index = todos.findIndex((i) => i.id === li.id);
  todos.splice(index, 1);

  localStorage.setItem(`FoS_${subjectName}`, JSON.stringify(todos));

  /* 화면에서 삭제 */
  ul.removeChild(li);
}

// todo 추가시 화면에 생성.
function paintToDo(form) {
  const ul = form.nextElementSibling.nextElementSibling,
    inputedText = form.firstElementChild.value;

  const li = document.createElement('li'),
    input = document.createElement('input'),
    span = document.createElement('span'),
    btn = document.createElement('button');

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(btn);
  ul.appendChild(li);

  li.id = `todo${parseInt(localStorage.getItem('newId')) - 1}`;
  input.type = 'checkbox';
  input.addEventListener('change', checkboxChangeEvent);
  span.innerHTML = inputedText;
  btn.innerHTML = 'x';
  btn.addEventListener('click', deleteToDoEvent);

  form.firstElementChild.value = '';
}

// todo 추가시 로컬스토리지에 저장.
function saveToDo(form) {
  const subjectName =
    form.parentNode.previousElementSibling.firstElementChild.innerHTML;

  const LS_todos = localStorage.getItem(`FoS_${subjectName}`);

  // todo 객체들을 담을 배열
  let todos = [];
  if (LS_todos !== null) {
    todos = JSON.parse(LS_todos);
  }

  const text = form.firstElementChild.value;
  const newId = localStorage.getItem('newId');
  localStorage.setItem('newId', parseInt(newId) + 1);
  const todo = {
    id: `todo${newId}`,
    text,
  };

  todos.push(todo);
  localStorage.setItem(`FoS_${subjectName}`, JSON.stringify(todos));
}

function submitToDoForm(e) {
  e.preventDefault();
  saveToDo(e.currentTarget);
  paintToDo(e.currentTarget);
}

function clickToggleEvent(e) {
  const toggleBtn = e;
  const toDoBox = toggleBtn.parentNode.nextElementSibling;

  if (toggleBtn.innerHTML === '🔼') {
    toggleBtn.innerHTML = '🔽';
  } else {
    toggleBtn.innerHTML = '🔼';
  }

  toDoBox.classList.toggle('open');
}

function clearToDoEvent(clearBtn) {
  const subjectName =
    clearBtn.parentNode.previousElementSibling.firstElementChild.innerHTML;
  const ul = clearBtn.nextElementSibling;

  ul.innerHTML = '';
  localStorage.removeItem(`FoS_${subjectName}`);
}

// 과목 삭제이벤트 (지훈씨가 구현?)
// function deleteSubjectEvent(e) {
//   const clickedSubject = e.currentTarget.parentNode.parentNode;
//   subjectList.removeChild(clickedSubject);
// }

// 페이지 로드시 로컬스토리지의 데이터를 화면에 생성.
function paintToDo_LS(ul, todo) {
  const li = document.createElement('li'),
    input = document.createElement('input'),
    span = document.createElement('span'),
    btn = document.createElement('button');

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(btn);
  ul.appendChild(li);

  li.id = todo.id;
  input.type = 'checkbox';
  input.addEventListener('change', checkboxChangeEvent);
  span.innerHTML = todo.text;
  btn.innerHTML = 'x';
  btn.addEventListener('click', deleteToDoEvent);
}

/* 페이지 로드 후, toggle 버튼 누르면 해당 과목 todo를 localstorage에서 받아옴.  */
function loadToDoEvent(toggleBtn) {
  const subjectName = toggleBtn.previousElementSibling.innerHTML;
  const ul = toggleBtn.parentNode.nextElementSibling.lastElementChild;
  let todos = [];

  // ul의 자식요소가 없을 경우(처음 페이지 로드시)
  if (ul.firstElementChild === null) {
    const LS_todos = localStorage.getItem(`FoS_${subjectName}`);
    if (LS_todos !== null) {
      todos = JSON.parse(LS_todos);
      todos.forEach((element) => paintToDo_LS(ul, element));
    }
  }
}

function setLS_NewId() {
  if (localStorage.getItem('newId') === null) {
    localStorage.setItem('newId', 1);
  }
}

function init() {
  setLS_NewId();
  // subjectDeleteBtn.onclick = deleteSubjectEvent;
}

init();
