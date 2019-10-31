/* eslint-disable */
/* 时间格式转换 */
export function getSimpleTime (date) {
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    let currentdate = date.getFullYear() + '-' + month + '-' + strDate
    return currentdate
}

// 检查字符串是否由数字或字母组成
export function isAlnum (str) {
    let zg =  /^[0-9a-zA-Z]*$/;
    if (!zg.test(str)) {
      return false;
    } else {
      return true;
    }
}

// 检查字符串是否由数字组成
export function isNum (str) {
  let zg =  /^[0-9]*$/;
  if (!zg.test(str)) {
    return false;
  } else {
    return true;
  }
}