import React, { useState } from 'react';
import '../styles/Avatar.css';
import Axios from 'axios';

function Avatar() {
    const [sprite, setSprite] = useState("bottts");
    const [seed, setSeed] = useState(1000);

    const handleSprite = (spriteType) => setSprite(spriteType);
    const handleGenerate = () => setSeed(Math.floor(Math.random() * 1000));

    const downloadImage = async () => {
        try {
            const response = await Axios.get(
                `https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`,
                { responseType: "blob" }
            );

            const url = URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${seed}.svg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <div className='container'>
            <div className="nav">
                <p>Random Avatar Generator</p>
            </div>
            <div className="home">
                <div className="btns">
                    {['avataaars', 'bottts', 'identicon', 'micah'].map(type => (
                        <button key={type} onClick={() => handleSprite(type)}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="avatar">
                    <img
                        src={`https://api.dicebear.com/7.x/${sprite}/svg?seed=${seed}`}
                        alt="Generated Avatar"
                    />
                </div>
                <div className='generate'>
                    <button id="gen" onClick={handleGenerate}>Next</button>
                    <button id="down" onClick={downloadImage}>Download</button>
                </div>
            </div>
        </div>
    );
}

export default Avatar;
