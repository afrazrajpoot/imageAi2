import React, { useEffect,useState } from 'react';
import { ChromePicker } from 'react-color';
import { Icon } from '@iconify/react';



const App = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
const [images,setImages] = useState([])
const [state,setState] =useState(false)
const [color, setColor] = useState('#ffffff'); // Initial color state

// Handle color change
const handleColorChange = (newColor) => {
  setColor(newColor.hex); // Update color state
};
const handleIconClick = () => {
  // Programmatically trigger file input click
  document.getElementById('imageInput').click();
};

const handleFile = (e) => {
  console.log(e.target.files[0]);
  setImage(e.target.files[0]);
};

  async function callApi(formData) {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/createImage', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setError("Something went wrong");
      } else {
        setSuccess(true);
      }
      setState(true)
      // console.log(data);
    } catch (error) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageUrl', image);
    formData.append('description', description);
    await callApi(formData);
  }
useEffect(()=>{
  const getImages = async()=>{
    const response = await fetch('http://localhost:8000/api/v1/getImages')
    const data = await response.json()
    setImages(data?.data)
   
  }
  getImages()
},[state])
  return (
    <main className="container p-[2vw] flex items-center justify-center">
      <section className="w-full">
      <h1 className='text-[2vw] italic font-semibold text-start underline'>Image Uploader</h1>
        <form onSubmit={uploadFile} className='w-full border-[1px] max-w-[80vw] flex justify-center items-center h-[80vh]'>
          <main className='w-full relative h-full p-[2vw]'>
            <footer className='absolute bottom-0 w-full p-[1vw]'>
              <div className="flex items-center w-full max-w-[70vw] bg-[#f5f5f5] p-[1vw] rounded-md">
              <div className="cursor-pointer bg-[#f5f5f5] p-[0.5vw]" onClick={handleIconClick}>
                  <input
                    type="file"
                    id="imageInput"
                    style={{ display: 'none' }}
                    name="image"
                    accept="image/*"
                    onChange={handleFile}
                  />
                  <Icon icon='solar:gallery-send-broken' className="text-[1.5vw] text-purple-500 mr-[2vw]" />
                </div>
                <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} name="description" placeholder='enter your prompt to generate the image' id="description" className="w-full focus:outline-none border-purple-500 max-w-[60vw] bg-white p-[1vw] rounded-md border-[1px]" />
                <button onClick={uploadFile} className='p-[1vw] w-fit text-purple-500 hover:text-purple-700 text-center border-[1px] rounded-md ml-[2vw] bg-[#f5f5f5]'><Icon className='text-[1.5vw]'  icon="formkit:submit" /></button>
              </div>
            </footer>
          </main>
        </form>
      </section>
     <section className='w-full ml-[2vw] flex flex-col items-center max-w-[15vw]'>
      <h1 className='text-[1.5vw] italic font-semibold text-start underline'>Color Picker</h1>
     <ChromePicker color={color} onChange={handleColorChange} />
     <div className='p-[0.7vw] w-full border-[1px] mt-[1vw] shadow-md rounded-md'>
     <p className='text-[1vw] w-full font-medium '>Selected Color: {color}</p>
     </div>
     </section>
    </main>
  );
};

export default App;
