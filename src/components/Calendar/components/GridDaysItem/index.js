import { Component, PropTypes } from '../../Component';
import arr2obj from '../../utils/arr2obj';

import styles from './index.less';

export default class GridDaysItem extends Component {
  transformState ({ currentDate, weekends, hideWeekends, hoursOfDay }) {
    return { currentDate, weekends, hideWeekends, hoursOfDay };
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      this.props.itemSize !== nextProps.itemSize ||
      this.props.listOffset !== nextProps.listOffset ||

      this.state.currentDate !== nextState.currentDate ||
      this.state.hideWeekends !== nextState.hideWeekends ||
      this.state.weekends !== nextState.weekends ||
      this.state.hoursOfDay !== nextState.hoursOfDay
    );
  }

  getItems () {
    const datetime = this.context.datetime;
    const { listOffset, itemSize, ItemComponent } = this.props;
    const { currentDate, weekends, hideWeekends } = this.state;
    const weekendsObj = weekends ? arr2obj(weekends.split(',')) : {};

    let items = [];
    let idx = listOffset * itemSize;
    let end = listOffset * itemSize + itemSize - 1;
    let idxLocal = 0; // local index minimizes redraw

    for (; idx <= end; idx++) {
      const date = datetime.offsetDay(currentDate, idx);
      const weekend = Boolean(weekendsObj[ datetime.getDay(date) ]);

      if (!weekend || !hideWeekends) {
        items.push(
          <ItemComponent key={idxLocal} date={date} weekend={weekend} />
        );
        idxLocal++;
      }
    }

    return items;
  }

  render () {
    return (
      <div className={styles.calendar_GridDaysItem}>
        {this.getItems()}
      </div>
    );
  }
}

GridDaysItem.propTypes = {
  ItemComponent: PropTypes.function,
  itemSize: PropTypes.number,
  listOffset: PropTypes.number
};

GridDaysItem.defaultProps = {
  itemSize: 0,
  listOffset: 0
};
