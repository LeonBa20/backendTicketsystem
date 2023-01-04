export class Ticket {
  constructor(ticketId, userId, eventName, startDate, endDate, ticketDetails, active, redeemDays, lastRedeemed) {
    this.ticketId = ticketId;
    this.userId = userId;
    this.eventName = eventName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.ticketDetails = ticketDetails;
    this.active = active;
    this.redeemDays = redeemDays;
    this.lastRedeemed = lastRedeemed;
  }

  getTicketId() {
    return this.ticketId;
  }

  setTicketId(ticketId) {
    this.ticketId = ticketId;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getEventName() {
    return this.eventName;
  }

  setEventName(eventName) {
    this.eventName = eventName;
  }

  getStartDate() {
    return this.startDate;
  }

  setStartDate(startDate) {
    this.startDate = startDate;
  }

  getEndDate() {
    return this.endDate;
  }

  setEndDate(endDate) {
    this.endDate = endDate;
  }

  getTicketDetails() {
    return this.ticketDetails;
  }

  setTicketDetails(ticketDetails) {
    this.ticketDetails = ticketDetails;
  }
}