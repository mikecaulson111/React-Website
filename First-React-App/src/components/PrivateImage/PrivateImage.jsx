import { useState, useEffect } from "react"

import { supabase } from "../../utils/supabase.js"

export default function PrivateImage({path}) {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const getSecureLink = async () => {
            const {data, error} = await supabase
            .storage
            .from("PrivateImages")
            .createSignedUrl(path, 60);

            if (data) {
                setImageUrl(data.signedUrl);
            }
            if (error) {
                console.error("Error Status:", error.status);
                console.error("Error Message:", error.message);
            }
        };

        getSecureLink();
    }, [path]);

    return (
        <>
            {imageUrl ? <img src={imageUrl} alt="Secure content" style={{width: "20vw", height: "auto"}} /> : <p>Loading</p>}
        </>
    )
}
