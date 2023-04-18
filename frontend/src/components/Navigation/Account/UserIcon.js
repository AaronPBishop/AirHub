import { useSelector, useDispatch } from 'react-redux';

import { setClickedAccount } from '../../../store/menu.js';
import { clearRecipeData } from '../../../store/setRecipe.js';

import { UserCircle } from '@styled-icons/boxicons-solid/UserCircle';

const UserIcon = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    if (user && Object.keys(user).length) return (
        <div className='flex justify-end w-48'>
            <div 
            onClick={() => {
                dispatch(setClickedAccount());
                dispatch(clearRecipeData());
            }}
            className={`
                flex justify-evenly text-amber-50 bg-amber-800 cursor-pointer leading-10 px-2 w-24 rounded-lg text-center border-b-4 border-amber-900 text-xl font-bold
            `}>
                <span>
                    {`${user.firstName.split('')[0]}${user.lastName.split('')[0]}`}
                </span>

                <UserCircle className='w-8'/>
            </div>
        </div>
    );
};

export default UserIcon;