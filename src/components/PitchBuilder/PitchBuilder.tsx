"use client";

import './page.module.css';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import ComponentList from "@/app/detailCampaign/[id]/pitch_builderV2/components/ComponentList";
import SlidePreview from "@/app/detailCampaign/[id]/pitch_builderV2/components/SlidePreview";
import EditDialog from "@/app/detailCampaign/[id]/pitch_builderV2/components/EditDialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ComponentItem, SlideComponent } from "@/app/detailCampaign/[id]/pitch_builderV2/types";
import { nanoid } from "nanoid";

const PitchBuilder = () => {
  const [components, setComponents] = useState<SlideComponent[]>([]);
  const [editingComponent, setEditingComponent] = useState<ComponentItem | null>(
    null
  );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Handle dropping into trash
    if (destination.droppableId === "trash") {
      if (source.droppableId === "slide") {
        const newComponents = components.filter((_, index) => index !== source.index);
        setComponents(newComponents);
      }
      return;
    }

    // Reordering within the slide
    if (source.droppableId === "slide" && destination.droppableId === "slide") {
      const newComponents = Array.from(components);
      const [removed] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, removed);
      setComponents(newComponents);
      return;
    }

    // Adding new component from component list to slide
    if (source.droppableId === "component-list" && destination.droppableId === "slide") {
      const sourceComponent = components.find(c => c.id === draggableId);
      const newComponent: ComponentItem = {
        id: `${draggableId}-${nanoid()}`,
        type: sourceComponent ? sourceComponent.type : draggableId as ComponentItem["type"],
        content: "",
      };
      setEditingComponent(newComponent);
    }
  };

  const handleSaveComponent = (content: string) => {
    if (!editingComponent) return;

    const newComponent: SlideComponent = {
      ...editingComponent,
      content,
      position: components.length,
    };

    setComponents([...components, newComponent]);
    setEditingComponent(null);
  };

  const exportToHtml = () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Pitch Deck</title>
        </head>
        <body>
          <div class="max-w-4xl mx-auto p-8">
            ${components
              .map((component) => {
                switch (component.type) {
                  case "heading":
                    return `<h2 class="text-3xl font-bold mb-4">${component.content}</h2>`;
                  case "paragraph":
                    return `<p class="mb-4">${component.content}</p>`;
                  case "image":
                    return `<img src="${component.content}" alt="Slide content" class="max-w-full h-auto mb-4 rounded-lg">`;
                  case "youtube":
                    return `
                      <div class="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                          src="${component.content}"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          class="rounded-lg"
                        ></iframe>
                      </div>
                    `;
                  case "unordered-list":
                    return `
                      <ul class="list-disc list-inside mb-4">
                        ${component.content
                          ?.split("\n")
                          .map((item: string) => `<li>${item}</li>`)
                          .join("")}
                      </ul>
                    `;
                  case "ordered-list":
                    return `
                      <ol class="list-decimal list-inside mb-4">
                        ${component.content
                          ?.split("\n")
                          .map((item: string) => `<li>${item}</li>`)
                          .join("")}
                      </ol>
                    `;
                  default:
                    return "";
                }
              })
              .join("\n")}
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pitch-deck.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="pitchDeck" className='mt-20'>

    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Pitch Deck Builder</h1>
            <Button onClick={exportToHtml}>
              <Download className="w-4 h-4 mr-2" />
              Export as HTML
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <ComponentList />
            </div>
            <div className="col-span-3">
              <SlidePreview components={components} />
            </div>
          </div>
        </div>
        <EditDialog
          component={editingComponent}
          isOpen={!!editingComponent}
          onClose={() => setEditingComponent(null)}
          onSave={handleSaveComponent}
        />
      </div>
    </DragDropContext>

    </div>
  );
};

export default PitchBuilder;
