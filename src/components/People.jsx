import React, { useEffect, useState } from 'react';
import { FaThList, FaThLarge } from 'react-icons/fa';
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
const People = () => {

  const [peopleData, setPeopleData] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [randomImages, setRandomImages] = useState([]);
  useEffect(() => {
    // Fetch people data from the API
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data) => setPeopleData(data.results));
    fetch('https://picsum.photos/v2/list?page=2&limit=100')
      .then((response) => response.json())
      .then((data) => setRandomImages(data));
  }, []);

  if (peopleData.length === 0) {
    return  (
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

  return (
    <div className="container mx-auto px-4">
    <h2 className="flex text-3xl font-semibold mb-6 text-white text-left">People List</h2>
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
      <div className="grid grid-cols-3 gap-4"style={{ cursor: 'pointer' }}>
        {peopleData.map((person,index) => (
          <div key={person.url} className="bg-blue-100 p-4 border">
          <img src={randomImages[index % randomImages.length].download_url} alt={person.name} className="w-full h-32 object-cover mb-2" />
            <p className="font-semibold">{person.name}</p>
          </div>
        ))}
      </div>
    ) : (
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="px-4 py-2 font-bold">Name</th>
            <th className="px-4 py-2 font-bold">Height(cm)</th>
            <th className="px-4 py-2 font-bold">weight(kg)</th>
            <th className="px-4 py-2 font-bold">Hair Color</th>
            {/* Add more table headers here as needed */}
          </tr>
        </thead>
        <tbody>
          {peopleData.map((person) => (
            <tr key={person.url} className="bg-blue-100"style={{ cursor: 'pointer' }}>
              <td className="border px-4 py-2">{person.name}</td>
              <td className="border px-4 py-2">{person.height}</td>
              <td className="border px-4 py-2">{person.mass}</td>
              <td className="border px-4 py-2">{person.hair_color}</td>
              {/* Add more table data cells here as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  );
};

export default People;
