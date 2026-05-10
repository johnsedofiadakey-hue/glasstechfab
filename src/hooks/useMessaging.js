import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sanitizeText } from '../lib/sanitize';

/**
 * Custom hook for sending messages via Firestore.
 * 
 * @returns {object} An object containing the sendMessage function.
 * 
 * @example
 * const { sendMessage } = useMessaging();
 * await sendMessage('Hello!', 'senderId', 'receiverId');
 */
export const useMessaging = () => {
  /**
   * Sends a message by adding a document to the 'messages' collection in Firestore.
   * Sanitizes the message text before saving.
   * 
   * @param {string} text - The message text to send.
   * @param {string} senderId - The ID of the sender.
   * @param {string} receiverId - The ID of the receiver.
   * @param {string} [type='chat'] - The type of message (optional, defaults to 'chat').
   * @returns {Promise<void>}
   */
  const sendMessage = async (text, senderId, receiverId, type='chat') => {
    if (!db) return;
    await addDoc(collection(db, 'messages'), { 
      text: sanitizeText(text), 
      senderId, 
      receiverId, 
      type, 
      createdAt: serverTimestamp() 
    });
  };

  return { sendMessage };
};
