import React, {useState} from "react";
import Alert from "./ui/alert";
import {useDropzone} from "react-dropzone";


const url = 'http://127.0.0.1:8000/api';

const BasicDropzone = () => {

    const [alert, setAlert] = useState({
        isVisible: false,
        type: null,
        msg: null,
    });

    const onDrop = (file) => {
        setAlert({
            isVisible: false,
            type: null,
            msg: null,
        })
        sendImage(file)
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
    });

    const sendImage = async(image) => {
        try {
            let formData = new FormData()
            formData.append('image', image[0], image[0].name)

            const response = await fetch(`${url}/images/`, {
                method: 'POST',
                body: formData
            })

            const data  = await response.json()
            const {id} = data
            getImage(id)
        }
        catch (e) {
            console.log(e)
            setAlert({isVisible: true, type: 'error', 'msg': 'some errors'})
        }
    };

    const getImage = async (id) => {
        try {
            const response = await fetch(`${url}/images/${id}/download`, {
                method: 'GET',
                responsType: 'blob',
            });
            const data = await response.blob()
            const href = window.URL.createObjectURL(data)
            const downloadLink = document.createElement('a')
            downloadLink.href = href
            downloadLink.setAttribute('download', 'removed_bg_img.png')
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
            setAlert({isVisible: true, type: 'succes', msg: 'congrats'});
        }
        catch (e) {
            console.log(e);
            setAlert({isVisible: true, type: 'error', msg: 'some errors'});
        }
    };

    const {isVisible, type, msg} = alert
    return (
        <>
            {isVisible && <Alert color={type === 'succes' ? 'green' : 'red'} msg = {msg} />}
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>
                    {isDragActive
                        ? 'drop images'
                        : 'drop and drag images'
                    }
                </p>
            </div>
        </>
    )
};

export default BasicDropzone;