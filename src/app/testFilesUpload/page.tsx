// app/components/UploadForm.tsx
"use client";

import { useRef } from 'react';
import axios from 'axios';

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        try {
            console.log(formData);
            formData.forEach((value, key) => {
                console.log(key + ': ' + value);
            }); 

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/uploadMultiple`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                alert('Files uploaded successfully!');
                formRef.current?.reset();
            } else {
                alert('Failed to upload files.');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('An error occurred while uploading files.');
        }
    };

    return (
        <form
            ref={formRef}
            encType="multipart/form-data"
            action={handleSubmit}
            className='mt-20'
        >
            <div>
                <label>Business Model Document</label>
                <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx"
                />
                <p>Upload your detailed business model (PDF, DOC, DOCX - Max 5MB)</p>
            </div>
            <div>
                <label>Business Plan Document</label>
                <input
                    type="file"
                    name="file"
                    accept=".pdf,.doc,.docx"
                />
                <p>Upload your complete business plan (PDF, DOC, DOCX - Max 5MB)</p>
            </div>
            <div>
                <button type="submit">Upload</button>
            </div>
        </form>
    );
}