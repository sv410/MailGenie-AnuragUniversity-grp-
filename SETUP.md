# 🚀 Setup Guide for MailGenie AI

## Quick Setup to Get AI Replies Working

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-`)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-your_actual_api_key_here

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_here_change_this_in_production

# Environment
NODE_ENV=development
```

### 3. Restart Your Development Server

```bash
npm run dev
# or
pnpm dev
```

### 4. Test the Configuration

1. Go to your application
2. Try generating an email reply
3. You should now get AI-powered responses instead of fallback templates

## 🔧 Troubleshooting

### If you still get fallback responses:

1. **Check your API key format**: It should start with `sk-`
2. **Verify the .env.local file**: Make sure it's in the root directory
3. **Restart the server**: Environment variables require a server restart
4. **Check API key validity**: Ensure your OpenAI account has credits

### If you get errors:

1. **API key not found**: Make sure `.env.local` exists and has the correct variable name
2. **Invalid API key**: Verify the key format and validity
3. **Rate limiting**: Check your OpenAI usage limits

## 💡 Features Now Available

With proper API configuration, you'll get:

- ✅ **AI-powered email replies** with context awareness
- ✅ **Automatic tone detection** based on email content
- ✅ **Multiple tone options**: Formal, Friendly, Concise, Empathetic, Professional, Casual, Urgent, Apologetic
- ✅ **High-quality responses** that match the selected tone
- ✅ **Fallback responses** when API is unavailable

## 🎯 Best Practices

1. **Keep your API key secure**: Never commit it to version control
2. **Monitor usage**: Check your OpenAI dashboard for usage and costs
3. **Use appropriate tones**: Select the tone that matches your relationship with the recipient
4. **Review responses**: Always review AI-generated content before sending

## 📞 Support

If you're still having issues:
1. Check the browser console for errors
2. Verify your OpenAI account has sufficient credits
3. Ensure your API key has the necessary permissions
