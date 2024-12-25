import React, { useState } from 'react';

const Accordion = ({ title, children, onClick, isShow = false, updateTopicStatus, isChecked = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        onClick()
        setIsOpen(!isOpen);
    };

    return (
        <div className="border border-gray-200 rounded-md shadow-sm mb-4">
            {/* Accordion Header */}
            <div
                className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
                
            >
                <div className='flex items-center gap-2'>
                    <h2 className="font-medium text-gray-800">{title}</h2>
                    {isShow && (
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => updateTopicStatus(e.target.checked)}
                        />
                    )}
                </div>
                <span onClick={toggleAccordion} className="text-gray-500">{isOpen ? '-' : '+'}</span>
            </div>

            {/* Accordion Content */}
            {isOpen && (
                <div className="p-4 bg-white text-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Accordion;
