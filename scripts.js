const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",

    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: "2022-11-18T22:00:00.000Z",
            time: [9, 7, 8, 6],
          },
          {
            date: "2022-12-02T22:00:00.000Z",
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: "2022-11-18T22:00:00.000Z",
            time: [10, 8, 3, 12],
          },
          {
            date: "2022-11-25T22:00:00.000Z",
            time: [6, 8, 9, 11],
          },
          {
            date: "2022-12-02T22:00:00.000Z",
            time: [10, 11, 4, 8],
          },
          {
            date: "2022-12-09T22:00:00.000Z",
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment
const section1 = document.querySelector("section:nth-of-type(1)");
const section2 = document.querySelector("section:nth-of-type(2)");

/**Function to get full name
 *
 * @param {object} x
 * @returns {string}
 */
const fullName = (x) => {
  const name = `${x.firstName}  ${x.surname}`;
  return name;
};

/**Function to get total races from associated object
 *
 * @param {object} x
 * @returns {number}
 */
const totalRaces = (x) => {
  const races = x.races.length;
  return races;
};

/**Function to get the latest race date from the associated object
 *
 * @param {object} x
 * @returns {string}
 */
const latestDate = (x) => {
  const date = new Date(x.races[x.races.length - 1].date);
  let day = date.getUTCDate();
  let month = MONTHS[date.getMonth()];
  let year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

/**Function to calculate total race time from the latest
 * race in minutes from the associated object
 *
 * @param {object} x
 * @returns {string}
 */
const totalTime = (x) => {
  const time = x.races[x.races.length - 1].time;
  const timeResult = time[0] + time[1] + time[2] + time[3];
  let timeMs = Math.round(timeResult * 1000 * 60);
  let min = Math.floor((timeMs / (1000 * 60)) % 60);
  let hrs = Math.floor((timeMs / (1000 * 60 * 60)) % 24);

  min = min < 10 ? "0" + min : min;
  hrs = hrs < 10 ? "0" + hrs : hrs;

  return `${hrs}:${min}`;
};


const newElement = (x) => {
  //created a variable for to reference the objects when calling the functions
  const objName = x.dataset.athlete;
  const h2 = document.createElement("h2");
  h2.textContent = `Athlete ID: ${data.response.data[objName].id}`;
  const added = x.appendChild(h2);
  const dl = document.createElement("dl");
  const dlInner = `<dt>Athlete:</dt>
  <dd>${fullName(data.response.data[objName])}</dd>
  <dt>Total Races:</dt>
  <dd>${totalRaces(data.response.data[objName])}</dd>
  <dt>Event date (Latest):</dt>
  <dd>${latestDate(data.response.data[objName])}</dd>
  <dt>Total race time (latest)</dt>
  <dd>${totalTime(data.response.data[objName])}</dd>`
  dl.innerHTML = dlInner
 
  //Appending all additions to the DOM
  added.appendChild(dl);
  return added;
};

newElement(section1);
newElement(section2);
