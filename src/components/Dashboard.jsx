import React, { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { DocumentIcon, SearchIcon } from '@heroicons/react/solid';
import Main from './Main'
import Default from './Default';
import logo from './logo.png';

const navigation = [
  { name: 'Films', href: '/Films', current: true },
  { name: 'People', href: '/People', current: false },
  { name: 'Planets', href: '/planets', current: false },
  { name: 'Species', href: '/Species', current: false },
  { name: 'Starships', href: '/Starships', current: false },
  { name: 'Vehicles', href: '/Vehicles', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tab, setTab] = useState('Default');

  return (
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-full bg-gray-400">
      <div className="bg-gray-800 text-white min-h-screen w-full md:w-64 px-4 py-8 md:py-4">
        <div className="md:flex md:items-center mb-4 md:mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-18"
                src={logo}
                alt="Workflow"
              />
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
        <div className={classNames('md:flex', isOpen ? 'block' : 'hidden')} style={{ cursor: 'pointer' }}>
          <div className="flex-grow md:flex md:flex-col md:justify-start">
            {navigation.map((item) => (
              <p
                onClick={() => { setTab(item.name) }}
                key={item.name}
                href={item.href}
                className={classNames(
                  'flex items-center px-3 py-2 rounded-md text-base font-medium',
                  tab === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                <DocumentIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="md:flex-1 md:overflow-y-auto">
        {/* Your main content goes here */}
        <header className="flex flex-wrap justify-between items-center shadow px-4 py-3 bg-gray-700 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-100 mb-4 md:mb-0">Dashboard</h1>
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="block w-full sm:w-60 md:w-96 bg-gray-200 border border-transparent rounded-lg py-2 pl-10 pr-4 focus:ring-indigo-200 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="p-4 sm:p-6 lg:p-8"style={{ backgroundColor: '#17273b'}}>
            {tab === 'Default' && <Default />}
            {tab !== 'Default' && <Main tab={tab} />}
          </div>
        </main>
      </div>
    </div>
  );
}
