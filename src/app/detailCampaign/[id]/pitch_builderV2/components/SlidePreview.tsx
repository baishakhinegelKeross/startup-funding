"use client";

import Image from "next/image";
import { Draggable } from "react-beautiful-dnd";
import { SlideComponent } from "../types";
import StrictModeDroppable from "./StrictModeDroppable";

interface SlidePreviewProps {
  components: SlideComponent[];
}

export default function SlidePreview({ components }: SlidePreviewProps) {
  const renderComponent = (component: SlideComponent) => {
    switch (component.type) {
      case "heading":
        return <h2 className="text-3xl font-bold mb-4">{component.content}</h2>;
      case "paragraph":
        return <p className="mb-4">{component.content}</p>;
      case "image":
        return (
          <Image
            src={component.content}
            alt="Slide content"
            className="max-w-full mb-4 rounded-lg"
            layout="responsive"
            width={16}
            height={9}
          />
        );
      case "youtube":
        // Extract video ID from URL if full URL is provided
        const videoId = component.content.includes('youtube.com') 
          ? component.content.split('/').pop() 
          : component.content;
        
        return (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case "unordered-list":
        return (
          <ul className="list-disc list-inside mb-4">
            {component.content?.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case "ordered-list":
        return (
          <ol className="list-decimal list-inside mb-4">
            {component.content?.split("\n").map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        );
      default:
        return null;
    }
  };

  return (
    <StrictModeDroppable droppableId="slide">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-white p-8 rounded-lg shadow-lg min-h-[600px]"
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