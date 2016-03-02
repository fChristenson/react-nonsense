'use strict';

import React from 'react';

export default (props) => {
  return (
        <div className="header">
        <h1 className="header__texttop">{props.textTop}</h1>
        <h1 className="header__textbottom">{props.textBottom}</h1>
        {props.children}
        </div>
      );
};
