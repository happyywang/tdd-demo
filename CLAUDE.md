# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TDD (Test-Driven Development) workshop presentation built as a single React component. The project contains an interactive educational slideshow covering TDD concepts, best practices, and live coding demonstrations.

## Architecture

The project consists of a single main component (`tdd-demo.tsx`) that implements:

- **Slide-based presentation system** with keyboard navigation
- **Interactive educational content** including step-by-step TDD cycles
- **Multiple view modes** for different content sections (daily benefits, research data, challenges, etc.)
- **Live coding demonstration** of FizzBuzz implementation using TDD methodology
- **State management** using React hooks for navigation and UI interactions

## Key Components

### Main Structure
- `TDDPresentation` - Root component managing slide navigation and rendering
- Individual slide components for each section (TitleSlide, AgendaSlide, WhatIsTDDSlide, etc.)
- Progressive disclosure pattern with interactive toggles and step-through interfaces

### Content Sections
- History of TDD
- Core TDD concepts (Red-Green-Refactor cycle)
- Common misconceptions and what TDD is NOT
- Benefits backed by research data
- Honest discussion of TDD challenges and disadvantages
- TDD vs BDD comparison
- Best practices for .NET development
- Live FizzBuzz coding demonstration

## Development Notes

### Navigation System
- Keyboard shortcuts: Arrow keys, Space, Home
- Slide dots and navigation buttons
- Progress bar showing presentation progress
- Direct slide jumping via agenda items

### Interactive Features
- Step-by-step TDD cycle demonstration with code examples
- Toggle between different view modes within slides
- Animated transitions and hover effects
- Responsive design with Tailwind CSS

### Code Examples
The presentation includes comprehensive C# code examples demonstrating:
- NUnit testing framework usage
- Arrange-Act-Assert pattern
- TDD Red-Green-Refactor cycle
- Best practices for test naming and structure

## File Structure
```
/
├── tdd-demo.tsx          # Complete presentation component
└── CLAUDE.md             # This file
```

This is a standalone React component designed for educational purposes. No build system, package.json, or external dependencies are visible in the current structure - the component appears to be designed to run within an existing React application environment.

## Presentation Language

**Important: This demo presentation is delivered in English.** All content, slides, code examples, and user interface elements are in English for international accessibility and technical accuracy.