import initCss from '../../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
	render
} from 'react-dom';
import MyInfo from './index/index.js';
class Main extends React.Component {
	render() {
		return (
			<MyInfo/>
		)
	}
}

render(
	<Main />,
	document.getElementById("mmhContainer")
);