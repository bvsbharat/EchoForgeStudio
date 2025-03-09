# EchoForgeStudio

EchoForgeStudio is a modern web application for creating and managing voice agents with advanced AI capabilities. The platform allows users to configure AI models, voice settings, and transcription options to create customized voice assistants.

![EchoForgeStudio Dashboard](https://github.com/bvsbharat/EchoForgeStudio/raw/main/public/dashboard-preview.png)

## Features

### Voice Agent Configuration

- **Model Configuration**: Set up AI models with customizable parameters including:

  - First message customization
  - System prompt configuration
  - Model provider selection (OpenAI, Anthropic, Nebius)
  - Temperature and max token settings

- **Voice Settings**: Configure voice characteristics with:

  - Voice provider selection (11labs)
  - Voice model selection
  - Background sound options
  - Minimum character input settings

- **Transcriber Settings**: Configure speech-to-text capabilities

  - Transcriber provider selection (deepgram)

- **Functions**: Add custom functions to your voice agents (coming soon)

- **Advanced Settings**: Fine-tune your voice agent with advanced options (coming soon)

- **Analysis**: Monitor and analyze your voice agent's performance (coming soon)

### User Interface

- Modern, dark-themed UI with gradient accents
- Tabbed interface for easy navigation between configuration sections
- Real-time cost and latency estimates
- Voice agent testing capabilities

## Technology Stack

- **Frontend**: Next.js with TypeScript
- **UI Components**: Custom components built with Tailwind CSS
- **State Management**: React Hooks for local state management

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bvsbharat/EchoForgeStudio.git
cd EchoForgeStudio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
EchoForgeStudio/
├── app/                  # Next.js app directory
│   ├── components/       # Custom application components
│   ├── pages/            # Application pages
│   │   └── dashboard/    # Dashboard page
│   └── ...
├── components/           # Reusable UI components
│   └── ui/               # UI component library
├── public/               # Static assets
└── ...
```

## Key Components

- **Dashboard Page**: Main interface for configuring and managing voice agents
- **ModelDataPopup**: Component for displaying and testing voice agent configurations
- **UI Components**: Reusable components like buttons, cards, inputs, etc.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
