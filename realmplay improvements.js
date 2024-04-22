// ==UserScript==
// @name         realmplay improvements
// @namespace    http://tampermonkey.net/
// @version      2024.04.22.03
// @description  QoL improvements for reaplmplay.ai
// @author       CttCJim
// @match        https://www.realmplay.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=realmplay.ai
// @grant        none
// @require https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==
//get the latest version of this file from GitHub! https://github.com/CttCJim/RealmPlayImprovements
//Look me up on Patreon if you love this: https://www.patreon.com/CttCJim

(function() {
    'use strict';
    //parameters
    var parameters = { //CHANGE THESE TO YOUR LIKING
        "chat_input_size":4, //size of the chat text input box
        "showConvMargin":"0px", //"show conversations" button top margin
        "chatCardsPaddingTop":"1px", //padding top and bottom for each chat message card
        "chatCardsPaddingBtm":"1px"
    }

    //----------------------//
    var charname = "CttCJim_null_do_not_name_char_this";
    var CttCJimFunctions = window.CttCJimFunctions = {};
    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    }

    function cleanup() {
        console.log('ping');
        //get char portrait
        var isChat = window.location.toString().includes("chat") //ie https://www.realmplay.ai/chat?id=12345
        if(isChat) {
            //get character name and portrait
            /*if(charname=="CttCJim_null_do_not_name_char_this") {
                charname=$("h2:contains('Chat with')").html().replace('Chat with ','');
                var portraitline = $(`p:contains('${charname}')`)[0].parentElement;
                var portrait = $(portraitline).find('img')[0].src; //url of image
            }*/
            //$(".css-9pa8cd").click(function(){ //portrait circle images

            //});

            $('*[placeholder="Write your message here..."]').attr('rows',parameters.chat_input_size);
            /*var inputBox = document.querySelector('*[placeholder="Write your message here..."]');
            //var showConversations = $("button > span:contains('Show Conversations')");
            //make chat input box larger
            if(inputBox!=null) {
                if(inputBox.rows!=4) {
                    inputBox.rows=4;
                }
            }*/
            //make images react to clicks
            $(".css-9pa8cd").css('cursor','pointer');
            $(".css-9pa8cd").off('click');
            $(".css-9pa8cd").on('click', function(){
                console.log(this);
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt;
            });
        }
    }
    CttCJimFunctions.scrollFunction = function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    CttCJimFunctions.topFunction = function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
    //create stylesheet overrides
    var css = `
    ._pt-1316330238 {
	    padding-top: ${parameters.chatCardsPaddingTop}!important;
        padding-bottom: ${parameters.chatCardsPaddingBtm}!important;
    }
    ._mt-1316330331 { margin-top:0px!important; } /* chat box margins */
    ._mt-1316330393 { margin-top:0px!important; }
    ._h-1611761883 { height:30px!important; } /* avatar window height */
    ._mah-1611761883 { max-height:30px!important; } /* avatar window height */
    ._mih-1611761883 { min-height:30px!important; } /* avatar window height */
    ._pt-1481558214 { padding-top:1px!important; } /* chat lines and chat titles */
    ._pb-1481558214 { padding-bottom:1px!important; } /* chat lines and chat titles */
    ._mt-1316330238 { margin-top:0!important; } /* top banner top margin */
    ._mih-70vh { min-height:50vh!important; } /* main chat window */
    ._mah-70vh { max-height:50vh!important; } /* main chat window */
    #CttCJimTopBtn {
        display: none; /* Hidden by default */
        position: fixed; /* Fixed/sticky position */
        bottom: 20px; /* Place the button at the bottom of the page */
        right: 30px; /* Place the button 30px from the right */
        z-index: 99; /* Make sure it does not overlap */
        border: none; /* Remove borders */
        outline: none; /* Remove outline */
        background-color: darkgreen; /* Set a background color */
        color: white; /* Text color */
        cursor: pointer; /* Add a mouse pointer on hover */
        padding: 5px; /* Some padding */
        border-radius: 5px; /* Rounded corners */
        font-size: 18px; /* Increase font size */
    }

    #CttCJimTopBtn:hover {
        background-color: #555; /* Add a dark-grey background on hover */
    }

    #img01 {
        height:75vh;width:auto;cursor:pointer;
    }

    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
    }

    /* Modal Content (Image) */
    .modal-content {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
    }

    /* Caption of Modal Image (Image Text) - Same Width as the Image */
    #caption {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: 150px;
    }

    /* Add Animation - Zoom in the Modal */
    .modal-content, #caption {
        animation-name: zoom;
        animation-duration: 0.6s;
    }

    @keyframes zoom {
        from {transform:scale(0)}
        to {transform:scale(1)}
    }

    /* The Close Button */
    .close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
    }

    .close:hover,
        .close:focus {
            color: #bbb;
            text-decoration: none;
            cursor: pointer;
        }

    /* 100% Image Width on Smaller Screens */
    @media only screen and (max-width: 700px){
        .modal-content {
            width: 100%;
        }
    }
    `,
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    //------------//
    //create button for top scroll
    //KNOWN BUG: The body has a class of .desktop-class which has a transform:scale CSS property, so the position:fixed tag on the top button WILL NOT WORK.
    //Undecided whether to remove this scaling as it makes teh top menu fit the window better.
    var btnhtml = `<button onclick="CttCJimFunctions.topFunction()" id="CttCJimTopBtn" title="Go to top">Top</button>`;
    document.body.appendChild(createElementFromHTML(btnhtml));
    // Get the button:
    let mybutton = document.getElementById("CttCJimTopBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = CttCJimFunctions.scrollFunction;

    //on image click, show the image
    //create modal
    var mdlhtml = `
    <div id="CttCJimModal" class="modal">

      <!-- The Close Button -->
      <span class="close">&times;</span>

      <!-- Modal Content (The Image) -->
      <img class="modal-content" id="img01">

      <!-- Modal Caption (Image Text) -->
      <div id="caption"></div>
    </div>
    `;
    document.body.appendChild(createElementFromHTML(mdlhtml));
    window.modal = document.getElementById('CttCJimModal');
    window.modalImg = document.getElementById("img01");
    window.captionText = document.getElementById("caption");
    window.span = document.getElementsByClassName("close")[0];
    window.span.onclick=function(){window.modal.style.display = "none";};
    $("#img01").click(function(){window.modal.style.display = "none";});

    setInterval(cleanup,1000);
})();
