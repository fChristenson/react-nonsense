'use strict';

import React  from 'react';
import styles from './avatar.scss';

export default (props) => {
  return (<div className="avatar">
      <div className="avatar__player">{props.player}</div>
      <div className="avatar__score">{props.score}</div>
      </div>);
};
