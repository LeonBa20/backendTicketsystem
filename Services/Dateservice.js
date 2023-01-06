import moment from 'moment';
export class Dateservice {
    getFormattedDate(date){
        let dateVar = moment(date);
        let formattedDate = dateVar.format("YYYY-MM-DD");
        return formattedDate;
    }
}