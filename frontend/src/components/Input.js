export function Input({ type, value, onChange, className }) {
    return (
        <input
            className={`text-white border ${className}`}
            type={type} value={value} onChange={onChange}
            style={{ backgroundColor: '#333553', borderRadius: '5px', borderColor: '#419EF4' }}
        />
    );
}
