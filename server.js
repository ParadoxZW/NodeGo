const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const {Controller} = require('@sabaki/gtp');

// initial some basic object and configs
const idColor = {"1": "B", "-1":"W"};
let mime_type = fs.readFileSync("./mime.json");
let parseData = JSON.parse(mime_type.toString());

const leela_path = 'leela/';
const weight_path = leela_path + 'best-network';
const leela_cofig = ['--gtp', '--noponder', '--p=200', '--weight=' + weight_path];

let leela = new Controller(leela_path + 'leelaz.exe', leela_cofig);
leela.start();

// define necessary/useful functions
const str2int = (s => s.charCodeAt() - 'A'.charCodeAt());
const int2str = (i => String.fromCharCode(i + ('A'.charCodeAt())));

async function genmove(response, moves) {
    let leela_response, pos, new_move, arg, c, x, y;
    try {
        // console.log(typeof moves);
        await leela.sendCommand({name: 'clear_board'});
        // console.log(2);
        for (let move of moves) {
            c = move.c;
            // console.log(move);
            // console.log(int2str(move.x));
            pos = int2str(move.x) + move.y;
            arg = [idColor[c.toString()], pos];
            // console.log(arg);
            await leela.sendCommand({name: 'play', args:arg});
        }
        arg = [idColor[(-c).toString()]];
        // console.log(arg);
        leela_response = await leela.sendCommand({ name: 'genmove', args: arg});
    } catch (err) {
        console.log(err);
        throw new Error('Failed to send command!')
    }
    if (leela_response.error) {
        throw new Error('Command not understood by Leela!')
    }

    console.log(leela_response.content);
    x = str2int(leela_response.content.charAt(0));
    y = leela_response.content.slice(1);
    new_move = `[${x}, ${y}]`;
    response.end(new_move); 
}


function move_includes(moves, m) {
    for (n of moves) {
        if (n.x == m.x && n.y == m.y) {
            return true;
        }
    }
    return false;
}

function genmove_for_test(moves) {
    let min = 0, max = 18;
    const new_m = () => {
        return {
            x: Math.floor(Math.random() * (max - min + 1)) + min,
            y: Math.floor(Math.random() * (max - min + 1)) + min
        }
    };
    let m = new_m();
    while (move_includes(moves, m)) {
        m = new_m();
    }
    return `[${m.x},${m.y}]`
}

http.createServer(function (request, response) {
    let pathname = url.parse(request.url).pathname, moves;

    // POST
    if (request.method == 'POST') {
        if (pathname == '/kifu') {
            // console.log(request);

            var post = '';

            request.on('data', function (chunk) {
                post += chunk;
            });

            request.on('end', function () {
                // moves = querystring.parse(post);
                moves = JSON.parse(post);
                // console.log(moves);
                // response.end(genmove_for_test(post));
                genmove(response, moves);
            });
            // return;
        }
    }else {

    // GET

        if (pathname == '/') {
            pathname = '/index.html';
        }
        let suffix = '.' + pathname.split('.').pop();
        let type = parseData[suffix];

        console.log("Request for " + pathname + "(" + type + ")" + " received.");

        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                response.writeHead(200, { 'Content-Type': type });
                response.write(data);
            }
            response.end();
        });
    }
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');