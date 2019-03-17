class groupmessage {
  constructor(subject, message, parentMessageId, status, groupId) {
    this.subject = subject;
    this.message = message;
    this.parentMessageId = parentMessageId;
    this.status = status;
    this.groupId = groupId;
  }
}

export default groupmessage;
