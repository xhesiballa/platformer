/* game namespace */
var game = {
    /**
     * an object where to store game global data
     */
    data: {
        score: 0
    },

    // Run on page load.
    onload: function () {
        // Initialize the video.
        if (!me.video.init(640, 480, { parent: "screen", scale: "auto", scaleMethod: "flex-width" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set all ressources to be loaded
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    loaded: function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // register our player entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        // map X, Up Arrow and Space for jump
        me.input.bindKey(me.input.KEY.X, "jump", true);
        me.input.bindKey(me.input.KEY.UP, "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

        // start the game
        me.state.change(me.state.PLAY);
    }
};