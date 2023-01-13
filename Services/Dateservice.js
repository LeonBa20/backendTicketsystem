import moment from 'moment';
export class Dateservice {
    getFormattedDate(date){
        let dateVar = moment(date);
        let formattedDate = dateVar.format("YYYY-MM-DD");
        return formattedDate;
    }

    checkIfDateIsInRange(start_date, end_date, checkdate) {
        let startDate = moment(start_date);
        let endDate = moment(end_date);
        let date = moment(checkdate);
        if (date.isSame(startDate) || date.isSame(endDate) || date.isBetween(startDate, endDate)) {
           return true;
        } else {
            return false;
        }
    }

}