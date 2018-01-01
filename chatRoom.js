/* ---------------------- ON STARTUP ------------------------*/
$(document).ready(function () {
    // ask user for name with popup prompt
    var name = prompt("Enter your chat name:", "Guest");

    // default name is 'Guest'
    if (!name || name === ' ') {
        name = "Guest";
    }

    // strip tags
    name = name.replace(/(<([^>]+)>)/ig,"");

    // display name on page
    $("#name-area").html("Your username: <span>" + name + "</span>");

    // start chat
    var chat =  new Chat();

    $(function() {

        chat.getState();

        // watch textarea for key presses
        $("#sendie").keydown(function(event) {

            var key = event.which;

            //all keys including return.
            if (key >= 33) {

                var maxLength = $(this).attr("maxlength");
                var length = this.value.length;

                // don't allow new content if length is maxed out
                if (length >= maxLength) {
                    event.preventDefault();
                }
            }
        });
        // watch textarea for release of key press
        $('#sendie').keyup(function(e) {

            if (e.keyCode == 13) {

                var text = $(this).val();
                var maxLength = $(this).attr("maxlength");
                var length = text.length;

                // send
                if (length <= maxLength + 1) {
                    chat.send(text, name);
                    $(this).val("");
                } else {
                    $(this).val(text.substring(0, maxLength));
                }
            }
        });

        $('body').ready(setInterval(chat.update, 1000));
    });
});

var inProcess = false;
var state;
var txtFile;

function Chat(){
    this.update = updateChat;
    this.send = sendChat;
    this.getState = getChatState;
};

function getChatState() {
    if (!inProcess) {
        inProcess = true;
        $.ajax({
            type: "POST",
            url: "process.php",
            data: {
                'processName': 'getChatState',
                'file': txtFile
            },
            dataType: "json",
            success: function (serverResp) {
                state = serverResp.lineCount;
                inProcess = false;
            }
        })
    }
}

function updateChat() {
    if (!inProcess) {
        inProcess = true;
        $.ajax({
            type: "POST",
            url: "process.php",
            data: {
                'processName': 'updateChat',
                'state': state, /*this is used to determine if there is a difference in current state and actual state*/
                'file': txtFile
            },
            dataType: "json",
            success: function (serverResp) {
                if (serverResp.text) {
                    for (var i = 0; i < serverResp.text.length; i++) {
                        console.log(serverResp.text[i]);
                        $('#chatText').append("<p>" + serverResp.text[i] + "</p>");
                    }
                }
                document.getElementById('chatText').scrollTop = document.getElementById('chatText').scrollHeight;
                state = serverResp.lineCount;
                inProcess = false;
            },
        });
    } else {
        setTimeout(updateChat, 1500);
    }
}

function sendChat(message, username) {
    updateChat();
    $.ajax({
        type: "POST",
        url: "process.php",
        data: {
            'processName': 'sendChat',
            'message': message,
            'timestamp': Date.now().toString(),
            'username': username,
            'file': txtFile
        },
        dataType: "json",
        success: function (serverResp) {
            updateChat();
        }

    });
}

