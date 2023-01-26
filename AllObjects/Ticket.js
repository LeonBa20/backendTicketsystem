export class Ticket {
  constructor(
    ticketId,
    userId,
    eventName,
    startDate,
    endDate,
    ticketDetails,
    active,
    redeemDays,
    lastRedeemed
  ) {
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

}
