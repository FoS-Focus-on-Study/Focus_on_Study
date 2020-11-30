const sampleData = {
  day20201121: {
    study: [
      {
        subject: '프론트엔드 공부',
        // startTime: "14:30:00",
        // endTime: "15:30:00",
        totalTime: 3600,
        // totalTime: "1:0:0",
      },
      {
        subject: 'dsc 프로젝트 구현',
        // startTime: "16:30:00",
        // endTime: "17:45:30",
        totalTime: 4530,
        // totalTime: "1:15:30",
      },
    ],
  },
  day20201125: {
    study: [
      {
        subject: '미술',
        // startTime: "14:30:00",
        // endTime: "15:30:00",
        totalTime: 4000,
        // totalTime: "1:0:0",
      },
      {
        subject: '체육',
        // startTime: "16:30:00",
        // endTime: "17:45:30",
        totalTime: 4530,
        // totalTime: "1:15:30",
      },
      {
        subject: '음악',
        totalTime: 3500,
      },
    ],
  },
};

const inputDate = document.querySelector('.statisticsBox .inputDate');
const statisticsMain = document.querySelector('.statisticsBox .main');
const dateSendButton = document.querySelector(
  '.statisticsBox .sendDate .submitBtn',
);
const canvas = document.querySelector('.statisticsBox #myChart');
const mainText = document.querySelector('.statisticsBox .main .text');

let myChart;

function createChart(dailyData) {
  //이전에 출력돼있던 그래프 제거.
  if (myChart !== undefined) {
    myChart.destroy();
  }

  //해당날짜 데이터 없을경우 함수 종료.
  if (dailyData === undefined) {
    return;
  }
  const ctx = canvas.getContext('2d');
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // canvas.clear();
  const chartLabel = [],
    chartData = [];

  dailyData.study.forEach((element) => {
    chartLabel.push(element.subject);
  });

  dailyData.study.forEach((element) => {
    chartData.push(element.totalTime);
  });

  console.log(chartLabel, chartData);
  // ctx = null;
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      labels: chartLabel,
      datasets: [
        {
          label: 'studying time',
          // data: [12, 19, 3, 5, 2, 3],
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,

              callback: (v) => this.epoch_to_hh_mm_ss(v),
              stepSize: 30 * 60, //add a tick every 5 minutes
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return (
              data.datasets[tooltipItem.datasetIndex].label +
              ': ' +
              epoch_to_hh_mm_ss(tooltipItem.yLabel)
            );
          },
        },
      },
    },
  });
}

function epoch_to_hh_mm_ss(epoch) {
  return new Date(epoch * 1000).toISOString().substr(12, 7);
}

// function DateChange() {
//   if (inputDate.value === "") {
//     statisticsMain.innerHTML = "날짜를 다시 확인해주세요";
//   } else {
//     statisticsMain.innerHTML = `date : ${inputDate.value}`;
//   }
// }

function sendDateEvent(e) {
  //날짜가 잘못됐을경우
  if (inputDate.value === '') {
    e.preventDefault();

    //이전에 출력돼있던 그래프 제거.
    if (myChart) {
      myChart.destroy();
    }

    mainText.innerHTML = '날짜를 다시 확인해주세요';
  } else {
    e.preventDefault();
    const date = inputDate.value.split('-').join('');
    const dailyData = sampleData[`day${date}`];
    // console.log(inputDate.value);

    //DB에 해당날짜 데이터가 없을경우
    if (dailyData === undefined) {
      //이전에 출력돼있던 그래프 제거.
      if (myChart) {
        myChart.destroy();
      }

      mainText.innerHTML = '해당 날짜에 데이터가 없습니다.';
    } else {
      console.log(dailyData);
      mainText.innerHTML = '';
      createChart(dailyData);
    }
  }

  // console.log(`
  //       Date : ${date}
  //       ${dailyData.study[0].subject} ${dailyData.study[0].totalTime}
  //       ${dailyData.study[1].subject} ${dailyData.study[1].totalTime}
  //   `);
}
// inputDate.onchange = DateChange;

function init() {
  const today = new Date();

  // ex : 20201125
  const todayYMD = `${today.getFullYear()}${
    today.getMonth() + 1
  }${today.getDate()}`;

  dateSendButton.onclick = sendDateEvent;
  createChart(sampleData[`day${todayYMD}`]);
  console.log(todayYMD);
}
init();
