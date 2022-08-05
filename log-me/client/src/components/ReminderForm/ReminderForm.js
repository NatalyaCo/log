import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_REMINDER } from "../../utils/mutations";
import { QUERY_REMINDERS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ReminderForm = () => {
  const [reminderText, setReminderText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addReminder, { error }] = useMutation(ADD_REMINDER, {
    update(cache, { data: { addReminder } }) {
      try {
        const { reminders } = cache.readQuery({ query: QUERY_REMINDERS });

        cache.writeQuery({
          query: QUERY_REMINDERS,
          data: { reminders: [addReminder, ...reminders] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reminders: [...me.reminders, addReminder] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReminder({
        variables: {
          reminderText,
          reminderAuthor: Auth.getProfile().data.username,
        },
      });

      setReminderText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "reminderText" && value.length <= 280) {
      setReminderText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Did you sub a class today?</h3>

      <>
        <p
          className={`m-0 ${
            characterCount === 280 || error ? "text-danger" : ""
          }`}
        >
          Character Count: {characterCount}/280
        </p>
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <textarea
              name="reminderText"
              placeholder="Here's a new Reminder..."
              value={reminderText}
              className="form-input w-100"
              style={{ lineHeight: "1.5", resize: "vertical" }}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Reminder
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      </>
    </div>
  );
};

export default ReminderForm;
