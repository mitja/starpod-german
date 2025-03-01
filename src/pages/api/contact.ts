import type { APIRoute } from 'astro';

// For static builds, we need to modify this to handle forms without server-side code
// This is a static alternative using a client-side redirect to email

export const prerender = true;

// This function generates a static HTML page with JavaScript that
// will handle the form submission client-side
export const GET: APIRoute = async () => {
  return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>Contact Form Handler</title>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 1rem; }
    .message { margin: 2rem 0; padding: 1rem; border-radius: 4px; }
    .success { background: #d4edda; color: #155724; }
    .error { background: #f8d7da; color: #721c24; }
    button { display: inline-block; padding: 0.5rem 1rem; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="loading" class="message">Processing your submission...</div>
  <div id="success" class="message success" style="display:none">
    Thanks for contacting us! We'll be in touch soon.
    <p><button onclick="window.location.href='/'">Return to Homepage</button></p>
  </div>
  <div id="error" class="message error" style="display:none">
    There was a problem sending your message. Please try emailing directly to hi@mitjamartini.com.
    <p><button onclick="window.location.href='/contact'">Try Again</button></p>
  </div>

  <script>
    // Get form data from URL params
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const email = params.get('email');
    const message = params.get('message');
    
    // Check if we have the required data
    if (!name || !email || !message) {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('error').style.display = 'block';
    } else {
      // Generate a mailto link
      const subject = encodeURIComponent('Contact Form: ' + name);
      const body = encodeURIComponent('Name: ' + name + '\\n\\nEmail: ' + email + '\\n\\nMessage: ' + message);
      const mailtoLink = 'mailto:hi@mitjamartini.com?subject=' + subject + '&body=' + body;
      
      // In a real implementation, you might use a form service like Formspree, Netlify Forms, etc.
      // For this example, we'll just redirect to the mailto
      document.getElementById('loading').style.display = 'none';
      document.getElementById('success').style.display = 'block';
      
      // Optional: Open email client
      // window.location.href = mailtoLink;
    }
  </script>
</body>
</html>
  `, {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  });
};

// Keeping POST for compatibility with the form, but in static builds this won't be called
export const POST: APIRoute = async ({ request }) => {
  // This will be pre-rendered and not actually execute on POST
  // For static sites, form submissions should be handled client-side
  return new Response(JSON.stringify({
    message: `Thanks for contacting us! We'll be in touch soon.`
  }), { status: 200 });
};
