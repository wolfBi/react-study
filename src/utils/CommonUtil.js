/**
 * Created by zhou on 2017/6/9.
 */

import lodash from "lodash";

export default class CommonUtil {

    static deepClone = (obj) => {
        return lodash.cloneDeep(obj)
    }

    static isEmpty = (value) => {
        if (value !== null && value !== undefined) {
            if (typeof value === 'string' && value.trim() !== '') {
                return false
            } else if (typeof value === 'object' && value.constructor !== Array && !CommonUtil.isEmptyObject(value)) {
                return false
            } else if (typeof value === 'object' && value.constructor === Array && value.length > 0) {
                return false
            }  else if (typeof value === 'number' ) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }
    static isEmptyObject = (e) => {
        var t;
        for (t in e)
            return !1;
        return !0
    }
    static isNumber = (input)=>{
        var re = /^[0-9]+.?[0-9]*$/;
        return re.test(input)
    }
    static isEmail = (szMail) => {
        var szReg = /^[A-Za-z0-9]+([._-]*[A-Za-z0-9])*@([A-Za-z0-9]+[-A-Za-z0-9]*[A-Za-z0-9]+.){1,63}[A-Za-z0-9]+$/
        var bChk = szReg.test(szMail);
        return bChk;
    }

    static isTrue = (e) => {
        let value = false;
        if (e && (typeof e === "string" || e instanceof String)) {
            if (e.toLowerCase() === "true") {
                value = true;
            }
        }
        if (e && (typeof value === "boolean")) {
            value = e;
        }
        return value;
    }

    static getURLQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(2).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    static isValidRange(v, length) {
        return v && v.length >= length;
    }

    static guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    }
    static guidNum = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000000000000).toString(10);
        }
        let numstr = s4() + s4() + s4();
        numstr = numstr.substring(0,32);
        return numstr
    }
    static commonIconSize = '2x';
    static commonIconStyle = {color: "#0065BD"};
}