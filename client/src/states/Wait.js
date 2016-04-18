class WaitState extends Phaser.State {

    init(socket, nick) {
        console.log("Wait init: ", socket.id, nick);

        this.socket = socket;
        this.player_nick = nick;
    }

    preload(){
        console.log('Wait state preload');
    }

    create() {
        document.getElementById('waiting').style.display = 'block';

        console.log('Wate state create');

        // Inform the server the player is ready to join a game
        this.socket.emit('player_ready', this.nick);

        this.socket.on('game_start', gameInstance => {
            console.log("Entering Game instance: ", gameInstance.id);
            console.log("Enemy nick: ", gameInstance.enemy.nick);
            console.log("Enemy color: ", gameInstance.enemy.color);

            this.state.start('GameState', false, false, this.socket);
        });

        //TODO: add invite friend button to wait state for those tired of waiting
        //var inviteFriendButton = window.document.getElementById('enter_queue_button');
    }

    shutdown() {
        document.getElementById('waiting').style.display = 'none';
    }
}

export default WaitState;
