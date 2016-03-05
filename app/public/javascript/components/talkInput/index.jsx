'use strict';

import React  from 'react';

export default (props) => {
  var letters = props.letters.map(function(letterObj, index) {
    return <span key={index}>{letterObj.letter}</span>;
  });
  return (
      <div className="talkinput">
      {letters}
      </div>
      );
};
