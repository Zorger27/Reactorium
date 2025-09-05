import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/Notes.scss";

export default function Notes() {
  const { t } = useTranslation();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  // форматирование даты с учетом локали
  const formatDate = useCallback(() => {
    const locale = localStorage.getItem("user-locale") ?? "en";
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    if (locale === "es") {
      return currentDate.toLocaleDateString("es-ES", dateOptions);
    } else if (locale === "ua") {
      return currentDate.toLocaleDateString("uk-UA", dateOptions);
    } else {
      return currentDate.toLocaleDateString("en-US", dateOptions);
    }
  }, [currentDate]);

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

    setCurrentDate(new Date());
    saveNotes([...notes, newItem]);
    setNewNote("");
  };

  const editNote = (note) => {
    note.editing = false;
    setCurrentDate(new Date());
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
            <th>{t("project3.modified")}</th>
            <th>{t("project3.actions")}</th>
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