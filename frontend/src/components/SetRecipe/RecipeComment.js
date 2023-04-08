const RecipeComment = ({ comment }) => {
    return (
        <div
        className={`
            bg-sky-700 w-full p-6 rounded-lg text-left border-b-4 border-sky-900 text-lg my-4 shadow
        `}>
            {comment}
        </div>
    );
};

export default RecipeComment;