import React from "react";
import { useLibraryContext } from "../context/LibraryContext";

const SecretSet = () => {
  const { langData } = useLibraryContext()!;

  let id = 0;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Character</th>
          <th>Secret Code</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries<string>(langData[0]).map((item) => {
          const [key, value] = item;
          return (
            key !== "name" &&
            key !== "secret_code_id" && (
              <tr key={id++}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};

export default SecretSet;
