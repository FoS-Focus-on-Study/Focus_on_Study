const subjectTime = document.querySelector('.timeBox .subjectTime');
const todayStudyTime = document.querySelector('.timeBox .todayStudyTime');
let subjectSec = document.getElementById('Oseconds').value,
  todayStudySec = document.getElementById('Oseconds').value;

function sec_To_HHMMSS(sec) {
  const hour = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const rest = (sec % 3600) % 60;
  const result =
    `${hour >= 10 ? hour : `0${hour}`}:` +
    `${min >= 10 ? min : `0${min}`}:` +
    `${rest >= 10 ? rest : `0${rest}`}`;

  return result;
  // console.log(hour, min, rest);
}

function stopwatch() {
  subjectSec++;
  todayStudySec++;
  // console.log(subjectSec);

  subjectTime.innerHTML = sec_To_HHMMSS(subjectSec);
  todayStudyTime.innerHTML = `study : ${sec_To_HHMMSS(todayStudySec)}`;
}
function endStudy() {
  var form = document.createElement('form');
  form.setAttribute('action', '/typeSelection/aloneStudy/end_study');
  form.setAttribute('method', 'post');
  var oseconds = document.createElement('input');
  oseconds.setAttribute('class', 'number');
  oseconds.setAttribute('type', 'hidden');
  oseconds.setAttribute('name', 'Oseconds');
  oseconds.setAttribute('value', todayStudySec);
  var osubjectName = document.createElement('input');
  osubjectName.setAttribute('class', 'text');
  osubjectName.setAttribute('type', 'hidden');
  osubjectName.setAttribute('name', 'OsubjectName');
  osubjectName.setAttribute(
    'value',
    document.getElementById('OsubjectName').value,
  );
  var odate = document.createElement('input');
  odate.setAttribute('class', 'text');
  odate.setAttribute('type', 'hidden');
  odate.setAttribute('name', 'Odate');
  odate.setAttribute('value', document.getElementById('Odate').value);
  var ohostName = document.createElement('input');
  ohostName.setAttribute('class', 'text');
  ohostName.setAttribute('type', 'hidden');
  ohostName.setAttribute('name', 'OhostName');
  ohostName.setAttribute('value', document.getElementById('OhostName').value);
  form.appendChild(oseconds);
  form.appendChild(osubjectName);
  form.appendChild(odate);
  form.appendChild(ohostName);
  document.charset = 'utf-8';
  document.body.appendChild(form);
  form.submit();
}

function checkboxChangeEvent(event) {
  const checkbox = event.target;
  const span = checkbox.nextElementSibling;
  span.classList.toggle('checked');
}

function setToDoList() {
  const subjectName = document.querySelector('.subjectName').innerHTML;
  const toDoListUl = document.querySelector('.toDoList ul');
  let todos = [];

  const LS_todos = localStorage.getItem(`FoS_${subjectName}`);
  if (LS_todos !== null) {
    todos = JSON.parse(LS_todos);
    todos.forEach((element) => {
      const li = document.createElement('li'),
        input = document.createElement('input'),
        span = document.createElement('span');

      input.type = 'checkbox';
      input.addEventListener('change', checkboxChangeEvent);
      span.innerHTML = element.text;

      li.appendChild(input);
      li.appendChild(span);
      toDoListUl.appendChild(li);
    });
  }
}

function init() {
  const studyInterval = setInterval(stopwatch, 1000);
  //const logInterval = setInterval(console.log(win), 1000);
  const startRestBtn = document.querySelector(
    '.studyingPopupFrame .restOrExit .rest',
  );

  startRestBtn.onclick = () => {
    var oid = document.getElementById('Oid').value;
    clearInterval(studyInterval);
    const option = 'top=150px left=150px width=350px height=200px';
    var win = window.open('./setRestTime?dayID=' + oid, 'setRestTime', option);
    setTimeout(() => {
      endStudy();
    }, 2000);
  };

  setToDoList();
}

init();
