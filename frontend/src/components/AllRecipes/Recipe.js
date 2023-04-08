const Recipe = ({ brand, item, cookTemp, cookTime, avgRating, previewImg }) => {
    return (
        <div 
        style={{boxShadow: '0px 0px 8px 2px rgb(230, 120, 0)'}}
        className={`
            text-white bg-amber-500 
            h-2/6 p-4 py-6 
            cursor-pointer leading-10 
            rounded-lg text-center 
            border-b-4 border-amber-600 
            text-lg mt-12
        `}>
            <p>Brand: {brand}</p>
            <p>Item: {item}</p>
            <p>Cook Temp: {cookTemp} degrees</p>
            <p>Cook Time: {cookTime} minutes</p>
            <p>Rating: {avgRating} stars</p>
        </div>
    );
};

export default Recipe;