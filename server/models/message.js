/**
 *a class for creating an object to store message/email information
 */
class Message {
  constructor(subject, message, senderEmail, receiverEmail, status) {
    this.subject = subject;
    this.message = message;
    this.senderEmail = senderEmail;
    this.receiverEmail = receiverEmail;
    this.status = status;
  }
}

export default Message;
