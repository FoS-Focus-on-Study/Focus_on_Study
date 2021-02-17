const selectForm = document.selectGroupForm;
const selectOptions = document.querySelector('.selectGroup');
const groupToDoBox = document.querySelector('.groupToDoBox');
const liveListBox = document.querySelector('.liveListBox');

function selectGroup() {
  selectGroupForm.submit();
  selectOptions.blur();
}

function selectGroupDefault() {
  groupToDoBox.style.display = 'none';
  liveListBox.style.display = 'none';
}

function createGroup() {
  window.open(
    '/aloneStudy/createGroup',
    'Create Group',
    'toolbar=no, width=360px, height=550px, directories=no, status=no,    scrollorbars=no, resizable=no',
  );
}

function init() {
  selectGroupDefault();
}

init();
