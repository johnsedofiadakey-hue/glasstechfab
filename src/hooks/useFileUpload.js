import { useState } from 'react';
import { db, uploadFile } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

/**
 * Custom hook for handling file uploads to Firebase Storage and recording metadata in Firestore.
 * 
 * @param {function} notify - Callback function to show notifications (optional).
 * @returns {object} An object containing the uploadMedia function, uploading state, and error state.
 * 
 * @example
 * const { uploadMedia, uploading, error } = useFileUpload(notify);
 * await uploadMedia('projectId', selectedFile, 1);
 */
export const useFileUpload = (notify) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Uploads a file to Firebase Storage and adds a record to the 'media' collection in Firestore.
   * 
   * @param {string} projectId - The ID of the project the media belongs to.
   * @param {File} file - The File object to upload.
   * @param {string|number} stageId - The stage ID associated with the media.
   * @returns {Promise<string|undefined>} Returns the download URL of the uploaded file, or undefined if failed.
   */
  const uploadMedia = async (projectId, file, stageId) => {
    if (!db) return;
    setUploading(true);
    setError(null);
    try {
      if (notify) notify('pending', 'Uploading production media...');
      const fileName = `${Date.now()}_${file.name}`;
      const url = await uploadFile('projects', `${projectId}/${fileName}`, file);
      
      await addDoc(collection(db, 'media'), { 
        url, 
        parentId: projectId,
        stageId: parseInt(stageId), 
        type: file.type.startsWith('image/') ? 'image' : 'video',
        createdAt: new Date().toISOString() 
      });
      
      if (notify) notify('success', 'Media added to phase');
      return url;
    } catch (e) {
      console.error(e);
      setError(e.message);
      if (notify) notify('error', 'Upload failed: ' + e.message);
    } finally {
      setUploading(false);
    }
  };

  return { uploadMedia, uploading, error };
};
