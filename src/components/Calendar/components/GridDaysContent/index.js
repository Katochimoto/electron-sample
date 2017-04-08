import { StoreComponent } from '../../utils/Component';

import Day from '../Day';
import DayHours from '../DayHours';
import InfiniteList from '../InfiniteList';
import GridDaysItem from '../GridDaysItem';

import styles from './index.less';

export default class GridDaysContent extends StoreComponent {
  constructor (props, context) {
    super(props, context);
    this.getItemElement = this.getItemElement.bind(this);
  }

  transformState (props, context) {
    const { gridDaysItemSize, currentDate } = context.store.getState();
    const { scrollY } = context.infiniteStore.getState();
    return { scrollY, gridDaysItemSize, currentDate };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.state.scrollY !== nextState.scrollY ||
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
    );
  }

  componentDidMount () {
    super.componentDidMount();

    this.context.infiniteStore.addChangeListener(this.updateState, this);

    this.context.infiniteStore.addListener('next', () => {
      const { gridDaysItemSize, currentDate } = this.state;
      const date = this.context.store.gridDateOffset(currentDate, gridDaysItemSize);
      this.context.store.update({ currentDate: date });
    }, this);

    this.context.infiniteStore.addListener('prev', () => {
      const { gridDaysItemSize, currentDate } = this.state;
      const date = this.context.store.gridDateOffset(currentDate, -(gridDaysItemSize));
      this.context.store.update({ currentDate: date });
    }, this);
  }

  componentWillUnmount () {
    super.componentWillUnmount();

    this.context.infiniteStore.removeChangeListener(this.updateState, this);

    //this.context.infiniteStore.removeListener('next');
    //this.context.infiniteStore.removeListener('prev');
  }

  // TODO сделать forceUpdated при изменении стора сетки
  componentWillUpdate (nextProps, nextState) {
    if (
      this.state.gridDaysItemSize !== nextState.gridDaysItemSize ||
      this.state.currentDate !== nextState.currentDate
      // hideWeekends
    ) {
      this.context.infiniteStore.forceUpdated();
    }
  }

  getItemElement (offset) {
    const { gridDaysItemSize, currentDate } = this.state;
    const date = this.context.store.gridDateOffset(currentDate, offset * gridDaysItemSize);

    return (
      <GridDaysItem
        date={date}
        itemSize={gridDaysItemSize}
        ItemComponent={Day} />
    );
  }

  getRect () {
    return {
      scrollHeight: this._contentNode.scrollHeight - this._contentNode.clientHeight,
      scrollWidth: this._contentScrollNode.clientWidth
    };
  }

  render () {
    const style = `transform: translateY(${this.state.scrollY}px)`;

    return (
      <div ref={node => this._contentNode = node}
        className={styles.calendar_GridDaysContent}>

        <div ref={node => this._contentScrollNode = node}
          className={styles.calendar_GridDaysContent_Scroll}
          style={style}>

          <DayHours />

          <InfiniteList
            getItemElement={this.getItemElement} />
        </div>
      </div>
    );
  }
}
