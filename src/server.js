import http from 'http'
import express from 'express'
import { Server } from "socket.io";
import cons from 'consolidate'

const app = express();

app.engine('html', cons.swig);
app.set('views', __dirname + "/views");
app.set('view engine', 'html');
app.use('/public', express.static(__dirname + "/public"));
app.get('/', (req, res) => res.render("index.html"));
app.get('/*', (req, res) => res.redirect('/'));


const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

function handleListen() {
    console.log('server on')
}

function onSocketClose() {
    console.log('Disconnect from the socket');
}


wsServer.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);

    socket.on('setData', (setData)=>{
        socket.broadcast.emit('setShowCardData', setData)
    })
});

httpServer.listen(3000, handleListen);