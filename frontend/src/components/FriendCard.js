export function FriendCard ({friend,openChat}) {
    return <div onClick={openChat} style={{ backgroundColor: '#333553', borderRadius: '50px', borderColor: '#419EF4' }} className='flex justify-center items-center border border-white rounded w-60 h-16'>{friend}</div>
}