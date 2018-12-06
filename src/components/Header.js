import React from 'react';
import '../styles/Header.css';

const Header = props => {
  return (
    <header>
      <div className="header-container">
        <h1>Scavenger Hunt!</h1>
        <form onSubmit={props.submit}>
          <span className="form-text">Choose a file</span>
          <div className="file-container-col2">
            <label htmlFor="file" className="file-select">
              Click to choose a file!
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg"
              ref={props.fileInputRef}
              className="input-file"
            />
          </div>
          <input
            type="submit"
            value="Search with file"
            className="input-file-submit"
          />

          <span className="form-test">or</span>
          <input
            type="text"
            placeholder="Image URL here!"
            ref={props.urlInputRef}
            className="input-url"
          />
          <input
            type="submit"
            value="Search with URL"
            className="input-url-submit"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
