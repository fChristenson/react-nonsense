'use strict';

import React  from 'react';

export default (props) => {
  return (<div className="avatar">
      <div className="avatar__player">{props.player}</div>
      <div className="avatar__score">{props.score}</div>
      </div>);
};
