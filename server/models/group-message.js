/**
 *a class for creating an object to store group message information
 */
class groupmessage {
  constructor(subject, message, parentMessageId, groupId) {
    this.subject = subject;
    this.message = message;
    this.parentMessageId = parentMessageId;
    this.groupId = groupId;
  }
}

export default groupmessage;
