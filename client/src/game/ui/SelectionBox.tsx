// ===== SELECTION BOX OVERLAY =====

interface SelectionBoxProps {
  selectionBox: { start: { x: number; y: number }; end: { x: number; y: number } } | null;
}

export function SelectionBox({ selectionBox }: SelectionBoxProps) {
  if (!selectionBox) return null;

  const style = {
    position: 'absolute' as const,
    left: Math.min(selectionBox.start.x, selectionBox.end.x),
    top: Math.min(selectionBox.start.y, selectionBox.end.y),
    width: Math.abs(selectionBox.end.x - selectionBox.start.x),
    height: Math.abs(selectionBox.end.y - selectionBox.start.y),
    border: '1px solid #00ff00',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    pointerEvents: 'none' as const,
    zIndex: 1000
  };

  return <div style={style} />;
}
