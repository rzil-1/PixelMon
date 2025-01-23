import Phaser, { Scene } from "phaser";

export class HealthBar {
    private scene: Scene;
    private healthBarContainer: Phaser.GameObjects.Container;
    private fullWidth: number; 
    private scaleY: number;
    private leftCap: Phaser.GameObjects.Image;
    private middle: Phaser.GameObjects.Image;
    private rightCap: Phaser.GameObjects.Image;

    /**
     * @param scene - The Phaser Scene.
     * @param x - The x position of the health bar.
     * @param y - The y position of the health bar.
     */
    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.fullWidth = 360 * 0.75; // Scaled width of the health bar
        this.scaleY = 0.65; // Vertical scaling factor

        // Create a container for the health bar parts
        this.healthBarContainer = this.scene.add.container(x, y);

        // Create the health bar images
        this.createHealthBarImages(x, y);

        // Initialize with full health
        this.setMeterPercentage(1);

        this.setMeterPercentageAnimated(0.5);

        this.leftCap = this.scene.add.image(x, y, "healthleft");
        this.leftCap.destroy();
        this.middle = this.scene.add.image(x, y, "healthleft");
        this.middle.destroy();
        this.rightCap = this.scene.add.image(x, y, "healthright");
        this.rightCap.destroy();
    }

    get container() {
        return this.healthBarContainer;
    }

    /**
     * Creates the visual components of the health bar.
     * @param x - The x position.
     * @param y - The y position.
     */
    private createHealthBarImages(x: number, y: number): void {
        this.leftCap = this.scene.add
            .image(x, y, "healthleft")
            .setOrigin(0, 0.5)
            .setScale(1, this.scaleY);

        this.middle = this.scene.add
            .image(this.leftCap.x + this.leftCap.width, y, "healthmid")
            .setOrigin(0, 0.5)
            .setScale(1, this.scaleY);

        this.rightCap = this.scene.add
            .image(this.leftCap.x + this.leftCap.width + this.middle.width, y, "healthright") 
            .setOrigin(0, 0.5)
            .setScale(1, this.scaleY);

        this.healthBarContainer.add([this.leftCap, this.middle, this.rightCap]);

        // ... (rest of the createHealthBarImages function)
    }

    /**
     * Sets the health bar percentage (instantly).
     * @param percent - The percentage of the bar to display (0 to 1).
     */
    setMeterPercentage(percent = 1): void {
        const width = this.fullWidth * percent;
    
        // Update the middle bar's width
        this.middle.displayWidth = width;
    
        // Adjust the right cap's position
        this.rightCap.x = this.middle.x + this.middle.displayWidth;
    }
    
    setMeterPercentageAnimated(
        percent: number,
        options: { duration?: number; callback?: () => void } = {}
    ): void {
        const width = this.fullWidth * percent;

        this.scene.tweens.add({
            targets: this.middle,
            displayWidth: width,
            duration: options.duration || 1000,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.rightCap.x = this.middle.x + this.middle.displayWidth; 
            },
            onComplete: () => {
                if (options.callback) options.callback();
            },
        });
    }
    
    
}
