import StoreStrategy from '../StoreStrategy';
import defaultState from './defaultState';

export default class Strategy extends StoreStrategy {
  constructor (data: {[id:string]: any} = defaultState) {
    super(data);
    this.LIMIT_PREV = 1;
    this.LIMIT_NEXT = 2;
  }

  /**
   * Принудительное обновление через установку уникального значения updated в стейт.
   * @public
   * @return {boolean}
   */
  forceUpdated () {
    this.current.updated++;
    return true;
  }

  /**
   * Обновление позиции скрола.
   * @public
   * @param {number} deltaX
   * @param {number} deltaY
   * @return {boolean}
   */
  updateScroll (deltaX: number, deltaY: number) {
    deltaX = Math.ceil(deltaX / 2);
    deltaY = Math.ceil(deltaY / 2);

    deltaX = deltaX > 0 ?
      Math.min(deltaX, 100) :
      Math.max(deltaX, -100);

    deltaY = deltaY > 0 ?
      Math.min(deltaY, 100) :
      Math.max(deltaY, -100);

    const scrollX = this.current.scrollX + deltaX;
    const scrollY = this.current.scrollY + deltaY;

    let updX = this.update({ scrollX });
    let updY = this.update({ scrollY });

    const speedScrollX = updX ? deltaX : 0;
    const speedScrollY = updY ? deltaY : 0;

    updX = this.update({ speedScrollX }) || updX;
    updY = this.update({ speedScrollY }) || updY;

    return (updX || updY);
  }

  /**
   * Проверка видимости блока списка.
   * @abstract
   * @param {number} offset номер блока
   * @returns {boolean}
   */
  isVisibleOffset (offset: number): boolean {
    return true;
  }

  _limitScroll (value: number, min: number, max: number): number {
    return (
      value < min ? min :
      value > max ? max :
      Math.round(value)
    );
  }

  _limitScrollY (value: number): number {
    return this._limitScroll(
      value,
      this.current.scrollOffsetTop,
      this.current.scrollOffsetBottom
    );
  }

  _limitScrollX (value: number): number {
    return this._limitScroll(
      value,
      this.current.scrollOffsetLeft,
      this.current.scrollOffsetRight
    );
  }

  _correctLimitOffset (limit, value, size) {
    switch (limit) {
      case this.LIMIT_PREV:
        return value - size;
      case this.LIMIT_NEXT:
        return value + size;
      default:
        return value;
    }
  }

  _checkLimitOffset (scroll, offsetPrev, offsetNext): number {
    const scrollOffsetCenter = (offsetPrev + offsetNext) / 2;
    const scrollOffsetWidth = offsetPrev > offsetNext ?
      offsetPrev - offsetNext :
      offsetNext - offsetPrev;
    const centerOffsetWidth = scrollOffsetWidth / 2;
    const sign = scroll > scrollOffsetCenter ? 1 : -1;
    const scroll2CenterWidth = scroll > scrollOffsetCenter ?
      scroll - scrollOffsetCenter :
      scrollOffsetCenter - scroll;
    const rate = centerOffsetWidth ?
      sign * scroll2CenterWidth * 100 / centerOffsetWidth : 0;
    const rateCompare = 100 / this.current.listRange;

    if (rate <= -(rateCompare)) {
      return this.LIMIT_NEXT;

    } else if (rate >= rateCompare) {
      return this.LIMIT_PREV;
    }

    return 0;
  }
}
