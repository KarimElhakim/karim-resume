# Formspree Setup - Quick Guide (2 minutes)

The contact form now uses Formspree, which is much easier to set up than EmailJS.

## Quick Setup Steps:

1. **Go to Formspree**: https://formspree.io/
2. **Sign up** (free account - 50 submissions/month on free tier)
3. **Create a new form**:
   - Click "New Form"
   - Name it "Resume Contact Form"
   - Set recipient email to: **karimali1896@gmail.com**
   - Click "Create Form"
4. **Copy your form endpoint** (looks like: `https://formspree.io/f/xxxxxxxxxx`)
5. **Update the code**:
   - Open `react-app/src/App.jsx`
   - Find line 28: `const formspreeEndpoint = ...`
   - Replace `'https://formspree.io/f/xpwnqgvd'` with your actual endpoint
6. **Save and push**:
   ```bash
   git add .
   git commit -m "Update Formspree endpoint"
   git push
   ```

That's it! The form will now send emails directly to karimali1896@gmail.com.

## Alternative: Use the endpoint I provided

The current endpoint `https://formspree.io/f/xpwnqgvd` is a placeholder. You need to:
1. Sign up at Formspree
2. Create a form
3. Replace the endpoint in the code

## Testing

After setting up:
1. Fill out the contact form on your website
2. Submit it
3. Check your email (karimali1896@gmail.com)
4. You should receive the message!

## Need Help?

If you want me to set up the Formspree account for you, I can guide you through it step by step. Just let me know!

