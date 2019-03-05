class messagee {
  constructor(id, createdOn, subject, message, senderId, receiverId, parentMessageId, status) {
    this.id = id;
    this.createdOn = createdOn;
    this.subject = subject;
    this.message = message;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.parentMessageId = parentMessageId;
    this.status = status;
  }
}

export default messagee;
