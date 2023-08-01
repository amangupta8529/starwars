import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Deletepopup from './Deletepopup';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function FilmAction({ rowIndex }) {
  const [isOpen, setIsOpen] = useState(false); // State to manage whether the dropdown is open or closed
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Check if the click occurs outside the dropdown menu
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleDelete = (event) => {
    // Perform the deletion logic here (e.g., trigger an API call to delete the item)
    event.stopPropagation();
    console.log('Item deleted!');
    setIsOpen(false); // Close the dropdown
    setShowDeleteConfirmation(true);
  };
  const handleCancel = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the parent elements
    setShowDeleteConfirmation(false); // Hide the delete confirmation modal
  };
  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <div className="lg:absolute lg:right-0 lg:top-0 border">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" // Add 'ml-1' for left margin
              onClick={() => setIsOpen(!isOpen)}
            >
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={isOpen}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              style={{ zIndex: 50 }}
            >
              {/* Dropdown content */}
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Dowload
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Rename
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Move
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Share Link
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Mark Private
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                       onClick={handleDelete}
                      className={classNames(
                        active ? 'bg-red-100 text-red-800' : 'text-red-700',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {showDeleteConfirmation && (
        <Deletepopup
          itemName={`this item`} // Replace "this item" with the actual name of the item to be deleted
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
      </div>
    </div>
  );
}
