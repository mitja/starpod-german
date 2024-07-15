import { useState } from 'preact/hooks';

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState('');

  async function submit(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();

    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form class="flex flex-col gap-2" onSubmit={submit}>
      <input
        class="input"
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        required
      />
      <input
        class="input"
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
      />

      <textarea
        class="input"
        id="message"
        name="message"
        placeholder="Write a message"
        required
      />

      <div class="mt-6 flex w-full justify-end">
        <button class="btn w-full justify-center lg:w-auto">
          <span class="rounded-full px-10 py-4 text-center text-light-text-heading dark:text-white">
            Submit
          </span>
        </button>
      </div>
    </form>
  );
}
