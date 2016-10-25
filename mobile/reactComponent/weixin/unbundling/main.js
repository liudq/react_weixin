require("../../common/util/init.css");
var React = require("react");
var ReactDom = require("react-dom");

var IndexPage = require("./index/index.js");
// var DownloadGuide = require("./downloadGuide/index.js");
// var MmhAlert = require("./mmhAlert/mmhAlert.js");
var MmhAlert = require("../../common/mmhAlert/mmhAlert.js");

var Main = React.createClass({
	render: function() {
		return (
			<div>
				<MmhAlert/> 
        <IndexPage/>
        
      </div>
		)
	}
});

ReactDom.render(
	<Main />,
	document.getElementById("mmhContainer")
);