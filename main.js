const weekDayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const monthList = [
  'December',
  'January',
  'February',
  'March',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
];

// step 1.1
function getToday() {
  const now = new Date();
  const monthDay = now.getDate();
  const suffix = getOrderSuffix(monthDay);

  // formatted date
  return `${weekDayList[now.getDay()]}, ${monthDay}${suffix} of ${
    monthList[now.getMonth()]
  } ${now.getFullYear()}`;
}

// step 1.2
function getTheTime() {
  const now = new Date();
  const minutes = now.getMinutes();
  let hours = now.getHours();

  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12; // hour 0 is 12

  // formatted time
  return `${hours}.${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
}

// step 1.3
function getTodayTasks() {
  // load task list from json file
  return fetch('tasks.json')
    .then(res => res.json())
    .then(taskList => {
      // get today's weekday name
      const now = new Date();
      const weekday = weekDayList[now.getDay()];

      // keep only today's tasks
      return taskList.filter(task => {
        return task.day === weekday;
      });
    })
}

// step 1.4
function setTitleChanger() {
  // get references to html elements
  const inputElem = document.getElementById('pageTitleInput');
  const buttonElem = document.getElementById('pageTitleBtn');
  let pageTitle = document.getElementById('title');
  buttonElem.addEventListener('click', function () {
    // change title
    document.title = inputElem.value;
    pageTitle.innerHTML = inputElem.value;
  });
}

// step 1.5
function setColorChanger() {
  // get reference to input html element
  const inputElem = document.getElementById('pageColorInput');

  inputElem.addEventListener('input', function (e) {
    // change background color
    document.body.style.backgroundColor = e.target.value;
  });
}

// step 2
function showStuff() {
  // display today's info
  const infoDivElem = document.getElementById('info');
  infoDivElem.textContent = `Today is ${getToday()}, ${getTheTime()}`;

  // load task list and display it in the table
  getTodayTasks().then(taskList => {
    const tableBodyElem = document.getElementById('taskListBody');

    // for each task in the list, append a new row in the table
    taskList.forEach((task, index) => {
      tableBodyElem.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${task.time}</td>
        <td>${task.description}</td>
      </tr>`;
    });
  });
}

// get english order suffix e.g. 'st', 'nd' for month day
function getOrderSuffix(numberValue) {
  const lastDigit = numberValue % 10;

  if (lastDigit > 3) {
    return 'th';
  } else if (lastDigit === 3) {
    return 'rd';
  } else if (lastDigit === 2) {
    return 'nd';
  } else if (lastDigit === 1) {
    return 'st';
  }
}

// weather
function weatherBaloon(cityID) {
  let key = '4014a8ed3ccaceafce4ac805522c737a';
  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID + '&appid=' + key)
    .then(function (resp) {
      return resp.json()
    }) // Convert data to json
    .then(function (data) {
      drawWeather(data);
    })
}

window.onload = function () {
  weatherBaloon(2618425);
}

//display data to html
function drawWeather(d) {
  let celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  let description = d.weather[0].description;

  document.getElementById('description').innerHTML = description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;

}

showStuff();
setTitleChanger();
setColorChanger();