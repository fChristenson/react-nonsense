'use strict';

import React  from 'react';
import Header from '../../components/header/index.jsx';
import Avatar from '../../components/avatar/index.jsx';
import Button from '../../components/button/index.jsx';

export default (props) => {
  const rows = props.scores.map((score, index) => {
    return <tr key={index}><td><Avatar player={score.player}/></td><td>{score.points}</td></tr>;  
  });
  return (<div className="scoreboard">
      <Header textTop={'Scoreboard'}>
      <table className="scoreboard__table">
      <tbody>
      {rows} 
      </tbody>
      </table>
      <Button text={'Done'} onClick={props.endGame}/>
      </Header>
      </div>);
};

