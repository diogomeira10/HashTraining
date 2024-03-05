export function FilterMenu ({onSportSelect ,closeBurgerMenu}) {


    const handleSportClick = (sport) => {
        closeBurgerMenu()
        onSportSelect(sport)
    }
    

    const sports = ['footbal','rugby','tennis','basketball','swimming','boxing','surfing','skateboarding','snowboarding','cycling','volleyball']

    const renderedSports = sports.map((sport) => {
        return <div onClick={() => handleSportClick(sport)}><span className='text-blue'>#</span>{sport}</div>
    })




    return <div style={{ backgroundColor: '#333553', borderRadius: '5px', borderColor: '#419EF4' }} className='text-white border rounded w-44 p-3'>
        <div className='text-white mb-5 text-lg'><span className='text-blue'>#</span>Choose a sport</div>
        <div>
            {renderedSports}
        </div>
    </div>


}