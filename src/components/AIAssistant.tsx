import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Sparkles } from 'lucide-react';
import { TaxComplianceChat } from './TaxComplianceChat';

interface AIAssistantProps {
  onSuggest: (field: string, value: string) => void;
  currentSection: string;
}

export function AIAssistant({ onSuggest, currentSection }: AIAssistantProps) {
  const [showChat, setShowChat] = useState(false);

  const getSuggestions = () => {
    // In a real app, this would call an AI API
    // For demo, we'll use mock suggestions
    const suggestions = {
      identification: {
        nationality: "United States",
        state: "California",
        city: "San Francisco",
      },
      accreditation: {
        annualIncome: "250000",
        netWorth: "2000000",
      },
      aml: {
        // AML suggestions would be based on user profile
      },
      securities: {
        // Securities suggestions based on investment profile
      },
      tax: {
        // Tax suggestions based on residency
      }
    };

    const currentSuggestions = suggestions[currentSection as keyof typeof suggestions];
    if (currentSuggestions) {
      Object.entries(currentSuggestions).forEach(([field, value]) => {
        onSuggest(field, value.toString());
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Assistant</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Need help? I can assist you in filling out this form accurately and efficiently.
            </p>
            <div className="space-y-2">
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={getSuggestions}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Suggest Information
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowChat(!showChat)}
              >
                <Bot className="mr-2 h-4 w-4" />
                {showChat ? 'Hide Chat Assistant' : 'Open Chat Assistant'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showChat && <TaxComplianceChat />}
    </div>
  );
}