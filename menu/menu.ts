import readline from "readline"

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export const screen_clear = () => {
    console.clear();
}

export const main_menu_display = () => {
    console.log('\t[1] - Show Settings and presimulation with current settings');
    console.log('\t[2] - Current Balance of your wallet');
    console.log('\t[3] - Settings');
    console.log('\t[4] - Start the anti-mev volume & maker bot');
    console.log('\t[5] - Unwrap wsol to sol in main wallet');
    console.log('\t[6] - Gather sol from new wallets');
    console.log('\t[7] - Exit');
}
