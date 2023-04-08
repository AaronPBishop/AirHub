const RecipeComment = ({ comment }) => {
    return (
        <div
        className={`
            bg-amber-600 w-full p-6 rounded-lg text-left border-b-4 border-amber-900 text-lg my-4
        `}>
            {comment}
        </div>
    );
};

export default RecipeComment;