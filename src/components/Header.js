import React from 'react';
import '../styles/Header.css';

const header = props => {
    return (
        <header>
          <div className='header-container'>
          <h1>Scavenger Hunt!</h1>
          <form onSubmit={props.submit}>
            <div className='header-container-row'>
              <span>Choose a file</span>
              <div className='file-container-col2'>
                <label htmlFor='file' className='file-select'>
                    Click to choose a file!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <input 
                  type="file" 
                  name="file"
                  id="file"
                  accept='image/png, image/jpeg'
                  ref={props.fileInputRef} 
                  className='input-file'/>
                <input type="submit" value="Search with file&nbsp;&nbsp;" className='input-file-submit'/>
              </div> {/* .file-container-col2 */}
            </div> {/* .file-container */}
            {/* <br/> */}
            <div className='header-container-row'>
              <span>or</span>
              <div className='ur-container-col2'>
                <input type="text" placeholder="Image URL here!" ref={props.urlInputRef} className='input-url'/>
                <input type="submit" value="Search with URL" className='input-url-submit'/>
              </div> {/* .url-container-col2 */}
            </div> {/* .url-container */}
          </form>
          </div>
        </header>
    );
}

export default header;