import React, { useEffect, useState } from "react";
import { fetchASingleMessage } from "../services/EmailService";

export default function Mail(props) {
  /** @param message is a single received email object */
  let [message, setMessage] = useState({});

  /**
   * gets a message from the @function fetchASingleMessage and sets it to @param message
   */
  const getMessage = () => {
    fetchASingleMessage(props.email, props.activeTab)
      .then((message) => {
        setMessage(message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  /** Runs the @function getMessage when the Mail component is loaded */
  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div>
      <button className="btn btn-secondary my-2"
        onClick={() => {
          props.setActiveTab(-1);
        }}
      >
        Back
      </button>
      {message !== {} && (
        <div>
          <h5>{message.subject}</h5>
          <h6>{message.from}</h6>
          <div dangerouslySetInnerHTML={{ __html: message.body }} />
        </div>
      )}
    </div>
  );
}
