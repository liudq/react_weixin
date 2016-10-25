import initCss from '../common/util/init.css';
import React from 'react';
import ReactDom from 'react-dom';
import {
	render
} from 'react-dom';

import MmhAlert from "../common/mmhAlert/mmhAlert.js"
import EaringInfoD from './index/index.js';
class Main extends React.Component {
	render() {
		return (
			<div style={{"height":"100%"}}>
				<MmhAlert/>
				<EaringInfoD/>
			</div>

		)
	}
}

render(
	<Main />,
	document.getElementById("mmhContainer")
);