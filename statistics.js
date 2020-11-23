const sampleData = {
    day20201121 : {
        study : [
            { 
                subject : "프론트엔드 공부",
                startTime : "14:30:00",
                endTime : "15:30:00",
                totalTime : "1:0:0"
            },
            {
                subject : "dsc 프로젝트 구현",
                startTime : "16:30:00",
                endTime : "17:45:30",
                totalTime : "1:15:30"
            }
        ],
        rest : [
            {
                totalTime : "0:30:50"
            }
        ]
    }
};

const inputDate = document.querySelector(".statisticsBox .inputDate");
const statisticsMain = document.querySelector(".statisticsBox .main");
const dateSendButton = document.querySelector(".statisticsBox .sendDate .submitBtn");




var ctx = document.getElementById("myChart").getContext('2d');
/*
- Chart를 생성하면서, 
- ctx를 첫번째 argument로 넘겨주고, 
- 두번째 argument로 그림을 그릴때 필요한 요소들을 모두 넘겨줍니다. 
*/
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: true, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});



function DateChange(){  
    if(inputDate.value === ""){
        statisticsMain.innerHTML = '날짜를 다시 확인해주세요';
    } else {
        statisticsMain.innerHTML = `date : ${inputDate.value}`;
    }
}

function sendDateEvent(e){
    if(inputDate.value === ""){
        e.preventDefault();
        console.log('날짜를 다시 확인해주세요');
    } else {
        e.preventDefault();
        // console.log(inputDate.value);
    }

    const date = inputDate.value.split('-').join("");
    const dailyData = sampleData[`day${date}`];
    // console.log(dailyData);

    console.log(`
        Date : ${date}
        ${dailyData.study[0].subject} ${dailyData.study[0].totalTime}
        ${dailyData.study[1].subject} ${dailyData.study[1].totalTime}
    `)

}
// inputDate.onchange = DateChange;
dateSendButton.onclick = sendDateEvent;