'use strict';

import React  from 'react';

export default (props) => {
  var letters = props.letters.map(function(letterObj, index) {
    const style = {color: letterObj.player.color};
    return <span key={index} style={style}>{letterObj.letter}</span>;
  });

  return (
      <div className="talkinput">
      {letters}
      </div>
      );
};
