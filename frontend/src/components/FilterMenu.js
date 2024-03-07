import { useNavigate } from 'react-router-dom';

export function FilterMenu ({ onSportSelect, closeBurgerMenu }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleSportClick = (sport) => {
        closeBurgerMenu();
        onSportSelect(sport);
    };

    const sports = ['all of them', 'football', 'rugby', 'tennis', 'basketball', 'swimming', 'boxing', 'surfing', 'skateboarding', 'snowboarding', 'cycling', 'volleyball'];

    const renderedSports = sports.map((sport, index) => (
        <div key={index} onClick={() => handleSportClick(sport)} className="cursor-pointer flex items-center py-2 px-4 rounded-md hover:bg-gray-700">
            <span className="text-blue">#</span>
            <span className="ml-2">{sport}</span>
        </div>
    ));

    return (
        <div style={{ backgroundColor: 'rgba(51, 53, 83, 0.9)', borderRadius: '5px', borderColor: 'grey' }} className="text-white border rounded w-44 p-3">
            <div className="text-white mb-5 text-lg"><span className="text-blue">#</span>Choose a sport</div>
            <div>
                {renderedSports}
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleLogout} className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none">
                    Logout
                </button>
            </div>
        </div>
    );
}
