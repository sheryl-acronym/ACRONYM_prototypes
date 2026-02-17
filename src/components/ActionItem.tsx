import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ContactPill } from '@/components/ContactPill';
import { Copy, Trash2 } from 'lucide-react';

interface ActionItemProps {
  text: string;
  assignee: string;
  completed: boolean;
  onCompletedChange?: (completed: boolean) => void;
  onCopy?: () => void;
  onDelete?: () => void;
  isDragging?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  isDraggable?: boolean;
}

export const ActionItem: React.FC<ActionItemProps> = ({
  text,
  assignee,
  completed,
  onCompletedChange,
  onCopy,
  onDelete,
  isDragging,
  onDragStart,
  onDragOver,
  onDrop,
  isDraggable = false,
}) => {
  return (
    <div
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`group/action-item flex items-start gap-3 p-3 rounded-lg transition-colors ${
        isDragging
          ? 'bg-gray-100 opacity-50 cursor-move'
          : isDraggable
            ? 'hover:bg-gray-50 hover:cursor-move'
            : 'hover:bg-gray-50'
      }`}
    >
      <Checkbox
        checked={completed}
        onCheckedChange={onCompletedChange}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className={`text-sm ${completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {text}
          </span>
        </div>
        {assignee && (
          <div className="mt-1">
            <ContactPill name={assignee} />
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover/action-item:opacity-100 transition-opacity">
        {onCopy && (
          <button
            onClick={onCopy}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            title="Copy"
          >
            <Copy className="h-4 w-4 text-gray-500" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};
