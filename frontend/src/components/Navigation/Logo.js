import { useDispatch } from 'react-redux';

import { resetMenu } from '../../store/menu.js';
import { clearRecipeData } from '../../store/setRecipe.js';
import { fetchRecipes } from '../../store/recipes.js';

import { WeatherWindy } from '@styled-icons/typicons/WeatherWindy';

const Logo = () => {
    const dispatch = useDispatch();
    
    return (
        <div className='w-48'>
            <div 
            onClick={() => {
                dispatch(resetMenu());
                dispatch(clearRecipeData());
                dispatch(fetchRecipes());
            }}
            className={`
                flex text-white bg-amber-800 cursor-pointer leading-10 pr-2 w-24 rounded-lg text-center border-b-4 border-amber-900 text-lg
            `}>
                <WeatherWindy className='text-amber-50' />

                <span className='text-amber-50 font-bold tracking-wide'>AirHub</span>
            </div>
        </div>
    );
};

export default Logo;