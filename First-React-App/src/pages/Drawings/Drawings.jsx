import { supabase } from "../../utils/supabase.js";

const { data } = supabase
    .storage
    .from('Images')
    .getPublicUrl("drawings/Initial woman.jpg");

const { data: data2 } = supabase
    .storage
    .from('Images')
    .getPublicUrl("drawings/Tall skinny woman.jpg");

    // not working
const fetcher = async () => {
    const {data, err} = await supabase
        .storage
        .from('Images')
        .list('drawings');
    
    console.log(data.length);
}

export default function Drawings() {
    return (
        <>
            <img src={data.publicUrl} style={{width: "400px", height: "auto"}} />
            <img src={data2.publicUrl} style={{width: "400px", height: "auto"}} />
        </>
    )
}