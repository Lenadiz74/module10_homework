/*
для решения задачи был использован сервер: wss://ws.ifelse.io//
т.к. сервер: wss://echo.websocket.org/ не работает.
сервер: wss://ws.ifelse.io// сбрасывает соединение через некоторое время((((
 */


(function renderUI() {

    document.querySelector('#root').innerHTML = `    
    
    <div class="messenger">
        <div class="top">
            <input type="text" class="input_message_field">
            <button class="send_button button">Отправить</button>
            <button class="send_geolocation button">Геолокация</button>
        </div>
        <div class="message_field"></div>
    </div>
`;
})();

let websocket;

const rootEl = document.querySelector('.message_field');

document.querySelector('.send_button').addEventListener('click', sendMessage);
document.querySelector('.send_geolocation').addEventListener('click', sendGeolocation);


(function websocketStart() {
    const wsUri = "wss://ws.ifelse.io//";
    websocket = new WebSocket(wsUri);
    websocket.onopen = function () {
        console.log('CONNECTED');
    };
    websocket.onclose = function (evt) {
        console.log("DISCONNECTED" + evt);
    };
    websocket.onmessage = function (evt) {

        if (!evt.data.includes('object') && !evt.data.includes('Request served by c')) {
            document.querySelector('.message_field').appendChild(constructMessage(evt.data, 'server'));
            smoothScrollToMessage();
        }
    };
    websocket.onerror = function (evt) {
        console.log(`error ${evt.data}`);
    };
})();


function constructMessage(message, sender, geo) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.classList.add('text');
    p.innerText = message;
    if (sender === 'user') {
        div.classList.add('outgoing_message');
        p.classList.add('message_text_out');

    } else if (sender === 'server') {
        div.classList.add('incoming_message');
        p.classList.add('message_text_in');

    } else if (sender === 'geo') {
        const a = document.createElement('a');
        a.href = `https://www.openstreetmap.org/#map=18/${geo.latitude}/${geo.longitude}`;
        a.target = 'blank';
        a.classList.add('message_text_out','text');
        div.classList.add('outgoing_message');
        a.textContent = 'Ссылка на карту.';
        div.appendChild(a);
        return div;
    }
    div.appendChild(p);
    return div;
}

function sendMessage() {
    const input = document.querySelector('.input_message_field')
    const messageText = input.value;
    if (!!messageText) {
        rootEl.appendChild(constructMessage(messageText, 'user'));
        websocket.send(messageText);
        input.value = '';
        smoothScrollToMessage();
    } else {
        input.setAttribute('placeholder', 'Введите сообщение!');
    }
}

function sendGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {coords} = position;
            rootEl.appendChild(constructMessage('', 'geo', coords));
            websocket.send({coords});
            smoothScrollToMessage();
        });
    }
}

function smoothScrollToMessage() {
    const messagesArray = document.querySelectorAll('.text');
    messagesArray[messagesArray.length - 1].scrollIntoView({behavior: 'smooth', block: 'end'});
}