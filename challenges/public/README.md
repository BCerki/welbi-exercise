# Welbi Technical Challenges

Welcome to the Welbi technical assessment! This collection of challenges is designed to evaluate your skills in building production-ready features for our wellness platform.

## 🎯 About These Challenges

These challenges are built specifically for our Rush monorepo and wellness platform domain. They're designed to:

- **Mirror real work**: Represent actual features you'd build at Welbi
- **Test practical skills**: Focus on production-ready code, not algorithmic puzzles
- **Respect your time**: Provide clear scope and realistic time estimates
- **Match our stack**: Use our exact technology choices and patterns

## 🏗️ Technology Stack

Our challenges use the same stack as our production application:

- **Frontend**: React 18 + TanStack Router + Material UI + Vite
- **Backend**: GraphQL (Pothos) + Apollo Server + Node.js
- **Database**: Drizzle ORM + SQLite (dev) / PostgreSQL (prod)
- **Monorepo**: Rush monorepo with shared libraries
- **Permissions**: CASL for authorization
- **Package Manager**: Bun (preferred) or npm

## 📋 Challenge Categories

### **Core Full-Stack Challenges (1-5)**
Perfect for full-stack developers looking to demonstrate comprehensive skills:

1. **Event Registration System** - Complete feature development
2. **Advanced Search & Filtering** - Complex data handling
3. **Real-time Notifications** - System architecture
4. **Security Audit & Authorization** - Security focus
5. **Performance Optimization** - Technical depth

### **Infrastructure & DevOps Challenges (6-9)**
Great for engineers with platform/infrastructure interests:

6. **DevOps & CI/CD Pipeline** - Development automation
7. **Authentication System** - Security implementation
8. **Developer Experience Optimization** - Tooling and DX
9. **Testing Infrastructure** - Quality assurance

### **Library Extension Challenges (10-12)**
Build upon our existing library ecosystem:

10. **Internationalization System** - Extend `@testwelbi/locales`
11. **Advanced Permission System** - Extend `@testwelbi/permissions`

## 🧭 Scope & Boundaries

- Each challenge is self-contained. Do not fix issues that belong to other challenges; those are intentionally left for their respective tasks.
- A development authentication stub is present (dev auth widget and `x-dev-user-id` header). Use it for all challenges except Challenge 07, which replaces it with real authentication.
- Broad performance optimization belongs to Challenge 05; avoid general performance work in other challenges beyond what’s necessary for the feature.
- Micro-challenges are optional and can be attempted if you have extra time; there is no expectation to do them.
12. **Analytics & Tracking** - Extend `@testwelbi/tracking`

### **Micro-Challenges (Bonus)**
Quick skill assessments (15-45 minutes each):

- **Bug Hunt**: Timezone display issues
- **Code Review**: Event registration component
- **API Integration**: Google Calendar sync

## 🚀 Getting Started

### 1. Environment Setup

```bash
# Clone the repository (you'll receive access)
git clone <repository-url>
cd testwelbi2

# Install dependencies (using bun preferred)
bun install

# Start development servers
bun run dev
```

### 2. Explore the Codebase

Take 15-30 minutes to familiarize yourself with:

- **Apps**: `/apps/frontend` and `/apps/graphql`
- **Libraries**: `/libs/ui`, `/libs/permissions`, `/libs/time`, etc.
- **Database**: Check existing schema in `/libs/drizzle`
- **Documentation**: Project README and library docs

### 3. Choose Your Challenge(s)

Select based on:
- **Your role interest**: Full-stack, DevOps, Platform Engineering
- **Time available**: Challenges range from 1-4 hours
- **Skill areas**: What you want to demonstrate

## 💡 Tips for Success

### **Code Quality**
- Follow existing patterns and conventions
- Use TypeScript throughout
- Implement proper error handling
- Consider edge cases

### **User Experience**
- Add loading states and error messages
- Implement proper form validation
- Consider accessibility requirements
- Make it responsive

### **Production Readiness**
- Add appropriate tests (when possible)
- Consider performance implications
- Implement proper security measures
- Document your decisions

### **Communication**
- Comment complex logic
- Explain your approach in deliverables
- Note any assumptions or trade-offs
- Suggest future improvements

## 📝 Submission Guidelines

### **What to Submit**

1. **Working Code**: All implementation completed
2. **Brief Documentation**: 
   - Your approach and decisions
   - Any trade-offs or limitations
   - Areas for future improvement
3. **Demo-Ready**: Ensure everything runs with `bun run dev`

### **How to Submit**

1. **Create a branch**: `git checkout -b challenge-<your-name>`
2. **Commit your work**: Use clear, descriptive commit messages
3. **Push your branch**: `git push origin challenge-<your-name>`
4. **Notify us**: Send an email with your branch name

### **Time Management**

- **Stick to estimates**: Don't exceed the suggested time significantly
- **Focus on core requirements**: Get the basics working first
- **Document incomplete areas**: If you run out of time, explain what's missing

## 🤝 Getting Help

### **Technical Issues**
- Check existing code for patterns
- Review library documentation in `/libs/*/README.md`
- Look at similar implementations in the codebase

### **Clarification Questions**
- Email us if requirements are unclear
- Ask about scope if you're unsure
- Confirm your approach if it seems unusual

### **Environment Problems**
- Ensure you're using Node.js 18+
- Try `bun install --force` if dependencies fail
- Check that all required ports are available

## 🎉 What Happens Next

1. **Initial Review**: We'll review your code within 2-3 business days
2. **Technical Discussion**: Schedule a follow-up call to discuss your approach
3. **Q&A Session**: Deep dive into your decisions and alternative approaches
4. **Next Steps**: Information about the rest of our process

## 📞 Contact

If you have any questions or run into issues:

- **Email**: [technical-challenges@welbi.com](mailto:technical-challenges@welbi.com)
- **Response Time**: Within 24 hours on business days
- **Urgency**: Mark urgent issues clearly in subject line

---

**Good luck, and we're excited to see what you build!** 🚀

These challenges represent the kind of work you'd do at Welbi - building features that help wellness communities thrive. We're looking forward to seeing your approach and discussing your solutions. 