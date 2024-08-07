// FastBow Script for Rise Client

module FastBow {
    // Adjustable speed setting, increased maximum speed
    setting speed 20;
    var tickCounter = 0;

    // Function to initialize the script
    function onEnable() {
        // Register the event listener for player updates
        EventManager.register(this);
    }

    // Function to handle the player update event
    function onUpdate() {
        // Check if the player is holding a bow
        if (mc.thePlayer.inventory.getCurrentItem() != null && mc.thePlayer.inventory.getCurrentItem().getItem() instanceof ItemBow) {
            // Check if the bow is being drawn
            if (mc.thePlayer.isUsingItem()) {
                tickCounter++;
                // Only send packets every few ticks to simulate more natural usage
                if (tickCounter >= (20 / setting.speed)) {
                    tickCounter = 0;
                    // Send packets in a way that mimics natural behavior
                    mc.thePlayer.sendQueue.addToSendQueue(new C03PacketPlayer(true));
                    mc.thePlayer.sendQueue.addToSendQueue(new C08PacketPlayerBlockPlacement(mc.thePlayer.inventory.getCurrentItem()));
                    mc.thePlayer.stopUsingItem();
                }
            }
        }
    }

    // Function to clean up when the script is disabled
    function onDisable() {
        // Unregister the event listener
        EventManager.unregister(this);
        tickCounter = 0;
    }
}
