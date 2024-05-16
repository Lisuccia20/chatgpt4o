import OpenAI from "openai";
import {createRef, useEffect, useState} from "react";
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Bubble from './Components/Bubble'


const openAI = new OpenAI({ dangerouslyAllowBrowser: true, apiKey: 'sk-proj-L2W2xAlZf3mkAbjuazROT3BlbkFJovWBwBLaeF2O3pbmouIe'});





function App() {
    const [name, setName] = useState();
    const [messages, setMessages] = useState([]);
    const [array, setArray] = useState([{role: 'system', content: 'sei un assistente di nome lisa, pronomi femminili, il tuo compito è aiutare un utente, rispondi solo usando la formattazione html delimitato da un p'}]);

    const createBubble = async (message, sender) =>{
        setMessages(prevMessage => [...prevMessage, [message, sender]])
        if (sender === 'Lisa') {
            setArray(prevArray => [...prevArray, {role: 'assistant', content: message}]);
        } else if (sender === 'User') {
            setArray(prevArray => [...prevArray, {role: 'user', content: message}]);
        }
    }

    let bubbles = messages.map((message, key) => {
        return <Bubble key = {key} name={message[1]} message={message[0]}/>
    })

    useEffect(() => {
        document.getElementById('bottom').scrollIntoView({behavior: 'smooth'})
    }, [messages]);

    useEffect(() => {
        const fetchData = async () => {
            const completion = await openAI.chat.completions.create({
                messages: array,
                model: "gpt-4o",
            });
            let message = completion.choices[0].message.content;
            await createBubble(message, 'Lisa');
        };

        if (array.length > 0 && array[array.length - 1].role === 'user') {
            fetchData();
        }
    }, [array]);

    return (
    <>
        <div className="flexContainer">
            <div className="chatContainer">
                {bubbles}
                <div id='bottom'></div>
            </div>
        </div>
        <div className="flexContainer">
            <div className='input'>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
                <button onClick={() => {createBubble(name, 'User')}}><FontAwesomeIcon icon={faPaperPlane}/></button>
            </div>
        </div>
    </>
    );
}

export default App;
