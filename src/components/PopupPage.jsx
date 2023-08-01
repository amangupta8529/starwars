import React from 'react';
import image from './Rectangle.png'
const PopupPage = ({ film, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg p-4 w-80 h-full overflow-y-auto shadow-lg border border-white">
        <div className="mb-4 border-b border-white">
          <div className="images border-b border-white">
            <img
              src={image} // Replace 'film.imageURL' with the actual image URL or import the image using require()
              className="w-full rounded-lg h-40 object-cover mb-4"
            />
          </div>
          <div className="title border-b border-white">
            <h2 className="text-2xl font-semibold mb-2 text-white">
              <strong>{film.title}</strong>
            </h2>
          <div className="director border-b border-white">
            <p className="text-white">
              <strong>Release date:</strong> {film.release_date}
            </p>
          </div>
          </div>
          <div className="crawl border-b border-white">
            <p className="text-white">
              <strong>Opening crawl:</strong> {film.opening_crawl}
            </p>
          </div>
        </div>

        {/* Add more film details here as needed */}
        <button className="bg-red-600 text-white font-semibold py-2 px-4 mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupPage;
