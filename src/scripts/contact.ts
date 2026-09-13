const form = document.querySelector<HTMLFormElement>('#contact-form');
if (form) {
  const status = document.querySelector<HTMLElement>('#form-status')!;
  const submit = document.querySelector<HTMLButtonElement>('#submit-contact')!;
  const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input, select, textarea',
  );
  let busy = false;
  let requestId = crypto.randomUUID();
  submit.disabled = false;
  const feedback = (message: string, error = false) => {
    status.textContent = message;
    status.dataset.error = String(error);
  };
  form.addEventListener('input', () => {
    if (!busy) {
      requestId = crypto.randomUUID();
      feedback('');
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const topic = String(values.get('topic') || '').trim();
    const message = String(values.get('message') || '').trim();
    const website = String(values.get('website') || '');
    if (!name || message.length < 10) {
      feedback('Please add your name and at least 10 characters describing the work.', true);
      status.focus();
      return;
    }
    busy = true;
    submit.disabled = true;
    fields.forEach((field) => (field.disabled = true));
    form.setAttribute('aria-busy', 'true');
    feedback('Sending your message…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch(form.dataset.endpoint || '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, topic, message, website, requestId }),
        signal: controller.signal,
      });
      if (response.status === 429) {
        feedback('Too many attempts. Please wait before trying again, or email me directly.', true);
        return;
      }
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Delivery not accepted');
      form.reset();
      requestId = crypto.randomUUID();
      feedback('Your message was sent. Thanks for sharing the context.');
    } catch {
      feedback(
        controller.signal.aborted
          ? 'Delivery has not been confirmed yet. Your details are still here. Retry to check the same submission, or email me directly.'
          : 'Your message could not be sent. Your details are still here. Try again, or email me directly.',
        true,
      );
    } finally {
      clearTimeout(timeout);
      busy = false;
      submit.disabled = false;
      fields.forEach((field) => (field.disabled = false));
      form.removeAttribute('aria-busy');
      status.focus();
    }
  });
}
export {};
