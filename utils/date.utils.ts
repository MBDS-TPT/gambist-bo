export default class DateUtil {

    static parseDate(date: any) {
        const tmp = new Date(date);
        return tmp.toDateString();
    }

    static getTime(date: any) {
        const tmp =  new Date(date);
        return tmp.getHours() + ':' + tmp.getMinutes()
    }

} 