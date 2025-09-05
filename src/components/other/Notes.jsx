import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/Notes.scss";

export default function Notes() {
  const { t, i18n } = useTranslation();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // форматирование даты с учетом локали
  const formatDate = (date = new Date()) => {
    const lang = i18n.language || "en";
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    if (lang.startsWith("es")) {
      return date.toLocaleDateString("es-ES", dateOptions);
    } else if (lang.startsWith("uk") || lang.startsWith("ua")) {
      return date.toLocaleDateString("uk-UA", dateOptions);
    } else {
      return date.toLocaleDateString("en-US", dateOptions);
    }
  };

  // загрузка заметок
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // сохранение заметок
  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const addNote = (e) => {
    e.preventDefault();
    if (newNote.trim() === "") return;

    const newItem = {
      id: notes.length + 1,
      text: newNote,
      editing: false,
      updatedAt: formatDate(),
    };

    saveNotes([...notes, newItem]);
    setNewNote("");
  };

  const editNote = (note) => {
    note.editing = false;
    note.updatedAt = formatDate();
    saveNotes([...notes]);
  };

  const deleteNote = (index) => {
    if (window.confirm(t("project3.delete-msg"))) {
      const updated = [...notes];
      updated.splice(index, 1);
      saveNotes(updated);
    }
  };

  const deleteAllNotes = () => {
    if (window.confirm(t("project3.delete-msg"))) {
      setNotes([]);
      localStorage.removeItem("notes");
    }
  };

  return (
    <div className="notes">
      <div className="table">
        <h2>{t("project3.notes")}</h2>
        <table>
          <thead>
          <tr>
            <th colSpan="4">
              <form onSubmit={addNote}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder={t("project3.add-note")}
                />
                <button type="submit" className="add-note">
                  <i className="fas fa-plus-circle"></i>
                </button>
              </form>
            </th>
          </tr>
          <tr>
            <th>№</th>
            <th>{t("project3.note")}</th>
            <th>
              <span className="icon"><i className="fas fa-clock"></i></span>
              <span className="txt">{t("project3.modified")}</span>
            </th>
            <th>
              <span className="icon"><i className="fas fa-file-medical"></i></span>
              <span className="txt">{t("project3.actions")}</span>
            </th>
          </tr>
          </thead>
          <tbody>
          {notes.map((note, index) => (
            <tr key={note.id}>
              <td>{index + 1}</td>
              <td className="text">
                {note.editing ? (
                  <textarea
                    value={note.text}
                    onChange={(e) => {
                      note.text = e.target.value;
                      saveNotes([...notes]);
                    }}
                    onKeyUp={(e) => e.key === "Enter" && editNote(note)}
                    onBlur={() => editNote(note)}
                  />
                ) : (
                  <span>{note.text}</span>
                )}
              </td>
              <td className="updatedAt">{note.updatedAt}</td>
              <td className="action">
                {!note.editing && (
                  <>
                    <button
                      className="btn norm txt"
                      onClick={() => {
                        note.editing = true;
                        saveNotes([...notes]);
                      }}
                    >
                      {t("project3.edit")}
                    </button>
                    <button
                      className="btn norm icon"
                      onClick={() => {
                        note.editing = true;
                        saveNotes([...notes]);
                      }}
                      title="Edit..."
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </>
                )}
                <button
                  className="btn danger txt"
                  onClick={() => deleteNote(index)}
                >
                  {t("project3.delete")}
                </button>
                <button
                  className="btn danger icon"
                  onClick={() => deleteNote(index)}
                  title="Delete..."
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <th colSpan="4">
              <button className="btn danger" onClick={deleteAllNotes}>
                {t("project3.delete-all-notes")}
              </button>
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
