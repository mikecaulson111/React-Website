// File written with help from generative AI

import { useEffect, useState } from "react"
import { supabase } from "../../utils/supabase.js"

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .storage
        .from('PrivateImages')
        .list('');

      if (error) {
        console.error('Error fetching list:', error);
      } else if (data) {
        // 1. Create an array of Promises
        const urlPromises = data.map(async (file) => {
          const { data: urlData, error: urlError } = await supabase.storage
            .from('PrivateImages')
            .createSignedUrl(file.name, 60);

          return urlData?.signedUrl;
        });

        // 2. Wait for ALL promises to resolve
        const imageFiles = await Promise.all(urlPromises);

        // 3. Filter out any nulls/undefined (like the .emptyFolderPlaceholder)
        setImages(imageFiles.filter(url => url !== undefined));
      }
      setLoading(false);
    };

    fetchImages()
  }, [])

  if (loading) return <p>Loading Gallery...</p>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
      {images.map((url, index) => (
        <img 
          key={index} 
          src={url} 
          alt={`Drawing ${index}`} 
          style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
        />
      ))}
    </div>
  )
}