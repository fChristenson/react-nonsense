'use strict';

import React  from 'react';
import Avatar from '../../components/avatar/index.jsx';
import styles from './talkerResult.scss';

export default (props) => {
  return (<div className="talkerresult">
      <h1 className="talkerresult__header">
          <div>Guesser</div>
          <div>guessed</div>
      </h1>
      <img className="talkerresult__image" src={props.selectedImage}/>
      </div>);
};

