# TDD Demo - Interactive Workshop Presentation

An interactive, educational slideshow presentation covering Test-Driven Development (TDD) concepts, best practices, and live coding demonstrations. Built with React, TypeScript, and modern web technologies.

## 🎯 What's Inside

This presentation provides a comprehensive introduction to TDD, including:

- **History of TDD** - Origins and evolution of the methodology
- **Core TDD Concepts** - Red-Green-Refactor cycle explained
- **Common Misconceptions** - What TDD is NOT
- **Research-Backed Benefits** - Evidence-based advantages
- **Honest Discussion** - Challenges and disadvantages
- **TDD vs BDD** - Comparison of methodologies
- **Best Practices** - Practical guidance for .NET development
- **Live Coding Demo** - Step-by-step FizzBuzz implementation using TDD

## 🚀 Features

- **Interactive Navigation** - Use keyboard shortcuts (arrow keys, space, home) or click navigation
- **Progressive Disclosure** - Step-through complex concepts at your own pace
- **Live Code Examples** - Real C# code with NUnit testing framework
- **Animated Demonstrations** - Visual representation of TDD cycles
- **Responsive Design** - Works on desktop and mobile devices
- **Professional Styling** - Clean, modern presentation design

## 🛠️ Tech Stack

- **React** - Modern UI framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## 📦 Installation and Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** - Version 16.0 or higher ([Download here](https://nodejs.org/))
- **npm** - Comes with Node.js (or **yarn** if you prefer)
- **Git** - For cloning the repository ([Download here](https://git-scm.com/))

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/happyywang/tdd-demo.git
cd tdd-demo
```

#### 2. Install Dependencies
Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

#### 3. Start Development Server
Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

#### 4. Open in Browser
- Open your web browser
- Navigate to `http://localhost:5173`
- The presentation should load automatically

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the app for production to `dist` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory, ready for deployment to any static hosting service.

### Deployment Options

After building, you can deploy to:
- **GitHub Pages** - Free hosting for GitHub repositories
- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your GitHub repository
- **Any static hosting service**

### Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build failing?**
```bash
# Check for TypeScript errors
npm run build 2>&1 | grep error
```

## 📋 Presentation Structure

1. **Title & Agenda** - Workshop overview
2. **History** - Kent Beck and TDD origins
3. **What is TDD** - Core concepts and methodology
4. **What is NOT TDD** - Common misconceptions
5. **Why TDD** - Benefits and research data
6. **Disadvantages** - Honest discussion of challenges
7. **TDD vs BDD** - Methodology comparison
8. **Best Practices** - Practical .NET guidance
9. **Live Demo** - FizzBuzz implementation walkthrough

## 🎓 Educational Value

This presentation is designed for:
- Software developers new to TDD
- Teams considering TDD adoption
- Workshop facilitators and trainers
- Educational institutions teaching software engineering
- Code review and best practices discussions

## 🔧 Customization

The presentation structure is modular and can be easily customized:
- Edit content in `src/constants.ts`
- Modify slide components in `src/components/slides/`
- Adjust styling via Tailwind classes
- Add new slides by extending the slides array

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs
- Suggest improvements
- Add new content or examples
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Yan Wang** - [happyywang](https://github.com/happyywang)

## 🙏 Acknowledgments

- Kent Beck for pioneering TDD
- The software development community for continuous learning and sharing
- All contributors to open-source testing frameworks

---

*Built with ❤️ for the developer community*