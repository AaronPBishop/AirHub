const SearchBar = () => {
    return (
        <input 
        placeHolder="Search Recipes by Brand or Product"
        className={`
            bg-stone-50 rounded-lg w-3/5 h-10 cursor-pointer text-center
        `}>
        </input>
    );
};

export default SearchBar;