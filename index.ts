import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { main_menu_display, rl, screen_clear } from "./menu/menu";
import base58 from "bs58";


export const init = () => {
    screen_clear();
    console.log("Raydium Maker Bot");

    main_menu_display();

    rl.question("\t[Main] - Choice: ", (answer: string) => {
        let choice = parseInt(answer);
        switch (choice) {
            case 1:
                show_settings_simulation()
                break;
            case 2:
                show_balance()
                break;
            case 3:
                settings()
                break;
            case 4:
                startBot()
                break;
            case 5:
                unwrapSol()
                break;
            case 6:
                gather()
                break;
            case 7:
                process.exit(1);
            default:
                console.log("\tInvalid choice!");
                sleep(1500);
                init();
                break;
        }
    })

}

function exit() {
    
    // USER_ID = chatId;   
    clearBot()
}


export const mainMenuWaiting = () => {
    clearBot()
    setTimeout(()=>init(),3000)
}

const settingsWaiting = () => {
    clearBot()
    setTimeout(()=>settings(),3000)
}