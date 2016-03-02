'use strict';

import React  from 'react';
import styles from './button.scss';

export default (props) => <button className="button" onClick={props.onClick}>{props.text}</button>;
