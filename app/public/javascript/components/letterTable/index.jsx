'use strict';

import React  from 'react';
import styles from './letterTable.scss';

const onClick = (letter, props) => {
  return () => props.onClick(letter)
};

export default (props) => {
  let rows  = [];
  let cells = [];
  props.letters.forEach(function(letter, index) {
    if(index !== 0 && index % 4 === 0) {
      rows.push(<tr key={index}>{cells}</tr>);
      cells = [];
    }
    cells.push(<td key={index}><button className="lettertable__button" onClick={onClick(letter, props)}>{letter}</button></td>);
    if(props.letters.length - 1 === index) {
      rows.push(<tr key={props.letters.length}>{cells}</tr>);
    }
  });
  return (<table className="lettertable">
      <tbody>
      {rows}
      </tbody> 
      </table>);
};

