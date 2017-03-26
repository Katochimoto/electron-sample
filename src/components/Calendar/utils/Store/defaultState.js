import { HOURMS } from '../../constant';
import { toObject, createIntervals } from '../array';

const HOURS = '0,1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23'; //,7,8
const HOURS_LIST = HOURS.split(',').map(Number);
const INTERVALS = createIntervals(HOURS_LIST);
const DAYMS = HOURS_LIST.length * HOURMS;
const GRID_HOURS = toObject(HOURS_LIST);

export default {
  scrollHeight: 0,
  scrollWidth: 0,

  /**
   * максимальное смещение при скроле влево = -1 * scrollWidth * ( LIST_RANGE * 2 )
   * @type {number}
   * @private
   * @readonly
   */
  scrollOffsetLeft: 0,

  /**
   * максимальное смещение при скроле вправо
   * @constant {number}
   * @private
   * @readonly
   */
  scrollOffsetRight: 0,

  /**
   * максимальное смещение при скроле вверх = -1 * scrollHeight
   * @type {number}
   * @private
   * @readonly
   */
  scrollOffsetTop: 0,

  /**
   * максимальное смещение при скроле вниз
   * @constant {number}
   * @private
   * @readonly
   */
  scrollOffsetBottom: 0,
  scrollX: undefined,
  scrollY: 0,

  LIST_RANGE: 1,

  //stickyScrollX: false,   // ? залипающий скролл по X
  //stepScrollX: false,     // ? пошаговый скролл по X
  //freeScrollX: false,     // ? свободный скролл по X
  //freeScrollY: false,     // ? свободный скролл по Y

  //speedScrollX: 0,
  //speedScrollY: 0,        // ? скорость скролла по Y: старт = abs(new) > abs(old); вниз > 0; вверх < 0;

  //gridHeight: 0,
  //viewportHeight: 0,
  //viewportMinutesBegin: 0,
  //viewportMinutesEnd: 0,

  gridDaysListItemSize: 7,
  //gridWeekListItemSize: 1,  // количество недель в одном элементе InfiniteList

  //grid: 'day',
  currentDate: 2017.0227,
  hoursOfDay: HOURS,
  GRID_HOURS: GRID_HOURS,
  DAYMS: DAYMS,
  INTERVALS: INTERVALS,
  weekends: '0,6',
  hideWeekends: false,
  beginningOfWeek: 1
};
