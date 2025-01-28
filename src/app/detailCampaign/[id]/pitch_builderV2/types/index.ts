export interface ComponentItem {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'youtube' | 'unordered-list' | 'ordered-list';
  content: string;
}

export interface SlideComponent extends ComponentItem {
  position: number;
}