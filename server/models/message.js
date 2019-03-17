class Message {
  constructor(subject, message, parentMessageId, senderId, receiverId, status) {
    this.subject = subject;
    this.message = message;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.parentMessageId = parentMessageId;
    this.status = status;
  }
}

export default Message;
