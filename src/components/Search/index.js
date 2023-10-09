let timeout;

function Search({onChange, ...props}) {
    function _onChange(value) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onChange(value);
        }, 300);
    }

    return (
        <input
            type="search"
            onChange={e => _onChange(e.target.value)}
            className="form-control"
            placeholder="Search"
            {...props}/>
    );
}

export default Search;