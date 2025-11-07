# EmailJS Setup Instructions

The contact form is now configured to send emails using EmailJS. Follow these steps to set it up:

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

## Step 2: Create an Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (karimali1896@gmail.com)
5. Note down your **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your resume website contact form.
```

4. Note down your **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)
3. Copy it

## Step 5: Configure Environment Variables

Create a `.env` file in the `react-app` folder (or add to your existing one):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important:** For GitHub Pages deployment, you need to add these as GitHub Secrets:

1. Go to your repository: https://github.com/KarimElhakim/karim-resume
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

Then update the GitHub Actions workflow to use these secrets (or use them directly in the code for now).

## Step 6: Update the Code (Temporary Solution)

For now, you can hardcode the values in `App.jsx`:

```js
const serviceId = 'your_service_id_here'
const templateId = 'your_template_id_here'
const publicKey = 'your_public_key_here'
```

Replace the placeholder values in `App.jsx` lines 36-38.

## Step 7: Test

1. Run `npm run dev`
2. Fill out the contact form
3. Submit it
4. Check your email (karimali1896@gmail.com)

## Troubleshooting

- **Emails not sending?** Check the browser console for errors
- **Service ID/Template ID errors?** Make sure you copied them correctly
- **Rate limit?** Free tier is 200 emails/month
- **Still not working?** Check EmailJS dashboard for error logs

## Alternative: Use Formspree

If EmailJS doesn't work for you, you can use [Formspree](https://formspree.io/) instead:
1. Sign up at formspree.io
2. Create a form
3. Get your form endpoint
4. Update the form to POST to that endpoint

