import React, { useState } from "react";

export default function ListButton({ items, title }) {
const [showList, setShowList] = useState(false);

  const togglelist = () => {
    setShowList((prev) => !prev);
  };
  return (
    <div>
      <button onClick={togglelist}>
        {showList ? `hide ${title}` : `show ${title}`}
      </button>
      {showList && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li> // You can customize rendering here
          ))}
        </ul>
      )}
    </div>
  );
}
