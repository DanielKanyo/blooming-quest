import { Game } from "../../Components/Game/Game";
import { MyQuests } from "../../Components/Quests/MyQuests/MyQuests";

import "./GameLayout.css";

export function GameLayout() {
    return (
        <div className="game-layout">
            <div className="game-container">
                <Game />
            </div>
            <div className="my-quests-container">
                <MyQuests />
            </div>
        </div>
    );
}
