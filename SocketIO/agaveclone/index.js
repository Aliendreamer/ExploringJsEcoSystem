import fastifyInstance,{fastifyInstanceDashboard} from "./server.js";
import {checkForOrbCollisions,checkForPlayerCollisions} from './socketStuff/checkCollisions.js';
import Player from './socketStuff/classes/Player.js';
import PlayerConfig from './socketStuff/classes/PlayerConfig.js';
import PlayerData from './socketStuff/classes/PlayerData.js';
import Orb from './socketStuff/classes/Orb.js';


//make an orbs array that will host all 500/5000 NOT PLAYER orbs.
//every time one is absorb, the server will make a new one
const orbs = [];
const settings = {
    defaultNumberOfOrbs: 5000, //number of orbs on the map
    defaultSpeed: 6, //player speed
    defaultSize: 6, //default player speed
    defaultZoom: 1.5, // as the player gets bigger, zoom needs to go out
    worldWidth: 5000,
    worldHeight: 5000,
    defaultGenericOrbSize: 5, //smaller than player orbs
}
const players = [];
const playersForUsers = [];
let tickTockInterval;

//on server start, to make our initial defaultNumberOfOrbs
initGame();
// console.log(orbs)

fastifyInstance.io.on('connect',(socket)=>{
    // a player has connected
    let player = {};
    socket.on('init',(playerObj,ackCallback)=>{
		console.log(playerObj)
        if(players.length === 0){ //someone is about to be added to players. Start tick-tocking
            //tick-tock - issue an event to EVERY connected socket, that is playing the game, 30 times per second
            tickTockInterval = setInterval(()=>{
                fastifyInstance.io.to('game').emit('tick',playersForUsers) // send the event to the "game" room
            },16)
        }

        socket.join('game'); //add this socket to "game" room
        //event that runs on join that does init game stuff
        // make a playerConfig object - the data specific to this player that only the player needs to know
        const playerName = playerObj.playerName;
        const playerConfig = new PlayerConfig(settings);
        const playerData = new PlayerData(playerName,settings)
        player = new Player(socket.id,playerConfig,playerData);
        players.push(player); //server use only
        playersForUsers.push({playerData})
        // make a playerData object - the data specific to this player that everyone needs to know
        // a master player object to house both
        ackCallback({orbs,indexInPlayers:playersForUsers.length-1}) //send the orbs array back as an ack function!
    })

    //the client sent over a tock!
    socket.on('tock',(data)=>{
        //a tock has come in before the player is set up.
        //this is because the client kept tocking after disconnect
		console.log(data);
        if(!player.playerConfig){
            return;
        }
		console.log("tock")
        const speed = player.playerConfig.speed;
        const xV = player.playerConfig.xVector = data.xVector;
        const yV = player.playerConfig.yVector = data.yVector;

        //if player can move in the x, move
        if((player.playerData.locX > 5 && xV < 0) || (player.playerData.locX < settings.worldWidth) && (xV > 0)){
            player.playerData.locX += speed * xV;
        }
        //if player can move in the y, move
        if((player.playerData.locY > 5 && yV > 0) || (player.playerData.locY < settings.worldHeight) && (yV < 0)){
            player.playerData.locY -= speed * yV;
        }

        //check for the tocking player to hit orbs
        const capturedOrbI = checkForOrbCollisions(player.playerData,player.playerConfig,orbs,settings);
        //function returns null if not collision, an index if there is a collision
        if(capturedOrbI !== null){ //index could be 0, so check !null
            //remove the orb that needs to be replaced (at capturedOrbI)
            //add a new Orb
            orbs.splice(capturedOrbI,1,new Orb(settings));

            //now update the clients with the new orb
            const orbData = {
                capturedOrbI,
                newOrb: orbs[capturedOrbI],
            }
            //emit to all sockets playing the game, the orbSwitch event so it can update orbs... just the new orb
            fastifyInstance.io.to('game').emit('orbSwitch',orbData);
            //emit to all sockets playing the game, the updateLeaderBoard event because someone just scored
            fastifyInstance.io.to('game').emit('updateLeaderBoard',getLeaderBoard());
        }

        //player collisions of tocking player
        const absorbData = checkForPlayerCollisions(player.playerData,player.playerConfig,players,playersForUsers,socket.id)
        if(absorbData){
			fastifyInstance.io.to('game').emit('playerAbsorbed',absorbData)
            fastifyInstance.io.to('game').emit('updateLeaderBoard',getLeaderBoard());
        }

    })

    socket.on('disconnect',(reason)=>{
        // console.log(reason)
        //loop through players and find the player with THIS players socketId
        //and splice that player out
        for(let i = 0; i < players.length; i++){
            if(players[i].socketId === player.socketId){
                //these are the droids we're looking for
                //splice the player out of the players AND playersForUsers
                players.splice(i,1,{})
                playersForUsers.splice(i,1,{})
                break;
            }
        }
        //check to see if players is empty. If so, stop "ticking"
        if(players.length === 0){
            clearInterval(tickTockInterval)
        }
    });
})

function initGame(){
    //loop defaultNumberOfOrbs times, and push a new Orb() onto our array
    for(let i = 0; i < settings.defaultNumberOfOrbs; i++){
        orbs.push(new Orb(settings));
    }
}

function getLeaderBoard(){
    const leaderBoardArray = players.map(curPlayer=>{
        if(curPlayer.playerData){
            return{
                name: curPlayer.playerData.name,
                score: curPlayer.playerData.score,
            }
        }else{
            return {}
        }
    })
    return leaderBoardArray;
}
fastifyInstance.listen({ port: 3000 });
fastifyInstanceDashboard.listen({ port: 4000 });