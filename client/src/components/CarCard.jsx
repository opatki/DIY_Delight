import '../css/CarCard.css'
import { Link } from 'react-router-dom'

export default function CarCard({id, name, exterior, roof, wheels, interior, price}) {
    return (
        <div className="car-card">
          <h2>{name}</h2>
            <div className='grid-container'>
                <div>
                    <p><strong>🖊️ Exterior:</strong> {exterior}</p>
                    <p><strong>🎩 Roof:</strong> {roof}</p>
                </div>
                <div>
                <p><strong>🛞 Wheels:</strong> {wheels}</p>
                <p><strong>💺 Interior:</strong> {interior}</p>
                </div>
                <div>
                <p><strong>💰 Price:</strong> ${Number(price).toLocaleString()}</p>
                <button><Link className='details' to={`/customcars/${id}`}>Details</Link></button>
                </div>
            </div>
        </div>
    )
}