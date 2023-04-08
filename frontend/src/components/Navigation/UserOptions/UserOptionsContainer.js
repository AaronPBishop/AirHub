import { useDispatch } from 'react-redux';

import { deleteSession } from '../../../store/user.js';
import { resetMenu } from '../../../store/menu.js';

const UserOptionsContainer = () => {
    const dispatch = useDispatch();

    return (
        <div className='w-48'>
            <div
            className={`
                text-white bg-amber-800 cursor-pointer pt-4 h-16 w-60 rounded-lg text-center border-b-4 border-amber-900 text-lg mt-20 my-6
            `}>
                New Recipe
            </div>

            <div
            className={`
                text-white bg-amber-800 cursor-pointer pt-4 h-16 w-60 rounded-lg text-center border-b-4 border-amber-900 text-lg my-6
            `}>
                My Favorites
            </div>

            <div
            className={`
                text-white bg-amber-800 cursor-pointer pt-4 h-16 w-60 rounded-lg text-center border-b-4 border-amber-900 text-lg my-6
            `}>
                My Recipes
            </div>

            <div
            onClick={() => {
                dispatch(deleteSession());
                dispatch(resetMenu());
            }}
            className={`
                text-white bg-amber-800 cursor-pointer pt-4 h-16 w-60 rounded-lg text-center border-b-4 border-amber-900 text-lg my-6
            `}>
                Log Out
            </div>
        </div>
    );
};

export default UserOptionsContainer;