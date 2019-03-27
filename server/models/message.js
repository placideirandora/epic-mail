class Message {
  constructor(subject, message, parentMessageId, senderEmail, receiverEmail, status) {
    this.subject = subject;
    this.message = message;
    this.parentMessageId = parentMessageId;
    this.senderEmail = senderEmail;
    this.receiverEmail = receiverEmail;
    this.status = status;
  }
}

export default Message;
