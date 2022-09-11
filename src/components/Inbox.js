import React, { useState } from "react";
import { fetchInbox } from "../services/EmailService";

export default function Inbox(props) {
  
  /** @param messages is the emails received to the email address */
  let [messages, setMessages] = useState();

  /**
   * gets the messages from the @function fetchInbox and sets it to @param messages
   */
  const getMessages = () => {
    fetchInbox(props.email)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  /** puts the messages data in the inbox table */
  const renderInbox = (message) => {
    return (
      <tr key={message.id} onClick={() => props.setActiveTab(message.id)}>
        <td>{message.from.substring(0, message.from.lastIndexOf("@"))}</td>
        <td>{message.subject}</td>
        <td>{message.date}</td>
      </tr>
    );
  };

  return (
    <div>
      <h3>Inbox</h3>
      <table className="table table-striped">
        <tbody>{messages?.map(renderInbox)}</tbody>
      </table>
      <button className="btn btn-primary" onClick={getMessages}>
        Refresh Inbox
      </button>
    </div>
  );
}
