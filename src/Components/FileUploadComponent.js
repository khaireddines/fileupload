import React ,{useCallback}from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import './FileUploadComponent.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function StyledDropzone(props) {

  function handleUpload(e){
    e.preventDefault();
    const form = new FormData()
    acceptedFiles.forEach((item,index)=>{
      form.append('file',item)
    })
    axios.post('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res=>{
      if(res.status ===200){
        Swal.fire({
          title: 'Success!',
          text: 'File Uploaded Successfully',
          icon: 'success'
        })
      }else
      {
        Swal.fire({
          title: 'Failed!',
          text: 'Ops...Something Went Wrong!',
          icon: 'error'
        })
      }
    })
   
  }
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({accept: 'zip,application/zip,application/x-zip,application/x-zip-compressed'});
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className="page">
    <div className="btndiv">
        <button className="btn btn-light" type="button" onClick={handleUpload}>Upload File</button>
    </div>
    <div className="container">
    <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {isDragActive && !isDragReject && "Drop it like it's hot!"}
      {isDragReject && "File type not accepted, sorry!"}
    </Container>
    </div>
    <br/>
    <div className="files">
        <h4>Files</h4>
        <ul>{files}</ul>
    </div>
    
  </div>   
   
  );
}

export default StyledDropzone;