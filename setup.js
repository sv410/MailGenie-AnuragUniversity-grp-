#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MailGenie AI Setup\n');

const envPath = path.join(process.cwd(), '.env.local');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  try {
    console.log('This script will help you configure your environment variables.\n');
    
    // Check if .env.local already exists
    if (fs.existsSync(envPath)) {
      const overwrite = await question('.env.local already exists. Do you want to overwrite it? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('Setup cancelled.');
        rl.close();
        return;
      }
    }

    console.log('\n📝 Configuration Steps:\n');
    
    // OpenAI API Key
    console.log('1. Get your OpenAI API key:');
    console.log('   - Go to https://platform.openai.com/api-keys');
    console.log('   - Sign in or create an account');
    console.log('   - Click "Create new secret key"');
    console.log('   - Copy the key (starts with "sk-")\n');
    
    const openaiKey = await question('Enter your OpenAI API key (or press Enter to skip): ');
    
    // JWT Secret
    console.log('\n2. JWT Secret (for authentication):');
    console.log('   - This can be any random string for development');
    console.log('   - For production, use a strong random string\n');
    
    const jwtSecret = await question('Enter JWT secret (or press Enter for default): ') || 'your_jwt_secret_here_change_this_in_production';
    
    // Build environment content
    let envContent = '# MailGenie AI Environment Configuration\n\n';
    
    if (openaiKey.trim()) {
      envContent += `# OpenAI API Configuration\n`;
      envContent += `OPENAI_API_KEY=${openaiKey.trim()}\n\n`;
    } else {
      envContent += `# OpenAI API Configuration (not set)\n`;
      envContent += `OPENAI_API_KEY=your_openai_api_key_here\n\n`;
    }
    
    envContent += `# JWT Secret (for authentication)\n`;
    envContent += `JWT_SECRET=${jwtSecret}\n\n`;
    envContent += `# Environment\n`;
    envContent += `NODE_ENV=development\n`;
    
    // Write to file
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ Configuration saved to .env.local\n');
    
    if (openaiKey.trim()) {
      console.log('🎉 Setup complete! Your OpenAI API key is configured.');
      console.log('   You can now generate AI-powered email replies.');
    } else {
      console.log('⚠️  Setup complete, but OpenAI API key is not configured.');
      console.log('   You can still use the app with template responses.');
      console.log('   To enable AI features, edit .env.local and add your API key.');
    }
    
    console.log('\n📋 Next steps:');
    console.log('   1. Restart your development server: npm run dev');
    console.log('   2. Test the configuration at: http://localhost:3000');
    console.log('   3. Try generating an email reply');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

setup();
