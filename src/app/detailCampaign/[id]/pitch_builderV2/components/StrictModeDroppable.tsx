"use client";

import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export default function StrictModeDroppable({ children, isDropDisabled = false, isCombineEnabled = false, ignoreContainerClipping = false, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  // Ensure `isDropDisabled` is a boolean
  const isDropDisabledValue = typeof isDropDisabled === 'boolean' ? isDropDisabled : false;

  return( 
    <Droppable {...props} isCombineEnabled={isCombineEnabled} ignoreContainerClipping={ignoreContainerClipping} isDropDisabled={isDropDisabledValue}>
      {children}
    </Droppable>
  );
}