import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../services/api";

// Create a context
const NotesContext = createContext({});

const NotesProvider = ({ children }) => {
  const [notes, setNotesData] = useState([]);
  const setNotes = (res) => {
    setNotesData(res);
  };
  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesProvider };
