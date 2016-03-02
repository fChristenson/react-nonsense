'use strict';

import React from 'react';

export default (props) => {
  var letters = props.letters.map(function(letter, index) {
    return <span key={index}>{letter}</span>;
  });
  return (
      <div className="talkinput">
      {letters}
      </div>
      );
};
