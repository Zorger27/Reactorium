import React from 'react';
import { useTranslation } from 'react-i18next';
import "@/components/other/Notes.scss";

export default function Notes() {
  const { t } = useTranslation();

  return (
    <div className="notes">
      <h1 style={{color: "darkmagenta"}}>Здесь будет Notes</h1>
    </div>
  )
}