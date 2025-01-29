'use client';

import Image from 'next/image';
import { CommentPostProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DollarSign } from 'lucide-react';

const CommentPosts: React.FC<CommentPostProps> = ({
  comment_img,
  investor_name,
  is_lead_investor,
  investment_amount,
  investor_message,
}) => {
  return (
    <Card className="bg-card hover:bg-card/90 transition-all duration-200 border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/10">
            <AvatarImage src={comment_img} alt={`${investor_name}'s avatar`} />
            <AvatarFallback>{investor_name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-primary">
                {investor_name}
              </h2>
              
              {is_lead_investor && (
                <Badge 
                  variant="default"
                  className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                >
                  LEAD INVESTOR
                </Badge>
              )}
              
              <div className="flex items-center text-emerald-500 text-sm font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                {investment_amount}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {investor_message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentPosts;