/**
 * Вывод:
 * - 12 часов во вьюпорте
 */

import { Component } from 'react';

export default class Month extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {};
  }

  shouldComponentUpdate () {
    return false;
  }

  render () {
    return (
      <div>

      </div>
    );
  }
}
