
import {useState, useRef, useEffect} from "react";

import {games} from "./games.js";

function Simon(props) {
    // Indicates the level of difficulty when progressing through the sequences of the game
    const [level, setLevel] = useState("A");
    //Represents the power button to turn the game on or off
    const [power, setPower] = useState(false);
    //The collection of successive games to progress through
    const [game, setGame] = useState(games[Math.floor(Math.random() * games.length)]);
    // The sequence of colors to match before advancing to a more difficult sequence
    if (!isNaN(level)) {
        //Sets the current sequence to play
        const round = game[parseInt(level)];
        //Refers to the remaining colors to match in the sequence
        const colors_remaining = JSON.parse(JSON.stringify(round));
    }
    //Reverts the player to the beginning of the game if the player loses (optional)
    const [strictGame, setStrictGame] = useState(false);
    //References the remaining colors to match for the given round
    const timer = useRef(null);
    //The time limit set to expire if a pad is not clicked (in seconds)
    const time_limit = useRef(5);

    function turn_simon_on() {
        //Clicking the "power" button will enable the player to
        //start a new game and/or setting the game to strict mode
        setPower(!power);
    }

    function start_new_game() {
        //When "start" is clicked the game display will
        //blink "--" until the game is ready to play
        let i = 0;
        const indicators =  [undefined, "--", undefined, "0"];
        const interval_id = setInterval(
            () => {
                const indicator = indicators[i];
                setLevel(indicator);
                if (indicator === "0") {
                    clearInterval(interval_id);
                } else {
                    i++;
                }
            }, 500
        );
    }

    const pads = ["red", "green", "blue", "yellow"].map((color) => {
        return <Pad key={crypto.randomUUID()} isOn={power} color={color} changeLevel={setLevel} changeGame={setGame} />
    });

    return <main>
        <div className="game_pads">
            {pads}
        </div>
        <section className="interface">
            <h1 className="game_name">Simon</h1>
            <div className="display">
                <p className="level_display">{power ? isNaN(level) ? level : parseInt(level) + 1 : null}</p>
                <p className="title">Level</p>
            </div>
            <div className="start_button_wrapper">
                <button type="button" className="start_button" id="start_game" aria-label="start_new_game" onClick={start_new_game}></button>
                <p className="title">Start</p>
            </div>
            <div className="power_buttons_wrapper">
                <p className="title">Off</p>
                <button className={!power ? "power_button power_off" : "power_button power_on"} onClick={turn_simon_on} aria-label="turn_game_off"></button>
                <button className={power ? "power_button power_on" : "power_button power_off"} onClick={turn_simon_on} aria-label="turn_game_on"></button>
                <p className="title">On</p>
            </div>
            <div className="strict_game_wrapper">
                <div className="strict_light_indicator"></div>
                <p className="title">Strict</p>
            </div>
        </section>
    </main>
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