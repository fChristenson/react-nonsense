'use strict';

import React  from 'react';
import Avatar from '../../components/avatar/index.jsx';
import Button from '../../components/button/index.jsx';

export default (props) => {
  const rows = props.scores.map((score, index) => {
    return <tr key={index}><td className="scoreboard__table__cell"><Avatar player={score.player}/></td><td>{score.points}</td></tr>;
  });
  return (<div className="scoreboard">
      <h1 className="scoreboard__header">Scoreboard</h1>
      <table className="scoreboard__table">
      <tbody>
      {rows} 
      </tbody>
      </table>
      <Button text={'Done'} onClick={props.endGame}/>
      </div>);
};

