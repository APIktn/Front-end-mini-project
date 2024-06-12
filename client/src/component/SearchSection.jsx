const SearchSection = ({ searchText, handleInput }) => {
  return (
    <div className="search-container">
      <p>ค้นหาเกี่ยวกับ</p>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        value={searchText}
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchSection;
