import { useNavigate } from 'react-router-dom';

export function FilterMenu ({onSportSelect ,closeBurgerMenu}) {


    const navigate = useNavigate()


    const handleLogout = () => {
        navigate('/')
    }


    const handleSportClick = (sport) => {
        closeBurgerMenu()
        onSportSelect(sport)
    }
    

    const sports = ['all of them','football','rugby','tennis','basketball','swimming','boxing','surfing','skateboarding','snowboarding','cycling','volleyball']

    const renderedSports = sports.map((sport) => {
        return <div key={sport._id} onClick={() => handleSportClick(sport)}><span className='text-blue'>#</span>{sport}</div>
    })




    return <div style={{ backgroundColor: '#333553', borderRadius: '5px', borderColor: '#419EF4' }} className='text-white border rounded w-44 p-3'>
        <div className='text-white mb-5 text-lg'><span className='text-blue'>#</span>Choose a sport</div>
        <div>
            {renderedSports}
        </div>
        <div className='flex justify-end mt-64'>
        <div onClick={handleLogout} className="inline-block px-4 py-1 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 cursor-pointer">
  Logout
</div>
        </div>
    </div>


}