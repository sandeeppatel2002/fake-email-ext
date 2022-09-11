/**
 * @returns a random fake email id from the api
 */
export async function generateRandomEmail() {
  const url =
    "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error generating email: ${response.status}`);
  }

  // the data is received as a array of email ids
  let emails = await response.json();

  return emails[0];
}

/**
 * Fetches the inbox of the provided email address
 * @param {string} emailId email id for fetching the messages
 * @returns an array of message objects
 */
export async function fetchInbox(emailId) {
  let userName = emailId.substring(0, emailId.lastIndexOf("@"));
  let domain = emailId.substring(emailId.lastIndexOf("@") + 1);
  let url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${userName}&domain=${domain}`;

  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching inbox: ${response.status}`);
  }

  // the messages are received as an array of objects
  let messages = await response.json();

  return messages;
}

/**
 * Fetches all the contents of a single message
 * @param {string} emailId email id in which the email is received
 * @param {number} messageId message id for the message
 * @returns a single message object
 */
export async function fetchASingleMessage(emailId, messageId) {
  let userName = emailId.substring(0, emailId.lastIndexOf("@"));
  let domain = emailId.substring(emailId.lastIndexOf("@") + 1);
  let url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${userName}&domain=${domain}&id=${messageId}`;

  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching message: ${response.status}`);
  }

  // the message is received as an object
  let message = await response.json();

  return message;
}
