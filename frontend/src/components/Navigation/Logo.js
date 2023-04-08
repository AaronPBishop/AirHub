import { useDispatch } from 'react-redux';

import { resetMenu } from '../../store/menu.js';

const Logo = () => {
    const dispatch = useDispatch();
    
    return (
        <div className='w-48'>
            <div 
            onClick={() => dispatch(resetMenu())}
            className={`
                text-white bg-amber-800 cursor-pointer leading-10 w-20 rounded-lg text-center border-b-4 border-amber-900 text-lg
            `}>
                AirHub
            </div>
        </div>
    );
};

export default Logo;