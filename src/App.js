import { useEffect, useState } from "react";
import "./index.css";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://llqxiwjhfzduibzvulpa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscXhpd2poZnpkdWlienZ1bHBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzY0OTA2OCwiZXhwIjoyMDI5MjI1MDY4fQ.7xNZEFJou_NCT9dVhxeeD9Bzoevo_zFw05J3usSmVic"
);

function App() {
  const [userInput, setUserInput] = useState("");
  const [notes, setNotes] = useState();
  const [add, setAdd] = useState(0);

  const addNote = async (e) => {
    if (e.key === "Enter") {
      const { error } = await supabase
        .from("notes")
        .insert({ note: userInput })
        .select();

      setAdd(add + 1);

      setUserInput("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("notes").select();
      setNotes(data);
    };
    fetchData();

    console.log("notes updated");
  }, [add]);

  return (
    <div
      className="App"
      onKeyDown={(e) => {
        addNote(e);
      }}
    >
      <div className="mainContainer">
        <h1>/ NOTES</h1>
        <div className="inputContainer">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </div>
        <div className="noteContainer">
          {notes &&
            notes.map((note) => {
              return <h3>{note.note}</h3>;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
