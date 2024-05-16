import react from 'react';
import {motion} from "framer-motion";

export default function Bubble(props){
    const html = require('html-to-react').Parser;
    const html2react = new html()
    let message = html2react.parse(props.message)



    return(
        <>
            <motion.div
                className={props.name}
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
            >
                <h2>{props.name}</h2>
                <div>{message}</div>
            </motion.div>
        </>
    )
}