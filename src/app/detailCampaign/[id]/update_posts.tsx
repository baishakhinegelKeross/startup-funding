'use client';

import Image from 'next/image';
import { UpdatePostsProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays } from 'lucide-react';

const UpdatePosts: React.FC<UpdatePostsProps> = ({
  postTitle,
  postImg,
  postedBy,
  postTags,
}) => {
  return (
    <Card className="bg-card hover:bg-card/90 transition-colors duration-200 overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={postImg.src}
            alt={postImg.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary hover:text-primary/90 transition-colors">
            {postTitle}
          </h2>

          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={postedBy.src} alt={postedBy.alt} />
              <AvatarFallback>{postedBy.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <a 
                  href="#" 
                  className="font-semibold text-primary hover:text-primary/90 transition-colors"
                >
                  {postedBy.name}
                </a>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center text-muted-foreground text-sm">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {postedBy.date}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {postedBy.role}
              </div>
            </div>
          </div>

          {postTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {postTags.map((tag: { id: number; text: string }) => (
                <Badge 
                  key={tag.id}
                  variant="secondary"
                  className="hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  {tag.text}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdatePosts;