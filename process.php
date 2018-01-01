<?php
/**
 * Created by PhpStorm.
 * User: Kaan
 * Date: 2017-12-31
 * Time: 12:42 PM
 */

    define("CHAT_LOG_NAME", "chatLog.txt");

    $processName = $_POST['processName'];

    $stateInfo = array();

    if($processName == "getChatState"){
        $stateInfo['lineCount'] = getFileLineCount();
    }elseif ($processName == "updateChat"){
        $text = array();
        $previousState = $_POST['state'];
        $currentState = getFileLineCount();
        if($currentState > $previousState){
            $stateInfo['lineCount'] = getFileLineCount();
            if(file_exists(CHAT_LOG_NAME)){
                $file = file(CHAT_LOG_NAME);
                for($i = $previousState; $i <= $currentState; $i++){
                    $line = str_replace("\n", "", $file[$i]);
                    $text[$i - $previousState] = $line;
                }
                $stateInfo['text'] = $text;
            }
        }else{
            $stateInfo['text'] = false;
            $stateInfo['lineCount'] = $previousState;
        }
    }elseif ($processName == "sendChat"){$username = htmlentities(strip_tags($_POST['username']));
        $message = htmlentities(strip_tags($_POST['message']));
        if(file_exists(CHAT_LOG_NAME) && ($message != "")) {
            $fileStream = fopen(CHAT_LOG_NAME, "a");
            fwrite($fileStream, "<span>" . $username . "</span>" . ": " . $message . "\n");
            fclose($fileStream);
        }
    }

    echo json_encode($stateInfo);

    function getFileLineCount(){
        $lineCount = 0;
        if(file_exists(CHAT_LOG_NAME)) {
            $lineCount = count(file(CHAT_LOG_NAME));
        }
        return $lineCount - 1;
    }
?>