import Strategy from './Strategy';

export default class StrategyX extends Strategy {
  constructor (data: {[id:string]: any}) {
    super(data);
    this.current.SAXISX = true;
  }

  isVisibleOffset (offset: number): boolean {
    const { scrollX, scrollWidth, listRange, speedScrollX } = this.current;
    const min = this._getScrollXByOffset(offset);
    const max = min - scrollWidth;
    const maxOffset = scrollX / listRange;
    const minOffset = scrollX - scrollWidth * listRange;

    return scrollX !== undefined && !Boolean(
      (max > maxOffset) ||
      (max === maxOffset && speedScrollX <= 0) ||
      (min < minOffset) ||
      (min === minOffset && speedScrollX >= 0)
    );
  }

  _getScrollXByOffset (offset: number): number {
    return (
      -1 * (offset + 1) *
      this.current.listRange *
      this.current.scrollWidth
    );
  }

  _correctScrollX () {
    this.current.scrollX = this._limitScrollX(this._correctScroll(
      this._checkLimitOffsetX(),
      this.current.scrollX,
      this.current.scrollWidth
    ));
  }

  _checkLimitOffsetX (): number {
    return this._checkLimitOffset(
      this.current.scrollX,
      this.current.scrollOffsetLeft,
      this.current.scrollOffsetRight
    );
  }

  _scrollHeightSetter (value) {
    const scrollHeight = this.current.scrollHeight;

    this.current.scrollHeight = value;
    this.current.scrollOffsetTop = -1 * value;

    this.current.scrollY = this._limitScrollY(
      scrollHeight > 0 ? this.current.scrollY * value / scrollHeight :
      0
    );

    this.isChanged = true;
  }

  _scrollWidthSetter (value) {
    const scrollWidth = this.current.scrollWidth;

    this.current.scrollWidth = value;
    // -2 потому что listRange слева и справа
    this.current.scrollOffsetLeft = -2 * this.current.listRange * value;

    this.current.scrollX = this._limitScrollX(
      this.current.scrollX === undefined ? this._getScrollXByOffset(0) :
      scrollWidth > 0 ? this.current.scrollX * value / scrollWidth :
      0
    );

    this._correctScrollX();
    this.isChanged = true;
  }

  _scrollXSetter (value) {
    value = this._limitScrollX(value);
    if (value !== this.current.scrollX) {
      this.current.scrollX = value;
      this._correctScrollX();
      this.isChanged = true;
    }
  }

  _scrollYSetter (value) {
    value = this._limitScrollY(value);
    if (value !== this.current.scrollY) {
      this.current.scrollY = value;
      this.isChanged = true;
    }
  }
}