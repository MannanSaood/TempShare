'use client'
import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { storage } from '../utils/firebaseConfig';

const Home = (list, setter) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState();
    const [file, setFile] = useState();
    const [url, setUrl] = useState();


    const onFileUpload = () => {
        if (!file) return;
        setIsLoading(true);
        const storageRef = ref(storage, `/files/`+ file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        }, (err) => {
            console.log(err);
            setIsLoading(false);
        },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        setUrl(url);
                        setIsLoading(false);
                    })
            }
        )
    }

    const onFileChange = e => {
        setFile(e.target.files[0]);
        e.preventDefault();
    }


    
  return (
        <section className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-mono font-extrabold  text-gray-700">TempShare</h1>
            <span className="text-2xl font-mono text-red-400">Create A Temporary File Share</span>
            <div className='border-2 m-6 border-slate-500 py-3 border-dashed rounded w-3/4 h-full  flex flex-col justify-center items-center'>
            <label className='text-xl pb-3 font-mono text-gray-600'>Select a File</label>
            <input className='file:bg-inherit cursor-pointer file:cursor-pointer file:border-none file:text-slate-600 text-slate-600  file:px-6 file:py-3 file:rounded-lg bg-gradient-to-b border-none  from-slate-50 to-gray-200 px-8 py-4 rounded-2xl' title='' type="file" onChange={onFileChange} />
            <br/>
            <button className='h-auto w-auto px-12 bg-red-400 rounded-md p-2 ' onClick={onFileUpload}>
                Upload!
            </button>
            <div className="break m-5"></div>
            {isLoading && <p>File upload <b>{progress}%</b></p>}
            {url && <p className="font-light text-xs font-bold">URL: <a className="font-light text-xs" href={url} target="_blank" rel="noreferrer">{url}</a></p>}
            </div>
        </section>
  )
}

export default Home