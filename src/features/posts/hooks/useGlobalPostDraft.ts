import { useState, useEffect } from 'react';
import { storage } from '../../../utils/storage';

const KEYS = {
  title: 'draft_title',
  content: 'draft_content',
  communityId: 'draft_community_id',
} as const;

export const useGlobalPostDraft = () => {
  const [title, setTitle] = useState(storage.getString(KEYS.title) ?? '');
  const [content, setContent] = useState(storage.getString(KEYS.content) ?? '');
  const [selectedCommunityId, setSelectedCommunityId] = useState(
    storage.getString(KEYS.communityId) ?? ''
  );

  useEffect(() => {
    storage.set(KEYS.title, title);
    storage.set(KEYS.content, content);
    storage.set(KEYS.communityId, selectedCommunityId);
  }, [title, content, selectedCommunityId]);

  const clearDraft = () => {
    setTitle('');
    setContent('');
    setSelectedCommunityId('');
    storage.remove(KEYS.title);
    storage.remove(KEYS.content);
    storage.remove(KEYS.communityId);
  };

  return { title, setTitle, content, setContent, selectedCommunityId, setSelectedCommunityId, clearDraft };
};
