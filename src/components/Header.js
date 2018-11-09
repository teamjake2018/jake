import React from 'react';
import '../styles/Header.css';

const header = props => {
    return (
        <header>
          <div className='header-container'>
          <h1>Scavenger Hunt!</h1>
          <form onSubmit={props.submit}>
            <div className='file-container'>
              <span>Choose a file</span>
              <label for='file' className='file-select'>
                  Click to choose a file!
              </label>
              <input 
                type="file" 
                name="file"
                id="file"
                accept='image/png, image/jpeg'
                ref={props.fileInputRef} 
                className='input-file'/>
              <input type="submit" value="Search with file" className='input-file-submit'/>
            </div> {/* .file-container */}
            {/* <br/> */}
            <div className='url-container'>
              <span>or</span>
              <input type="text" placeholder="Image URL here!" ref={props.urlInputRef} className='input-url'/>
              <input type="submit" value="Search with URL" className='input-url-submit'/>
            </div> {/* .url-container */}
          </form>
          </div>
        </header>
    );
}

export default header;