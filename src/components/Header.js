import React from 'react';

const header = props => {
    return (
        <header>
          <h1>Scavenger Hunt!</h1>
          <form onSubmit={props.submit}>
            <input 
              type="file" 
              name="file"
              id="file"
              accept='image/png, image/jpeg'
              ref={props.fileInputRef}
              />
              <label for="file">Choose a file</label>
            <input type="submit" value="Search with file" />
            <br/>
            <span>or</span><input type="text" placeholder="Image URL here!" ref={props.urlInputRef} />
            <input type="submit" value="Search with URL" />
          </form>
        </header>
    );
}

export default header;