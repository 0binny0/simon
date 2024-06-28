
import {useState, useRef, useEffect} from "react";

import {games} from "./games.js";

function Simon(props) {
    // Indicates the level of difficulty when progressing through the sequences of the game
    const [level, setLevel] = useState(1);
    //Represents the power button to turn the game on or off
    const [power, setPower] = useState(false);
    //The collection of successive games to progress through
    const [game, setGame] = useState(games[Math.floor(Math.random() * games.length)]);
    // The sequence of colors to match before advancing to a more difficult sequence
    const round = game[level];
    //Reverts the player to the beginning of the game if the player loses (optional)
    const [strictGame, setStrictGame] = useState(false);
    //References the remaining colors to match for the given round
    const colors_remaining = JSON.parse(JSON.stringify(round));
    const timer = useRef(null);
    //The time limit set to expire if a pad is not clicked (in seconds)
    const time_limit = useRef(5);
}

function Pad({isOn, color, changeLevel, changeGame}) {

    function check_color_match(e) {
        //check if the selected pad (e.currentTarget.id) matches the first color in colors_remaining
        //if true:
            // remove the color from colors remaining (colors_remaining[0])
            //if colors_remaining is []
                //...setLevel(() => level + 1));
            //now rest time_limit to 5000ms
            // clearInterval(time_limit.current)
            // time_limit.current = 5
            // startInterval(() => {
            //time_limit.current -= 1
            // if time_limit.current === 0
                  // see else block
            // }, 1000
        //else:
            // the selected pad DOESN'T match the first color in colors_remaining

                //set variable let i = 0
                //const indicators = [0, undefined, 0, undefined, 0, undefined, strictGame ? 1 : level]
                //setInterval(() = {
                    // setLevel(indicators[i] if level != 0 || level !== undefined: setGame(game) clearInterval()
                //})

    }

    return <button aria-label={`${color}_pad`} className={isOn ? `pad power_${color}_pad_on` : `pad power_${color}_pad_off`} id={`${color}_pad`} onClick={check_color_match}>

    </button>
}

export {Simon, Pad};