<script setup>
import compmsg from '../components/compmsg.vue'
import {createApp, ref} from 'vue';
</script>

<script>
let msgCount = 0;
let chanMSG = "";
const usrMessage = ref("");

window.electronAPI.onMessage((name, msg, pfp, imageLink) => {
    const time = new Date();
    const timeFormat = time.getHours() + ":" + time.getMinutes();

    const msgId = `MSGBOX_${msgCount}`;
    const msgBox = createApp(compmsg, {
        Name: name,
        message: msg,
        pfpImg: pfp,
        Time: timeFormat,
        image: imageLink
    });
    console.log(imageLink)
    const msgContainer = document.createElement('div');
    msgContainer.id = msgId;
    const msgCanva = document.getElementById("msgCanva");
    msgCanva.appendChild(msgContainer);
    msgBox.mount(`#${msgId}`);
    msgCount++;
    msgCanva.scrollTop = msgCanva.scrollHeight;
})

window.electronAPI.loginUpdate((result, chanID, name) => {
    chanMSG = chanID + " | " + name
});

function sendMessage() {
    window.electronAPI.sendMessage(usrMessage.value);
    usrMessage.value = ""
}

function reset () {
    var msgContainer = document.getElementById("msgCanva");
    msgContainer.innerHTML = '';
    msgCount = 0;

}

function sendImage() {
    
}

</script>

<template>
    <body class="bg-stone-950">
        <div class="flex flex-col w-screen h-screen">
            <div class="h-10 flex items-center bg-stone-700">
                <div class="mx-4">
                    <p class=" text-center font-bold text-white">
                        {{ chanMSG }}</p>
                </div>
            </div>

            <div class=" flex-1 overflow-auto no-scrollbar w-full" id="msgCanva">
            </div>

            <div class="h-12 flex flex-row bg-stone-700 rounded-t-xl justify-center items-center">
                <div class="flex-1 mx-4 flex-row w-full h-full justify-center items-center">
                    <input v-model="usrMessage" class="m-2 p-2 text-white bg-stone-800 w-full h-2/3 rounded-xl"
                        placeholder="Text Here" @keypress.enter="sendMessage()" id="textBox"/>
                </div>
                <div class="grid grid-cols-3 w-36 mx-2">
                    <div class="w-9 h-9 bg-stone-800 hover:bg-stone-900 rounded-xl 
                    flex items-center justify-center">
                        <button v-on:click="sendMessage()">
                            <span class="material-symbols-rounded text-2xl" style="color: white;">send</span>
                        </button>
                    </div>

                    <div class="w-9 h-9 bg-stone-800 hover:bg-stone-900 rounded-xl 
                    flex items-center justify-center">
                        <button v-on:click="reset()">
                            <span class="text-2xl">✨</span>
                        </button>
                    </div>

                    <div class="w-9 h-9 bg-stone-800 hover:bg-stone-900 rounded-xl 
                    flex items-center justify-center">
                        <button>
                            <span class="material-symbols-rounded text-2xl" style="color: white;">add_circle</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </body>
</template>