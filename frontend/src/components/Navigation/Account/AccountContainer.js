import { useSelector } from 'react-redux';

import SignUpButton from './SignUpButton.js';
import LogInButton from './LogInButton.js';
import UserIcon from './UserIcon.js';

const AccountContainer = () => {
    const user = useSelector(state => state.user);

    return (
        <div className='w-48'>
            <div
            className={`
                ${!Object.keys(user).length && 'hidden'}
            `}>
                <UserIcon />
            </div>
        
            <div 
            className={`
                ${Object.keys(user).length && 'hidden'}
                flex justify-evenly
            `}>
                <SignUpButton />
                <LogInButton />
            </div>
        </div>
    );
};

export default AccountContainer;