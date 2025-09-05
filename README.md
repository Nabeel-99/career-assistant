# 🚀 Career Assistant

> **An AI-powered career development platform designed to accelerate your professional growth**

Career Assistant is a comprehensive web application that leverages cutting-edge AI technology to help professionals at every stage of their career journey. Whether you're a fresh graduate, career changer, or seasoned professional, our platform provides personalized tools and insights to help you succeed.

## ✨ Features

### 🎯 **Core Features (Available Now)**

- **🎤 Mock Interviews** - Practice with AI-powered interview simulations across various roles and industries
- **🤖 AI Career Coach** - Get personalized career advice and guidance tailored to your goals
- **📊 Progress Tracking** - Monitor your career development journey with detailed analytics
- **🔐 Secure Authentication** - Safe and secure user accounts with NextAuth.js integration

### 🚀 **Coming Soon**

- **💻 Coding Practice** - Interactive coding challenges and technical interview preparation
- **📄 CV Analyzer** - Upload your resume and get instant AI-powered feedback on formatting, content, and optimization suggestions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui,
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with Prisma Accelerate
- **Authentication**: NextAuth.js

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/career-assistant.git
   cd career-assistant
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables in `.env.local` including:

   - Database URL (PostgreSQL)
   - NextAuth.js secret
   - OAuth provider credentials (Google, GitHub)
   - Supabase credentials
   - VAPI AI API key
   - Email configuration for password reset

4. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

1. **Sign up** for a new account or log in with existing credentials
2. **Upload your CV** to get instant feedback and optimization suggestions
3. **Practice interviews** with our AI-powered mock interview system
4. **Track your progress** and set career goals
5. **Get personalized recommendations** based on your profile and aspirations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:

- Report bugs
- Suggest new features
- Submit pull requests
- Set up the development environment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI capabilities powered by [Google AI](https://ai.google.dev/) and [Groq](https://groq.com/)

---

**Ready to accelerate your career?** [Get started now!](https://careerassistant.com) 🚀
