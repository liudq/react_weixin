import initCss from '../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
	render
} from 'react-dom';
import MyOrderDetails from './container/index.js';

class Main extends React.Component {
	render() {
		return (
			<MyOrderDetails/>
		)
	}
}

render(
	<Main />,
	document.getElementById("mmhContainer")
);