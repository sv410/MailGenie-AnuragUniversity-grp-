# MailGenie - AI-Powered Email Reply Generator

A modern, intelligent email reply generator that uses AI to create contextually appropriate responses with automatic tone detection.

## ✨ Features

### 🤖 **AI-Powered Email Replies**
- **Automatic Tone Detection**: AI analyzes email content and selects the most appropriate tone
- **Context-Aware Responses**: Generates replies that understand the email context
- **Multiple Tone Options**: Formal, Friendly, Concise, and Empathetic tones
- **Real-time Generation**: Instant AI-powered replies using OpenAI GPT-4

### 🔐 **User Authentication**
- **Secure Signup/Login**: Complete user registration and authentication system
- **Persistent Storage**: User data stored securely in local JSON files
- **Session Management**: JWT-based authentication with HTTP-only cookies
- **Password Security**: Bcrypt-hashed passwords for enhanced security

### 📊 **History & Analytics**
- **Reply History**: Automatic tracking of all generated replies
- **User Dashboard**: Personalized dashboard with recent activity
- **Search & Filter**: Easy access to past replies and conversations

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Purple Theme**: Beautiful purple color scheme throughout the application
- **Intuitive Interface**: Clean, modern design with excellent user experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- OpenAI API key (optional for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mailgenie-au-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI API Configuration (Optional for testing)
   OPENAI_API_KEY=your_openai_api_key_here
   
   # JWT Secret (Optional - safe default used locally)
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1. **Create an Account**
- Visit the homepage and click "Sign In"
- Click "Create Account" to register
- Fill in your details and create your account

### 2. **Generate Email Replies**
- Log in to your dashboard
- Paste the email content you want to reply to
- Optionally select a specific tone (or let AI auto-detect)
- Click "Generate AI Reply"
- Copy the generated reply to your clipboard

### 3. **View Your History**
- Check the "Recent Replies" section on your dashboard
- View your past generated replies with timestamps
- See which tone was used for each reply

## 🔧 Technical Architecture

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Modern component library
- **Lucide React**: Beautiful icons

### **Backend APIs**
- **Authentication**: `/api/auth/signup`, `/api/auth/login`, `/api/auth/me`
- **AI Generation**: `/api/generate-reply` with automatic tone detection
- **History**: `/api/history` for user reply tracking
- **File Downloads**: `/api/download-extension` for browser extensions

### **Data Storage**
- **User Data**: `data/users.json` with bcrypt-hashed passwords
- **Reply History**: `data/history/<userId>.json` per user
- **Session Management**: JWT tokens with HTTP-only cookies

### **AI Integration**
- **OpenAI GPT-4**: Advanced language model for reply generation
- **Tone Detection**: Intelligent analysis of email content
- **Fallback System**: Mock replies when API key not configured

## 🎯 Use Cases

### **Business Professionals**
- Quick responses to client emails
- Professional communication maintenance
- Time-saving on routine correspondence

### **Customer Support**
- Consistent response quality
- Faster ticket resolution
- Tone-appropriate customer interactions

### **Personal Use**
- Social email management
- Professional networking
- Email productivity improvement

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Secure session management
- **HTTP-only Cookies**: Protection against XSS attacks
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Graceful error management

## 🛠️ Development

### **Project Structure**
```
mailgenie-au-pro/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── data/                  # Local data storage
└── public/                # Static assets
```

### **Key Dependencies**
- `next`: React framework
- `@ai-sdk/openai`: OpenAI integration
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `lucide-react`: Icons
- `tailwindcss`: Styling

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Other Platforms**
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment variables
- **DigitalOcean**: App Platform deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**MailGenie** - Transform your email workflow with AI-powered intelligence! ✨
