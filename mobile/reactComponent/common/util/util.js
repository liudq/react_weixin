Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "h+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function dateFormat(millisecond) {
  return new Date(millisecond).Format("yyyy-MM-dd");
}

function dateFormatDetailed(millisecond) {
  return new Date(millisecond).Format("yyyy-MM-dd hh:mm:ss");
}

function strSubstring(str) {
  var str = str;
  return str.substring(0, 3) + "****" + str.substring(8, 11);
}

function dcjDateFormatDetailed(millisecond) {
  return new Date(millisecond).Format("hh:mm:ss");
}

exports.strSubstring = strSubstring;
exports.dateFormat = dateFormat;
exports.dateFormatDetailed = dateFormatDetailed;
exports.dcjDateFormatDetailed = dcjDateFormatDetailed;