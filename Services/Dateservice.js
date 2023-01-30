import moment from "moment";

/* Klasse, die Services zu Daten bereitstellt. Die erste Methode ändert das Format eines Datums. Die zweite prüft, ob sich ein Datum
   innerhalb eines Zeitraums (bestehend aus einem Anfangsatum und Enddatum) befindet. */

export class Dateservice {
  getFormattedDate(date) {
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
