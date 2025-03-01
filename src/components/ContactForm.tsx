import { useState } from 'preact/hooks';

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  function submit(e: SubmitEvent) {
    e.preventDefault();

    // For static builds, we'll redirect to our static API endpoint with the form data
    const formData = new FormData(e.target as HTMLFormElement);
    
    // Build query params
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });
    
    // Set a success message and then redirect
    setResponseMessage("Thanks for contacting us! We'll be in touch soon.");
    setFormSubmitted(true);
    
    // Redirect to our static handler with params
    window.location.href = `/api/contact?${params.toString()}`;
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
