// get all workout data from back-end

fetch('/api/workouts/range')
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}
function populateChart(data) {
  let durations = duration(data);
  let pounds = calculateTotalWeight(data);
  let cardioExerciseNames = getCardioExerciseNames(data);
  let cardioDurations = getCardioDurations(data, cardioExerciseNames);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      datasets: [
        {
          label: 'Total Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Total Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: cardioExerciseNames,
      datasets: [
        {
          label: 'Total Duration of Cardio Excercises Performed',
          backgroundColor: colors,
          data: cardioDurations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Total Duration of Cardio Excercises Performed',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Total Pounds of Resistance Excercises Performed',
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Total Pounds of Resistance Excercises Performed',
      },
    },
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {
    // Fix - ensure that total duration for one day is shown
    const totalDuration = workout.exercises.reduce(
      (totalDurr, currExercise) => totalDurr + currExercise.duration,
      0
    );
    durations.push(totalDuration);
  });

  return durations;
}

function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    //Fix - ensure total weight for one day is shown
    const totalWeight = workout.exercises.reduce(
      (totalWt, currExercise) => totalWt + currExercise.weight,
      0
    );
    total.push(totalWeight);
  });

  return total;
}

function getCardioExerciseNames(data) {
  let cardio = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      if (
        exercise.type === 'cardio' &&
        !cardio.find(name => exercise.name.toLowerCase() === name.toLowerCase())
      ) {
        cardio.push(exercise.name);
      }
    });
  });

  return cardio;
}

function getCardioDurations(data, cardioNames) {
  let cardioDurations = [];

  cardioNames.forEach(name => {
    let totalDuration = 0;
    data.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (
          exercise.type === 'cardio' &&
          exercise.name.toLowerCase() === name.toLowerCase()
        ) {
          totalDuration += exercise.duration;
        }
      });
    });
    cardioDurations.push(totalDuration);
  });

  return cardioDurations;
}
