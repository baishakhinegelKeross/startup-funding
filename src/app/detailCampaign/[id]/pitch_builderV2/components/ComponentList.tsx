"use client";

import { Image, ListOrdered, ListVideo, Text, Trash2, Type } from "lucide-react";
import { Draggable } from "react-beautiful-dnd";
import { ComponentItem } from "../types";
import StrictModeDroppable from "./StrictModeDroppable";

const components: ComponentItem[] = [
  { id: "heading", type: "heading", content: "Heading" },
  { id: "paragraph", type: "paragraph", content: "Paragraph" },
  { id: "image", type: "image", content: "Image" },
  { id: "youtube", type: "youtube", content: "YouTube Video" },
  { id: "unordered-list", type: "unordered-list", content: "Unordered List" },
  { id: "ordered-list", type: "ordered-list", content: "Ordered List" },
];

const getIcon = (type: string) => {
  switch (type) {
    case "heading":
      return <Type className="w-6 h-6" />;
    case "paragraph":
      return <Text className="w-6 h-6" />;
    case "image":
      // eslint-disable-next-line jsx-a11y/alt-text
      return <Image className="w-6 h-6" />;
    case "youtube":
      return <ListVideo className="w-6 h-6" />;
    case "unordered-list":
    case "ordered-list":
      return <ListOrdered className="w-6 h-6" />;
    default:
      return null;
  }
};

export default function ComponentList() {
  return (
    <div className="space-y-4 component-list">
      <div className="p-4 bg-accent rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Component</h2>
        <StrictModeDroppable droppableId="component-list" isDropDisabled>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2"
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
                      className={`flex items-center gap-2 p-3 bg-primary rounded-md cursor-move  transition-colors ${
                        snapshot.isDragging ? "shadow-lg" : ""
                      }`}
                    >
                      {getIcon(component.type)}
                      <span>{component.content}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </div>
      
      <StrictModeDroppable droppableId="trash">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4  rounded-lg shadow-lg border-2 border-dashed border-red-300 hover:border-red-500 transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-red-500">
              <Trash2 className="w-6 h-6" />
              <span className="font-medium">Drop here to delete</span>
            </div>
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </div>
  );
}