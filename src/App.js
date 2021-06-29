import React, { useState } from 'react'
import './App.css';

import SideNav from './components/SideNav'
import Form from './components/Form'
import TodoList from './components/TodoList'
import UploadForm from './components/UploadForm'
import UploadList from './components/UploadList'
import { Modal } from './components/Modal'

import axios from 'axios'

class App extends React.Component {
  // State of your application
  state = {
    items: [],
    categories: [],
    medias: [],
    error: null,
  };

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const responseItem = await axios.get('http://localhost:1337/items');
      const responseCategory = await axios.get('http://localhost:1337/categories');
      const responseMedia = await axios.get('http://localhost:1337/manual-and-documents')
      this.setState({ items: responseItem.data });
      this.setState({ categories: responseCategory.data });
      this.setState({ medias: responseMedia.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { errorItem, item } = this.state;
    const { errorCategory, category } = this.state;
    const { errorMedia, media } = this.state;

    // Print errors if any
    if (errorItem) {
      return <div>An error occured: {errorItem.message}</div>;
    }
    if (errorCategory) {
      return <div>An error occured: {errorCategory.message}</div>;
    }
    if (errorMedia) {
      return <div>An error occured: {errorMedia.message}</div>;
    }

    return (
      <div className="app">
        <header className="app-header">
          <h4>JustContent</h4>
        </header>

        <div className="app-main">
          <div className="app-sidenav">
            <div className="app-sidenav-filter">
              <ul>
                <li><a href="#all-items">All Items</a></li>
                {this.state.categories.map(category => (
                  <li key={category.id}><a href=""> {category.name} </a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="app-content">
            <div className="app-path">
              <div className="path">
                <p>Path</p>
              </div>
              
              <div className="destination">
                <h3>All Item</h3>
              </div>
            </div>
            
            <div className="content-container">
              <div className="item">
                <ul>
                  {this.state.items.map(item => (
                    <div className="item-box">
                      <img src="https://via.placeholder.com/188x188" alt=""></img>
                      <p key={item.id}> {item.name} </p>
                    </div>
                  ))}
                </ul>
              </div>
              {/* <div>
                <ul>
                  {this.state.medias.map(media => (
                    <img key={media.id} src={media.url}></img>
                  ))}
                </ul>
              </div> */}
            </div>
            
            
          </div>
          
        </div>
        
      </div>
    );
  }
}

export default App

// function App() {

//   const [show, setShow] = useState(false);
//   const closeModalHandler = () => setShow(false);

//   return (
//     <div className="app">
//       {/* <section class="app-header">
//         <div className="app-header-container">
//           <nav className="navbar">
//             <header>JustContent</header>
//             <ul class="nav-menu">
//               <li class="nav-item">
//                 <a class="product" href="#product">Product</a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </section> */}
//       <header className="app-header">
//         <h4>JustContent</h4>
//       </header>

//       <div className="app-main">
//         <div className="app-sidenav">
//           <div className="app-sidenav-filter">
//             <li><a href="#all-items">All Items</a></li>
//           </div>
//         </div>
        
//         <div className="app-content">
//             <div className="app-path">
//               <div className="path">
//                 <p>Path</p>
//               </div>
//               <div className="destination">
//                 <h3>Item Name</h3>
//               </div>
//             </div>

//             <div className="content-container">
//               <div className="app-item">
//                 <div className="info">
//                   <img src="https://via.placeholder.com/336x336" alt=""></img>
//                   <h2>Item Name</h2>
//                   <h3>Category</h3>
//                   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
//                 </div>
//               </div>

//               <div className="app-upload">
//                 <div className="upload-modal-btn">
//                   {show ? <div onClick={closeModalHandler} className="back-drop"></div> : null}
//                   <button onClick={() => setShow(true)} className="btn-openModal">UPLOAD</button>
//                   {/* <Form />
//                   <TodoList /> */}
//                   <Modal show={show} close={closeModalHandler}/>
//                 </div>
//               </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }