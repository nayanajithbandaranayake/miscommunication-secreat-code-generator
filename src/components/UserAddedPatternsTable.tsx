import React from "react";
import { useProfileContext } from "../context/ProfileContext";

const UserAddedPatternsTable = () => {
  const { removeAddedLanguage, added_languages } = useProfileContext()!;

  return (
    <div className="table-container">
      <h3>Added patterns ({added_languages.length})</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Character Length</th>
            <th>Type</th>
            <th>Secret Key</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {added_languages.map((lang) => {
            const { type, name, character_length, secret_key } = lang;
            return (
              <tr key={secret_key}>
                <td>{name}</td>
                <td>{character_length}</td>
                <td>{type}</td>
                <td>{secret_key}</td>
                <td>
                  <button
                    type="button"
                    className="btn delete-btn"
                    onClick={() => removeAddedLanguage(name)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserAddedPatternsTable;
