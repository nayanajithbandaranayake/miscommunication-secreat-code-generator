import React from "react";
import { useProfileContext } from "../context/ProfileContext";

const UserOwnPatternTable = () => {
  const { own_languages, deleteLanguage } = useProfileContext()!;
  return (
    <div className="table-container">
      <h3>Your patterns ({own_languages.length})</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Character Length</th>
            <th>Type</th>
            <th>Secret Key</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {own_languages.map((lang) => {
            const { secret_key, character_length, name, type } = lang;
            return (
              <tr key={secret_key}>
                <td>{name}</td>
                <td>{character_length}</td>
                <td>{type}</td>
                <td>{secret_key}</td>
                {name !== "ascii" ? (
                  <td>
                    <button
                      type="button"
                      className="btn delete-btn"
                      onClick={() => deleteLanguage(name)}
                    >
                      Delete
                    </button>
                  </td>
                ) : (
                  <td>N/A</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserOwnPatternTable;
