"use client";

import { FormEvent, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

type ContactFormProps = {
  copy: Dictionary["contact"]["form"];
  locale: Locale;
};

export function ContactForm({ copy, locale }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">{copy.name}</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor="email">{copy.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="form-field form-field--message">
        <label htmlFor="message">{copy.message}</label>
        <textarea id="message" name="message" rows={3} required />
      </div>
      <div className="contact-form__actions">
        <button type="submit" className="text-link text-link--button">
          {copy.submit} <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
        </button>
        <p className="contact-form__status" role="status" aria-live="polite">
          {submitted ? copy.status : ""}
        </p>
      </div>
    </form>
  );
}
