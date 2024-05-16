import react from 'react'
import logo from '../openai.svg'
import { motion } from 'framer-motion'


function Loader(){
    return(
        <>
            <motion.div
                key='loader'
                className='flexContainer'
                initial={{y: -50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: -50, opacity: 0}}
                transition={{type: 'tween'}}
            >
                <img className='spinner' src={logo} alt='logo'/>
            </motion.div>

        </>
    )
}

export default Loader;