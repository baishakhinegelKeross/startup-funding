import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Startup } from '../types';

interface CampaignState {
  drafts: Startup[];
  proposed: Startup[];
  currentDraft: Partial<Startup> | null;
  saveDraft: (draft: Partial<Startup>) => void;
  submitCampaign: (campaign: Startup) => void;
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      drafts: [],
      proposed: [],
      currentDraft: null,
      saveDraft: (draft) =>
        set((state) => {
          const draftId = draft.id || crypto.randomUUID();
          const existingDraftIndex = state.drafts.findIndex((d) => d.id === draftId);
          const newDraft = { ...draft, id: draftId };

          if (existingDraftIndex >= 0) {
            const updatedDrafts = [...state.drafts];
            updatedDrafts[existingDraftIndex] = newDraft as Startup;
            return { drafts: updatedDrafts, currentDraft: newDraft };
          }

          return {
            drafts: [...state.drafts, newDraft as Startup],
            currentDraft: newDraft,
          };
        }),
      submitCampaign: (campaign) =>
        set((state) => ({
          proposed: [...state.proposed, campaign],
          drafts: state.drafts.filter((d) => d.id !== campaign.id),
          currentDraft: null,
        })),
      loadDraft: (id) =>
        set((state) => ({
          currentDraft: state.drafts.find((d) => d.id === id) || null,
        })),
      deleteDraft: (id) =>
        set((state) => ({
          drafts: state.drafts.filter((d) => d.id !== id),
          currentDraft: state.currentDraft?.id === id ? null : state.currentDraft,
        })),
    }),
    {
      name: 'campaign-storage',
    }
  )
);