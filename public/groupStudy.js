const selectGroupForm = document.selectGroupForm;
const selectOptions = document.querySelector('.selectGroup');
const groupToDoBox = document.querySelector('.groupToDoBox');
const liveListBox = document.querySelector('.liveListBox');

function selectGroup() {
  selectGroupForm.submit();
  selectOptions.blur();

  if (selectOptions.value == 'default') {
    selectGroupDefault();
  } else {
    groupToDoBox.style.display = 'inline-block';
    liveListBox.style.display = 'inline-block';
  }
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

// function selectGroupSubmit(e) {
//   console.log(e.target);
// }

function init() {
  selectGroupDefault();
  // selectGroupForm.addEventListener('submit', selectGroupSubmit);
}

init();
