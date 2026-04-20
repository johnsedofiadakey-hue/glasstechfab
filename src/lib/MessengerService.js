/**
 * Unified Messenger Service Hub
 * Acts as a bridge between the application and various messaging providers.
 */
import { TwilioService } from './TwilioService';
import { MetaWhatsAppService } from './MetaWhatsAppService';
import { ArkeselService } from './ArkeselService';

const PROVIDER = import.meta.env.VITE_WHATSAPP_PROVIDER || 'mock'; // Defaults to mock for safety

export const MessengerService = {
  /**
   * Routes the OTP request to the active provider.
   */
  sendOTP: async (phone, code) => {
    console.log(`[MessengerService] Routing via provider: ${PROVIDER}`);

    switch (PROVIDER.toLowerCase()) {
      case 'twilio':
        return await TwilioService.sendWhatsAppOTP(phone, code);
      
      case 'meta':
        return await MetaWhatsAppService.sendWhatsAppOTP(phone, code);

      case 'arkesel':
        return await ArkeselService.sendOTP(phone, code);
      
      case 'mock':
        // Simulation for local development
        return await new Promise((resolve) => {
          setTimeout(() => {
            console.log("------------------------------------------");
            console.log(`[MOCK WHATSAPP LOG] To: ${phone}`);
            console.log(`[MOCK WHATSAPP LOG] Message: Your Glasstech Fab code is ${code}`);
            console.log("------------------------------------------");
            resolve({ success: true, sid: 'mock_sid_123' });
          }, 1000);
        });

      default:
        throw new Error(`Unsupported messaging provider: ${PROVIDER}`);
    }
  },

  /**
   * Sends a progress update to the client.
   */
  sendProgressUpdate: async (phone, name, project, stage) => {
    console.log(`[MessengerService] Routing update via provider: ${PROVIDER}`);
    const message = `High-End Update: Hello ${name}, your project "${project}" has moved to the ${stage} phase at Glasstech Fab.`;

    switch (PROVIDER.toLowerCase()) {
      case 'meta':
        // In a real Meta integration, you would use a template for this.
        // For now, we'll route it through the Meta service's messaging method if it exists.
        return await MetaWhatsAppService.sendMessage(phone, message);
      
      case 'arkesel':
        return await ArkeselService.sendMessage(phone, message, 'whatsapp');

      case 'mock':
        return await new Promise((resolve) => {
          setTimeout(() => {
            console.log("------------------------------------------");
            console.log(`[MOCK WHATSAPP UPDATE] To: ${phone}`);
            console.log(`[MOCK WHATSAPP UPDATE] Message: ${message}`);
            console.log("------------------------------------------");
            resolve({ success: true, sid: 'mock_update_123' });
          }, 800);
        });

      default:
        console.warn(`Messaging provider ${PROVIDER} does not support progress updates yet.`);
        return { success: false, error: 'Provider not supported' };
    }
  }
};
