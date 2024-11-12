<template>
    <div class="settings-component">
        <button class="btn btn-primary" type="button" onclick="configs.showModal()">
            <Icon name="lucide:settings" class="icon" />
        </button>

        <dialog id="configs" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Configurações</h3>
                <p class="py-4">Press ESC key or click the button below to close</p>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    </div>
</template>
