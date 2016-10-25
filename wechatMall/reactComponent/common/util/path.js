var imgPath = "";
var eshopHomePath = "";
var fpHomePath = "";
var casPath = "";
$.ajax({
  url: '/configure/ipPath.json',
  async: false,
  cache: false,
  type: 'GET',
  dataType: 'json',
  success: function(data) {
    imgPath = data.imgPath;
    eshopHomePath = data.eshopHomePath;
    fpHomePath = data.fpHomePath;
    casPath = data.casPath;
  }
});

exports.path = imgPath;
exports.eshopHomePath = eshopHomePath;
exports.fpHomePath = fpHomePath;
exports.casPath = casPath;