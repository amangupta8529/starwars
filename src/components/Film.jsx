import React, { useEffect, useState } from 'react';
import { FaThList, FaThLarge } from 'react-icons/fa';
import FilmAction from './FilmAction';
import PopupPage from './PopupPage';
import Deletepopup from './Deletepopup';
const spinnerAnimation = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Film = () => {
  const [filmData, setFilmData] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [randomImages, setRandomImages] = useState([]);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [currentDropdownIndex, setCurrentDropdownIndex] = useState(null);
  const handleListItemClick = (film) => {
    setSelectedFilm(film); // Store the data of the selected film
    setShowPopup(true); // Show the popup
  };
  const handleDelete = () => {
    // Perform the deletion logic here (e.g., trigger an API call to delete the item)
    console.log('Item deleted!');
    setShowDeletePopup(false); // Close the popup after deletion
  };
  const toggleDropdown = (index) => {
    if (currentDropdownIndex === index) {
      // If the clicked dropdown is already open, close it
      setCurrentDropdownIndex(null);
    } else {
      // Otherwise, open the clicked dropdown
      setCurrentDropdownIndex(index);
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordionIndex((prevState) => (prevState === index ? -1 : index));
  };
  useEffect(() => {
    // Fetch film data from the API
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => setFilmData(data.results));
  }, []);
   // Close all dropdowns when clicking outside of them
   useEffect(() => {
    const closeDropdownOnOutsideClick = () => {
      setCurrentDropdownIndex(null);
    };

    document.addEventListener('click', closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    };
  }, []);
  useEffect(() => {
    // Fetch random images from picsum.photos API
    fetch('https://picsum.photos/v2/list?page=9&limit=100')
      .then((response) => response.json())
      .then((data) => setRandomImages(data));
  }, []);

  if (filmData.length === 0 || randomImages.length === 0) {
    return (
      <div className="container mx-auto px-4 h-screen flex justify-center items-center">
        {/* Apply proper styles to make the spinner visible */}
        <style>{spinnerAnimation}</style>
        <div
          style={{
            border: '4px solid rgba(0, 0, 0, 0.3)',
            borderTop: '4px solid #fff',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            marginTop: '-200px',
          }}
        />
      </div>
    );
  }

  // Sort the filmData array by episode_id in ascending order
  filmData.sort((a, b) => a.episode_id - b.episode_id);

  // Function to convert date string to a human-readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="flex text-3xl font-semibold mb-6 text-white">Films List</h2>
      <div className="flex justify-end mb-4">
        <button
          style={isGridView ? {} : { backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }} // Initial styling for the "List View" button
          className=" text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => setIsGridView(false)}
          disabled={!isGridView}
        >
          <FaThList className={`inline-block mr-1 ${isGridView ? 'text-blue-500' : 'text-white'}`} />
        </button>
        <button
          style={isGridView ? { backgroundColor: 'blue', color: 'white', fontWeight: 'bold' } : {}} // Initial styling for the "Grid View" button
          className=" text-white font-semibold py-2 px-4 rounded"
          onClick={() => setIsGridView(true)}
          disabled={isGridView}
        >
          <FaThLarge className={`inline-block mr-1 ${isGridView ? 'text-white' : 'text-blue-500'}`} />
        </button>
      </div>
      {isGridView ? (
        /* Grid view */
        <div className="grid grid-cols-3 gap-4" style={{ cursor: 'pointer' }}>
          {filmData.map((film, index) => (
            <div key={film.episode_id} className="bg-blue-100 p-4 border flex flex-col"   >
              <img
                src={randomImages[index % randomImages.length].download_url}
                alt={film.title}
                className="w-full h-32 object-cover mb-2"
                onClick={() => handleListItemClick(film)}
              />
              <div className="flex items-center justify-between"> {/* Use justify-between */}
                <p className="font-semibold">{film.title}</p>
                <div>
                  <FilmAction isOpen={currentDropdownIndex === index} // Pass whether the dropdown is open or not
                    onToggle={() => toggleDropdown(index)} // Pass the toggle function
                    zIndex={showDeletePopup ? -1 : 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="px-4 py-2 font-bold">Name</th>
              <th className="px-4 py-2 font-bold">Director</th>
              <th className="px-4 py-2 font-bold">Release Date</th>
              <th className="px-4 py-2 font-bold"></th>
              {/* Add more table headers here as needed */}
            </tr>
          </thead>
          <tbody>
            {filmData.map((film, index) => (
              <React.Fragment key={film.episode_id}>
                <tr className="bg-blue-100"  style={{ cursor: 'pointer' }}></tr>
                <tr key={film.episode_id} className="bg-blue-100" style={{ cursor: 'pointer' }}>
                  <td className="border px-4 py-2"onClick={() => handleListItemClick(film)} >{film.title}</td>
                  <td className="border px-4 py-2"onClick={() => handleListItemClick(film)} >{film.director}</td>
                  <td className="border px-4 py-2" onClick={() => handleListItemClick(film)} >{formatDate(film.release_date)}</td>
                  <tr>
                    <td colSpan="4">
                      <div className="flex items-center justify-end relative ">
                        <div className="absolute right-0 top-0">
                          <FilmAction 
                          rowIndex={index} 
                          isOpen={currentDropdownIndex === index} // Pass whether the dropdown is open or not
                          onToggle={() => toggleDropdown(index)} // Pass the toggle function
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tr>
              </React.Fragment>
              ))}
          </tbody>
        </table>
      )}

      {/* Popup Page */}
      {showPopup && (
  <PopupPage film={selectedFilm} onClose={() => setShowPopup(false)} />
)}
    </div>
  );
};

export default Film;
 