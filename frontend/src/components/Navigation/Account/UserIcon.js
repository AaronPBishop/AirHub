import { useSelector, useDispatch } from 'react-redux';

import { setClickedAccount } from '../../../store/menu.js';

const UserIcon = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user);

    if (user && Object.keys(user).length) return (
        <div className='flex justify-end w-48'>
            <div 
            onClick={() => dispatch(setClickedAccount())}
            className={`
                text-white bg-amber-800 cursor-pointer leading-10 w-20 rounded-lg text-center border-b-4 border-amber-900 text-lg
            `}>
                {`${user.firstName} ${user.lastName.split('')[0]}`}
            </div>
        </div>
    );
};

export default UserIcon;