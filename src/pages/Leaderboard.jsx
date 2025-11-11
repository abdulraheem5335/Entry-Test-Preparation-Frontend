import React, { useState, useMemo } from 'react';

// Icon for the trend up/down indicator
const TrendIcon = ({ type }) => {
  if (type === 'up') {
    return (
      <svg className="w-4 h-4 text-green-500 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6m0 0v6m0-6L9 15m0 0L3 9m6 6l-3 3" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-red-500 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h6m0 0v-6m0 6l-9-9m0 0L3 15m6-6l-3-3" />
    </svg>
  );
};

// --- Large Demo Data with Categories ---
const allStudentsData = [
    { rank: 1, username: 'Ahmed Khan', score: 980, mcqsAttempted: 500, corrected: 480, timeTaken: '2h 15m', category: 'Phy' },
    { rank: 2, username: 'Fatima Zohra', score: 950, mcqsAttempted: 490, corrected: 460, timeTaken: '2h 30m', category: 'Bio' },
    { rank: 3, username: 'Usman Ali', score: 920, mcqsAttempted: 480, corrected: 450, timeTaken: '2h 20m', category: 'Che' },
    { rank: 4, username: 'Aisha Bibi', score: 890, mcqsAttempted: 470, corrected: 430, timeTaken: '2h 45m', category: 'Math' },
    { rank: 5, username: 'Ali Raza', score: 870, mcqsAttempted: 460, corrected: 420, timeTaken: '3h 00m', category: 'Eng' },
    { rank: 6, username: 'Sara Naveed', score: 865, mcqsAttempted: 450, corrected: 410, timeTaken: '2h 50m', category: 'Logical Reasoning' },
    { rank: 7, username: 'Bilal Hassan', score: 860, mcqsAttempted: 500, corrected: 400, timeTaken: '3h 10m', category: 'Phy' },
    { rank: 8, username: 'Hira Mani', score: 840, mcqsAttempted: 440, corrected: 390, timeTaken: '2h 40m', category: 'Bio' },
    { rank: 9, username: 'Imran Malik', score: 820, mcqsAttempted: 430, corrected: 380, timeTaken: '2h 35m', category: 'Che' },
    { rank: 10, username: 'Mariam Tariq', score: 810, mcqsAttempted: 460, corrected: 370, timeTaken: '3h 05m', category: 'Math' },
    { rank: 11, username: 'Zainab Ahmed', score: 800, mcqsAttempted: 420, corrected: 360, timeTaken: '2h 55m', category: 'Eng' },
    { rank: 12, username: 'Fahad Mustafa', score: 790, mcqsAttempted: 410, corrected: 350, timeTaken: '2h 45m', category: 'Logical Reasoning' },
    { rank: 13, username: 'Sana Javed', score: 780, mcqsAttempted: 470, corrected: 340, timeTaken: '3h 15m', category: 'Phy' },
    { rank: 14, username: 'Danish Taimoor', score: 770, mcqsAttempted: 400, corrected: 330, timeTaken: '3h 00m', category: 'Bio' },
    { rank: 15, username: 'Ayeza Khan', score: 760, mcqsAttempted: 440, corrected: 320, timeTaken: '2h 50m', category: 'Che' },
    { rank: 16, username: 'Feroze Khan', score: 750, mcqsAttempted: 390, corrected: 310, timeTaken: '2h 40m', category: 'Math' },
    { rank: 17, username: 'Yumna Zaidi', score: 740, mcqsAttempted: 430, corrected: 300, timeTaken: '3h 20m', category: 'Eng' },
    { rank: 18, username: 'Wahaj Ali', score: 730, mcqsAttempted: 380, corrected: 290, timeTaken: '3h 10m', category: 'Logical Reasoning' },
    { rank: 19, username: 'Hania Aamir', score: 720, mcqsAttempted: 420, corrected: 280, timeTaken: '3h 00m', category: 'Phy' },
    { rank: 20, username: 'Bilal Abbas', score: 710, mcqsAttempted: 370, corrected: 270, timeTaken: '2h 50m', category: 'Bio' },
];

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 students per page

  // Filter the data based on the active filter
  const filteredData = useMemo(() => {
    if (activeFilter === 'all') {
      return allStudentsData;
    }
    return allStudentsData.filter(student => student.category === activeFilter);
  }, [activeFilter]);

  // Paginate the filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleFilterChange = (e) => {
    setActiveFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Student Leaderboard
          </h2>

          <div>
            {/* Filter */}
            <div className="flex justify-end mb-4">
              <div className="relative inline-block text-left">
                <select
                  id="filter"
                  value={activeFilter}
                  onChange={handleFilterChange}
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Quizzes</option>
                  <option value="Math">Mathematics</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                  <option value="Bio">Biology</option>
                  <option value="Phy">Physics</option>
                  <option value="Che">Chemistry</option>
                  <option value="Eng">English</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
                </div>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Username</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Student Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">MCQs Attempted</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Corrected</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">Time Taken</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-blue-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((student) => (
                    <tr key={student.rank} className={student.rank % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.rank}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {student.score} {student.score > 850 ? <TrendIcon type="up" /> : <TrendIcon type="down" />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.mcqsAttempted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.corrected}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.timeTaken}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-600">
                Showing {Math.min(paginatedData.length, itemsPerPage)} of {filteredData.length} students
              </span>
              <div className="flex space-x-1">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Prev
                </button>
                {/* Dynamically create page buttons */}
                {[...Array(totalPages)].map((_, i) => (
                    <button 
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-lg border ${
                            currentPage === i + 1 
                            ? 'border-blue-600 bg-blue-600 text-white' 
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}