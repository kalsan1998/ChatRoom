<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Kaan's Chat Room</title>
    <link rel="stylesheet" href="chatStyle.css"/>
    <link rel="icon" href="img/chat.ico"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="chatRoom.js"></script>

</head>
<body>
    <div id="github">
        <a href="https://github.com/kalsan1998/ChatRoom"><img id="githubIcon" src="img/github-2048-black.png"/>GitHub Link</a>
    </div>

    <div id="container">

        <h2 id="header">Chat Room Made with jQuery and PHP</h2>

        <p id="name-area"></p>

        <div id="chatText"></div>

        <form id="send-message-area">
            <p>Your message: </p>
            <textarea id="sendie" maxlength = '260'></textarea>
        </form>

    </div>
</body>
</html>