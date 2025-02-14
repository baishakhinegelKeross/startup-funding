"use client";

import { Draggable } from "react-beautiful-dnd";
import { SlideComponent } from "../types";
import StrictModeDroppable from "./StrictModeDroppable";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import ResizableImage from "./ResizableImage";

interface SlidePreviewProps {
  components: SlideComponent[];
  onEditComponent?: (component: SlideComponent) => void;
}

export default function SlidePreview({ components, onEditComponent }: SlidePreviewProps) {
  const renderComponent = (component: SlideComponent) => {
    const content = (
      <>
        {component.type === "heading" && (
          <h2 className="text-3xl font-bold mb-4">{component.content}</h2>
        )}
        {component.type === "paragraph" && (
          <p className="mb-4">{component.content}</p>
        )}
        {component.type === "image" && (
          <ResizableImage
            src={component.content}
            alt="Slide content"
            initialWidth={400}
            initialHeight={300}
          />
        )}
        {component.type === "youtube" && (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${
                component.content.includes('youtube.com')
                  ? component.content.split('/').pop()
                  : component.content
              }`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        {component.type === "unordered-list" && (
          <ul className="list-disc list-inside mb-4">
            {component.content?.split("\n").map((item, index) => (
              <li key={`${component.id}-item-${index}`}>{item}</li>
            ))}
          </ul>
        )}
        {component.type === "ordered-list" && (
          <ol className="list-decimal list-inside mb-4">
            {component.content?.split("\n").map((item, index) => (
              <li key={`${component.id}-item-${index}`}>{item}</li>
            ))}
          </ol>
        )}
      </>
    );

    return (
      <div className="group relative">
        {content}
        {onEditComponent && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onEditComponent(component)}
            type="button"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
    );
  };

  return (
    <StrictModeDroppable droppableId="slide">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-accent p-8 rounded-lg shadow-lg min-h-[600px]"
        >
          {components.map((component, index) => (
            <Draggable
              key={component.id}
              draggableId={component.id}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`${snapshot.isDragging ? "opacity-50" : ""} mb-4`}
                >
                  {renderComponent(component)}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
}