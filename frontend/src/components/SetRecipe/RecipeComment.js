import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchRecipes } from '../../store/recipes.js';
import { deleteComment, editComment } from '../../store/setRecipe.js';
import { restoreUser } from '../../store/user.js';

const RecipeComment = ({ id, ownerId, firstName, lastName, comment }) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user.user && state.user.user);

    const [clickedEdit, setClickedEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment);

    return (
        <div
        className={`
            flex bg-sky-700 w-full px-6 py-2 rounded-lg text-left border-b-4 border-sky-900 text-lg my-6 shadow
        `}>
            <div className={`
                ${clickedEdit && 'hidden'}
                w-11/12`
            }>
                <div className='my-5 font-bold text-yellow-200'>
                    {`${firstName} ${lastName}`}
                </div>

                <div>
                    {comment}
                </div>
            </div>

            <div
            className={`
                ${!clickedEdit && 'hidden'}
                w-11/12
            `}>
                <input 
                onChange={e => setNewComment(e.target.value)}
                value={newComment}
                className={`
                    rounded-md cursor-pointer text-center w-11/12 h-4/6 mt-5 text-black shadow
                `}>
                </input>
            </div>

            <div className={`
                ${!user ? 'invisible' : (ownerId !== user.id) && 'invisible'}
            `}>
                <div
                onClick={async () => {
                    if (clickedEdit) {
                        await dispatch(editComment(id, newComment));
                        await dispatch(fetchRecipes());
                        await dispatch(restoreUser());

                        setClickedEdit(false);

                        return;
                    };

                    setClickedEdit(true);
                }} 
                className='m-2 p-2 bg-sky-900 rounded-lg border-b-4 border-sky-900 text-lg cursor-pointer text-center'>
                    {!clickedEdit ? 'Edit' : 'Confirm'}
                </div>

                <div
                onClick={async () => {
                    await dispatch(deleteComment(id));
                    await dispatch(fetchRecipes());
                    await dispatch(restoreUser());
                }}
                className='m-2 p-2 bg-sky-900 rounded-lg border-b-4 border-sky-900 text-lg cursor-pointer text-center'>
                    Delete
                </div>
            </div>
        </div>
    );
};

export default RecipeComment;