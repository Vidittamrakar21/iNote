import { createContext, useContext, useState } from "react";
import { COLORS } from "../constants/colors";

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
};

const NotesContext = createContext<any>(null);

export const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [colorIndex, setColorIndex] = useState(0);

  const addNote = () => {
    const pastelColors = COLORS.pastels;
    const selectedColor = pastelColors[colorIndex];

    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      color: selectedColor,
    };

    setNotes((prev) => [newNote, ...prev]);

    // Move to next color, loop if needed
    setColorIndex((prev) => (prev + 1) % pastelColors.length);

    return newNote.id;
  };

  const updateNote = (id: string, data: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...data } : n))
    );
  };

  const removeNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, removeNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
