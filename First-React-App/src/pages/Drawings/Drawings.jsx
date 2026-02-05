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
            <h3>My Drawings</h3>
            <img src={data.publicUrl} style={{width: "45vw", height: "auto", paddingRight: "10px"}} />
            <img src={data2.publicUrl} style={{width: "45vw", height: "auto"}} />
        </>
    )
}