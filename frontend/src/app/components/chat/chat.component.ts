import { Component } from '@angular/core';
import { FitnessService } from '../../services/fitness.service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  currentMessage: string = '';
  loading: boolean = false;

  constructor(private fitnessService: FitnessService) {
    // Welcome message
    this.messages.push({
      role: 'assistant',
      content: 'Hello! I\'m FitBot, your AI fitness coach. I\'m here to help you with workout advice, form tips, nutrition guidance, and motivation. What can I help you with today?',
      timestamp: new Date()
    });
  }

  sendMessage(): void {
    if (!this.currentMessage.trim() || this.loading) {
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: this.currentMessage,
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const messageToSend = this.currentMessage;
    this.currentMessage = '';
    this.loading = true;

    // Prepare conversation history for API
    const conversationHistory = this.messages
      .filter(m => m.role !== 'assistant' || m.content !== this.messages[0].content) // Exclude welcome message
      .map(m => ({ role: m.role, content: m.content }));

    this.fitnessService.chat({
      message: messageToSend,
      conversationHistory: conversationHistory.slice(0, -1), // Exclude the message we just added
      userContext: {}
    }).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.messages.push({
            role: 'assistant',
            content: response.reply,
            timestamp: new Date()
          });
        }
        this.scrollToBottom();
      },
      error: (err) => {
        this.loading = false;
        this.messages.push({
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting right now. Please check your API configuration.',
          timestamp: new Date()
        });
        console.error('Error:', err);
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
