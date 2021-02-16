const selectGroupForm = document.querySelector('.selectGroupForm');
const groupToDoBox = document.querySelector('.groupToDoBox');
const liveListBox = document.querySelector('.liveListBox');

function createGroup() {
  window.open(
    '/aloneStudy/createGroup',
    'Create Group',
    'toolbar=no, width=360px, height=550px, directories=no, status=no,    scrollorbars=no, resizable=no',
  );
}

function selectGroupDefault() {
  groupToDoBox.style.display = 'none';
  liveListBox.style.display = 'none';
}

function init() {
  selectGroupDefault();
}

init();
