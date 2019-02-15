import moment from "moment";

export default class DateUtil {
    static defaultFormat = 'MM/DD/YYYY';
    static defaultTimestampFormat = 'MM/DD/YYYY HH:mm:ss';
    static ServiceDataFormat = 'MM/DD/YYYY HH:mm A';
    static EnMonthFormat = 'MMMM DD,YYYY HH:mm:ss A'; //July 17, 2017 7:21:00 AM
    static EnShortMonthFormat = 'MMM DD,YYYY HH:mma'; //Dec 17, 2017 7:21pm

    static formatDate(date, format) {
        if (!format) {
            format = DateUtil.defaultFormat
        }
        if (date) {
            if (date instanceof Date) {
                return moment(date.getTime()).format(format);
            } else if (date instanceof moment) {
                return date.format(format);
            }
        } else {
            return undefined;
        }
    }

    static parseDate(dateStr, format) {
        if (!format) {
            format = DateUtil.defaultFormat;
        }
        if (dateStr) {
            return moment(dateStr, format);
        }
    }

    static parseFormatDate(dateStr, parseFormat, format) {
        if (!parseFormat) {
            parseFormat = DateUtil.defaultFormat;
        }
        if (dateStr) {
            let date = moment(dateStr, parseFormat);
            dateStr = this.formatDate(date, format)
        }
        return dateStr
    }

}