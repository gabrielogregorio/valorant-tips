import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '../Button';

interface EditableTagProps {
  id: string;
  label: string;
  value: string;
  onUpdate: (id: string, value: string) => void;
  onDelete?: (id: string) => void;
  onToggleVisibility?: (id: string, visible: boolean) => void;
  isVisible?: boolean;
  canDelete?: boolean;
  canHide?: boolean;
}

export const EditableTag = ({
  id,
  label,
  value,
  onUpdate,
  onDelete,
  onToggleVisibility,
  isVisible = true,
  canDelete = false,
  canHide = true,
}: EditableTagProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onUpdate(id, editValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
          autoFocus
        />
      ) : (
        <span className="flex-1 text-sm">
          {label}: {value}
        </span>
      )}

      <div className="flex gap-1">
        {isEditing ? (
          <Button className="text-sm" size="small" variant="primary" onClick={handleSave}>
            ✓
          </Button>
        ) : (
          <Button size="small" variant="secondary" onClick={() => setIsEditing(true)}>
            ✏️
          </Button>
        )}

        {canHide && onToggleVisibility && (
          <Button size="small" variant="secondary" onClick={() => onToggleVisibility(id, !isVisible)}>
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
        )}

        {canDelete && onDelete && (
          <Button size="small" variant="secondary" onClick={() => onDelete(id)}>
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};
