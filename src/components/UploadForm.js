import React, {useState, useEffect} from 'react'
import {storage} from '../utils/firebase'
import firebase from 'firebase'
import './UploadForm.css'

function UploadForm() {
  const fileRef = firebase.database().ref('File');
  const [contents, setContents] = useState([]);
  const [urls, setURLs] = useState([]);
  const [progress] = useState(0);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [url, setUrl] = useState('');
  const [fileList, setFileList] = useState();

  function handleChange(e){

    for (var i = 0; i < e.target.files.length; i++){
      const newContent = e.target.files[i]
      newContent["id"] = Math.random();
      setContents((prevState) => [...prevState, newContent]);
    }

    
  };

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleCategory(e) {
    setCategory(e.target.value)
  }

  function handleItem(e) {
    setItem(e.target.value)
  }

  const createList = () => {
    const file = {
      title,
      category,
      item,
      url,
      complete: false
    }
    fileRef.push(file)
  }
  
  useEffect(() => {
    fileRef.on('value', (snapshot) => {
      const files = snapshot.val();
      const fileL = [];
      for(let id in files) {
        fileL.push({id, ...files[id]});
      }
      setFileList(fileL);
    })
  }, [])

  function handleUpload(e) {
    const promises = [];
    contents.map((content) => {
      e.preventDefault();
      const uploadTask = storage.ref(`${content.name}`).put(content);
      promises.push(uploadTask)
      uploadTask.on("state_changed", console.log, console.error, async () => {
        await storage.ref().child(content.name).getDownloadURL().then((url) => {
          setContents(null)
          setURLs((prevState) => [...prevState, urls])
          setUrl(urls)
        });
      });
    })

    Promise.all(promises)
       .then(() => alert("All files uploaded"))
       .catch((err) => console.log(err));
  };

  console.log("file: ", contents);
  console.log("urls", urls);
    return (
        <div>
          <form onSubmit={handleUpload}>
            <div className="upload">
                <div className="upload-file">
                  <input type="file" id="file" multiple onChange={handleChange}/>
                  <label for="file">
                    Drop files to upload <br/> or browse
                  </label>
                </div>
              

              <div className="upload-info">
                <label for="file-title" >File Title</label>
                <input type="text" id="file-title" placeholder="file title..." onChange={handleTitle} value={title}></input>

                <label for="category" >Category</label>
                <input type="text" id="category" placeholder="category..." onChange={handleCategory} value={category}></input>

                <label for="item" >Item</label>
                <input type="text" id="item" placeholder="item..." onChange={handleItem} value={item}></input>
                
                <button className="btn-upload" onClick={createList}>Upload</button>
                
                <progress value={progress} max="100" />
              </div>
            </div>
          </form>
        </div>
    )
}

export default UploadForm
