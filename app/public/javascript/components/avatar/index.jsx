'use strict';

import React  from 'react';

export default (props) => {
  const style = {background: props.color};
  return (<div className="avatar">
      <div className="avatar__player" style={style}>{props.player}</div>
      <div className="avatar__score">{props.score}</div>
      </div>);
};
