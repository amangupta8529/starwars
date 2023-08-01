import React from 'react';
import RectangleImage from './Rectangle.png';

const Default = () => {
  return (
    <div
      className="container mx-auto px-4 py-6"
      style={{
        display: 'flex',
        width: '800px', // Increased width
        padding: '32px', // Increased padding
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '16px', // Decreased gap for a better layout
        borderRadius: '12px',
        border: '2px solid #E0E6ED',
        background: '#FFF',
        boxShadow: '0px 7px 34px 0px rgba(23, 23, 37, 0.25)',
      }}
    >
      <div className="grid w-full grid-cols-1 gap-4">
        <div className="bg-gray-500 p-4 border rounded-lg">
          <img src={RectangleImage} alt="Image 1" className="w-695 h-300 object-cover mb-4 rounded-lg" />
          <h2
            className="text-3xl font-semibold mb-6"
            style={{
              color: "#3B3F5C",
              fontFamily: "Open Sans",
              fontSize: "24px", // Increased font size
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "28px", // Increased line height
              letterSpacing: "0.14px",
            }}
          >
            <span>Welcome to Star Wars Dashboard</span>
          </h2>
          <p
            className="text-center"
            style={{
              color: "#00091a",
              fontFamily: "Open Sans",
              fontSize: "16px", // Increased font size
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px", // Increased line height
              letterSpacing: "0.14px",
              alignSelf: "stretch",
            }}
          >
            Star Wars is an American epic space opera multimedia franchise created by George Lucas, which began with
            the eponymous 1977 film and quickly became a worldwide pop culture phenomenon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Default;
