<template>
    <div class="h-screen w-screen flex justify-center items-center 
    bg-gradient-to-tr from-[#000055] to-[#0092FF]">
        <div class="border rounded-xl flex justify-center bg-opacity-40 bg-black">
            <div class="m-4 grid gap-4 grid-rows-4">
                <h1 class="text-white text-center text-xl">Bot Login</h1>
                <input class="rounded-xl" id="token" type="password" placeholder="Discord Bot Token" />
                <input class="rounded-xl" id="channelID" type="text" placeholder="Channel ID" />
                <button @click="loginSend" class="text-white border rounded-xl">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        loginSend() {
            var token = document.getElementById('token').value;
            var chanID = document.getElementById('channelID').value;
            window.electronAPI.login(token, chanID)
        }
    }
}

</script>