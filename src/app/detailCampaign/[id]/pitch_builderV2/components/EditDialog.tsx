'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ComponentItem } from '../types';
import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface EditDialogProps {
  component: ComponentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
}

export default function EditDialog({
  component,
  isOpen,
  onClose,
  onSave,
}: EditDialogProps) {
  const [content, setContent] = useState(component?.content || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onSave(content);
    setContent('');
    onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setContent(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!component) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {component.type}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {component.type === 'image' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter image URL..."
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
              {content && (
                <div className="relative aspect-video">
                  <img
                    src={content}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-contain rounded-md"
                  />
                </div>
              )}
            </div>
          ) : component.type === 'paragraph' ||
            component.type === 'unordered-list' ||
            component.type === 'ordered-list' ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Enter ${component.type} content...`}
              rows={5}
            />
          ) : (
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Enter ${component.type} content...`}
            />
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
