import React from 'react'
import './Modal.css'
import UploadForm from './UploadForm'

export const Modal = ({ show, close }) => {
  return ( 
    <div className="modal-wrapper" 
      style={{
        transform: show ? 'translate(0vh)' : 'translate(-100vh)',
        opacity: show ? '1' : '0'
      }}
    >
      <div className="modal-header">
        <p>Upload Files</p>
        <span onClick={close} className="close-modal-btn">x</span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <UploadForm/>
        </div>
        {/* <div className="modal-footer">
          <button onClick={close} className="btn-cancel">Cancel</button>
        </div> */}
      </div>
    </div>
  )
}