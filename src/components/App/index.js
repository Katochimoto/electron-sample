import Calendar from '../Calendar';
import { offsetOnDay } from '../Calendar/utils/date';

import styles from './index.less';

const App = () => (
  <div className={styles.app}>
    <Calendar
      upload={uploadEvents}
      update={updateEvents} />
  </div>
);

export default App;

function uploadEvents (interval: number[], callback: Function) {
  const events = generateEvents(interval);
  callback(null, events);
}

function updateEvents (callback: Function) {

}

function generateEvents (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;
  const events = [];
  let currentDate = dateBegin;

  while (currentDate <= dateEnd) {
    events.push(
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate]),
      generateEvent([currentDate, currentDate])
    );
    currentDate = offsetOnDay(currentDate, 1);
  }

  events.sort((a, b) => {
    const ab = a.dateBegin;
    const bb = b.dateBegin;

    if (ab > bb) {
      return 1;
    } else if (ab < bb) {
      return -1;
    } else {
      const atb = a.timeBegin;
      const btb = b.timeBegin;

      if (atb > btb) {
        return 1;
      } else if (atb < btb) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  return events;
}

function generateEvent (interval) {
  const dateBegin = interval[0]
  const dateEnd = interval[1] || dateBegin;
  const timeBegin = getRandomInt(0, 23 * 60);
  const timeEnd = getRandomInt(timeBegin + 30, 24 * 60);

  return {
    id: `${dateBegin}T${timeBegin}--${dateEnd}T${timeEnd}`,
    dateBegin: dateBegin,
    dateEnd: dateEnd,
    timeBegin: timeBegin * 60 * 1000,
    timeEnd: timeEnd * 60 * 1000,
    title: `${dateBegin} ${timeBegin}:${timeEnd}`,
    updated: Math.random() + 1
  };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
