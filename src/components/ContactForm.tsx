import { useState } from 'preact/hooks';

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.message) {
        setResponseMessage(data.message);
      }
      if (response.ok) {
        setFormSubmitted(true);
      }
    } catch {}
  }

  return (
    <>
      {formSubmitted ? (
        `${responseMessage}`
      ) : (
        <form class="flex flex-col gap-2" onSubmit={submit}>
          <input
            class="input"
            type="text"
            id="name"
            name="name"
            placeholder="Dein Name"
            required
          />
          <input
            class="input"
            type="email"
            id="email"
            name="email"
            placeholder="Deine E-Mail-Adresse"
            required
          />

          <textarea
            class="input"
            id="message"
            name="message"
            placeholder="Deine Nachricht"
            required
          />

          <div class="my-6 flex w-full">
            <button class="btn w-full justify-center lg:w-auto">
              <span class="rounded-full px-12 py-3 text-center text-sm text-light-text-heading dark:text-white">
                Absenden
              </span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
