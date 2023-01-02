export class Ticket {
  constructor(ticketId, userId, eventName, eventDate, ticketDetails, active, redeemDays, lastRedeemed) {
    this.ticketId = ticketId;
    this.userId = userId;
    this.eventName = eventName;
    this.eventDate = eventDate;
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

  getEventDate() {
    return this.eventDate;
  }

  setEventDate(eventDate) {
    this.eventDate = eventDate;
  }

  getTicketDetails() {
    return this.ticketDetails;
  }

  setTicketDetails(ticketDetails) {
    this.ticketDetails = ticketDetails;
  }

  isActive() {
    return this.active;
  }
}