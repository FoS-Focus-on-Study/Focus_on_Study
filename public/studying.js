const aloneStartBtn = document.querySelector(
  '.aloneToDoBox .subjectTitle button',
);

let studyingPopupPage;

function studyingPopupPageEvent() {
  const startRestBtn = document.querySelector(
    '.studyingPopupFrame .restOrExit .rest',
  );
  const finishAloneStudyBtn = document.querySelector(
    '.studyingPopupFrame .restOrExit .exit',
  );

  startRestBtn.onclick = startRestEvent;
  finishAloneStudyBtn = finishAloneStudyEvent;
}

function openAloneStudyPage() {
  const option = 'width=350px, height=500px';

  studyingPopupPage = window.open(
    './popup_studying.html',
    'popup_studying',
    option,
  );
  studyingPopupPage.onload = studyingPopupPageEvent;
}

function startRestEvent() {
  const option = 'top=150px left=150px width=350px height=200px';
  window.open('./setRestTime.html', 'setRestTime', option);
}
function finishAloneStudyEvent() {
  studyingPopupPage.close();
}
