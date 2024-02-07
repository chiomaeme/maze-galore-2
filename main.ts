namespace SpriteKind {
    export const Guide = SpriteKind.create()
    export const Weapon = SpriteKind.create()
    export const Portal1 = SpriteKind.create()
    export const Chest = SpriteKind.create()
    export const level2Enemies = SpriteKind.create()
    export const Life = SpriteKind.create()
    export const Portal2 = SpriteKind.create()
    export const level3Enemies = SpriteKind.create()
    export const Teleporter = SpriteKind.create()
    export const Portal3 = SpriteKind.create()
    export const KeyToWorld = SpriteKind.create()
    export const Portal3Key = SpriteKind.create()
    export const HomePortal = SpriteKind.create()
    export const Gabriella = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(otherSprite, assets.tile`myTile`)
    info.changeLifeBy(-1)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(1)
    spawnHeart()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal1, function (sprite, otherSprite) {
    if (portalOpen == 1) {
        weaponCollected = 0
        game.splash("You beat level 1")
        sprites.destroyAllSpritesOfKind(SpriteKind.Portal1)
        sprites.destroyAllSpritesOfKind(SpriteKind.Guide)
        sprites.destroyAllSpritesOfKind(SpriteKind.Food)
        tilemap_level2 = tilemap`level18`
        tiles.setCurrentTilemap(tilemap_level2)
        current_tilemap = tilemap_level2
        game.splash("Find the Treasure...")
        tiles.placeOnRandomTile(Ninja, assets.tile`startingTile`)
        treasureChest = sprites.create(assets.image`TreasureChest`, SpriteKind.Chest)
        tiles.placeOnRandomTile(treasureChest, assets.tile`coinLoc`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Weapon, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    weaponCollected = 1
    game.splash("Weapon Collected")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.HomePortal, function (sprite, otherSprite) {
    if (portalOpen == 1) {
        sprites.destroy(otherSprite)
        tiles.setCurrentTilemap(tilemap_level1)
        current_tilemap = tilemap_level1
        Render.setViewMode(ViewMode.raycastingView)
        game.splash("Welcome Back")
        game.splash("Find Gabriella!!")
        gaby = sprites.create(img`
            . f f f . f f f f . f f f . 
            f f f f f c c c c f f f f f 
            f f f f b c c c c b f f f f 
            f f f c 3 c c c c 3 c f f f 
            . f 3 3 c c c c c c 3 3 f . 
            . f c c c c 4 4 c c c c f . 
            . f f c c 4 4 4 4 c c f f . 
            . f f f b f 4 4 f b f f f . 
            . f f 4 1 f d d f 1 4 f f . 
            . . f f d d d d d d f f . . 
            . . e f e 4 4 4 4 e f e . . 
            . e 4 f b 3 3 3 3 b f 4 e . 
            . 4 d f 3 3 3 3 3 3 c d 4 . 
            . 4 4 f 6 6 6 6 6 6 f 4 4 . 
            . . . . f f f f f f . . . . 
            . . . . f f . . f f . . . . 
            `, SpriteKind.Gabriella)
        tiles.placeOnRandomTile(gaby, assets.tile`coinLoc`)
    } else {
        game.splash("You do not have a key!")
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Guide, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    game.splash("You have collected this many coins: ", CoinCollected)
})
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (location.column == 6 && location.row == 16) {
        if (CoinCollected >= 15) {
            tiles.setWallAt(tiles.getTileLocation(6, 16), false)
            CoinCollected = 0
            game.splash("Find The Rest Of The Coins")
        } else {
            game.splash("You do not have enough coins")
            game.splash("You need this many more:", 15 - CoinCollected)
        }
    }
    if (location.column == 13 && location.row == 21) {
        if (CoinCollected >= 10) {
            tiles.setWallAt(tiles.getTileLocation(13, 21), false)
            game.splash("Collect Weapon")
            game.splash("Enemy Incoming", "Watch Your Lives")
            info.setLife(5)
            level1Boss = sprites.create(img`
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff1111ff........
                .......fb111111bf.......
                .......f11111111f.......
                ......fd11111111df......
                ......fd11111111df......
                ......fddd1111dddf......
                ......fbdbfddfbdbf......
                ......fcdcf11fcdcf......
                .......fb111111bf.......
                ......fffcdb1bdffff.....
                ....fc111cbfbfc111cf....
                ....f1b1b1ffff1b1b1f....
                ....fbfbffffffbfbfbf....
                .........ffffff.........
                ...........fff..........
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.Enemy)
            enemyStatus = statusbars.create(20, 4, StatusBarKind.Health)
            enemyStatus.attachToSprite(level1Boss)
            enemyStatus.positionDirection(CollisionDirection.Top)
            enemyStatus.value = 100
            level1Boss.follow(Ninja, 25)
            tiles.placeOnRandomTile(level1Boss, assets.tile`myTile`)
        } else {
            game.splash("You do not have enough coins")
            game.splash("You need this many more:", 10 - CoinCollected)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gabriella, function (sprite, otherSprite) {
    game.splash("Congrats on Finding Gabriella!")
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.KeyToWorld, function (sprite, otherSprite) {
    game.showLongText("Key Collected", DialogLayout.Bottom)
    game.splash("Key Collected")
    sprites.destroy(otherSprite)
    portalOpen = 1
})
info.onCountdownEnd(function () {
    game.splash("Try Again")
    tiles.placeOnRandomTile(Ninja, assets.tile`startingTile`)
    info.startCountdown(30)
})
function createEnemies () {
    enemyTeamMember = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f 2 2 2 2 2 2 f . . . 
        . . . . f 2 2 2 2 2 2 2 2 f . . 
        . . . f 2 2 2 2 f f f f f f . . 
        . f f f 2 2 2 f 9 9 9 9 9 9 f . 
        f 2 2 f 2 2 f 9 9 9 9 9 9 9 9 f 
        f 2 2 f 2 2 f 9 9 9 9 9 9 9 9 f 
        f 2 2 f 2 2 f 9 9 9 9 9 9 9 9 f 
        f 2 2 f 2 2 2 f 9 9 9 9 9 9 f . 
        f 2 2 f 2 2 2 2 f f f f f f f . 
        f 2 2 f 2 2 2 2 2 2 2 2 2 2 f . 
        f 2 2 f 2 2 2 2 2 2 2 2 2 2 f . 
        . f f f 2 2 2 f f f f 2 2 2 f . 
        . . . f 2 2 2 f . . f 2 2 2 f . 
        . . . f 2 2 2 f . . f 2 2 2 f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember, tiles.getTileLocation(4, 4))
    enemyTeamMember.setVelocity(35, 0)
    enemyTeamMember.setBounceOnWall(true)
    enemyTeamMember2 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f 3 3 3 3 3 3 f . . . 
        . . . . f 3 3 3 3 3 3 3 3 f . . 
        . . . f 3 3 3 3 f f f f f f . . 
        . f f f 3 3 3 f 9 9 9 9 9 9 f . 
        f 3 3 f 3 3 f 9 9 9 9 9 9 9 9 f 
        f 3 3 f 3 3 f 9 9 9 9 9 9 9 9 f 
        f 3 3 f 3 3 f 9 9 9 9 9 9 9 9 f 
        f 3 3 f 3 3 3 f 9 9 9 9 9 9 f . 
        f 3 3 f 3 3 3 3 f f f f f f f . 
        f 3 3 f 3 3 3 3 3 3 3 3 3 3 f . 
        f 3 3 f 3 3 3 3 3 3 3 3 3 3 f . 
        . f f f 3 3 3 f f f f 3 3 3 f . 
        . . . f 3 3 3 f . . f 3 3 3 f . 
        . . . f 3 3 3 f . . f 3 3 3 f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember2, tiles.getTileLocation(3, 6))
    enemyTeamMember2.setVelocity(75, 0)
    enemyTeamMember2.setBounceOnWall(true)
    enemyTeamMember3 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f 4 4 4 4 4 4 f . . . 
        . . . . f 4 4 4 4 4 4 4 4 f . . 
        . . . f 4 4 4 4 f f f f f f . . 
        . f f f 4 4 4 f 9 9 9 9 9 9 f . 
        f 4 4 f 4 4 f 9 9 9 9 9 9 9 9 f 
        f 4 4 f 4 4 f 9 9 9 9 9 9 9 9 f 
        f 4 4 f 4 4 f 9 9 9 9 9 9 9 9 f 
        f 4 4 f 4 4 4 f 9 9 9 9 9 9 f . 
        f 4 4 f 4 4 4 4 f f f f f f f . 
        f 4 4 f 4 4 4 4 4 4 4 4 4 4 f . 
        f 4 4 f 4 4 4 4 4 4 4 4 4 4 f . 
        . f f f 4 4 4 f f f f 4 4 4 f . 
        . . . f 4 4 4 f . . f 4 4 4 f . 
        . . . f 4 4 4 f . . f 4 4 4 f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember3, tiles.getTileLocation(16, 1))
    enemyTeamMember3.setVelocity(0, 65)
    enemyTeamMember3.setBounceOnWall(true)
    enemyTeamMember4 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f 5 5 5 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 5 5 f . . 
        . . . f 5 5 5 5 f f f f f f . . 
        . f f f 5 5 5 f 9 9 9 9 9 9 f . 
        f 5 5 f 5 5 f 9 9 9 9 9 9 9 9 f 
        f 5 5 f 5 5 f 9 9 9 9 9 9 9 9 f 
        f 5 5 f 5 5 f 9 9 9 9 9 9 9 9 f 
        f 5 5 f 5 5 5 f 9 9 9 9 9 9 f . 
        f 5 5 f 5 5 5 5 f f f f f f f . 
        f 5 5 f 5 5 5 5 5 5 5 5 5 5 f . 
        f 5 5 f 5 5 5 5 5 5 5 5 5 5 f . 
        . f f f 5 5 5 f f f f 5 5 5 f . 
        . . . f 5 5 5 f . . f 5 5 5 f . 
        . . . f 5 5 5 f . . f 5 5 5 f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember4, tiles.getTileLocation(6, 20))
    enemyTeamMember4.setVelocity(0, 35)
    enemyTeamMember4.setBounceOnWall(true)
    enemyTeamMember5 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f 6 6 6 6 6 6 f . . . 
        . . . . f 6 6 6 6 6 6 6 6 f . . 
        . . . f 6 6 6 6 f f f f f f . . 
        . f f f 6 6 6 f 9 9 9 9 9 9 f . 
        f 6 6 f 6 6 f 9 9 9 9 9 9 9 9 f 
        f 6 6 f 6 6 f 9 9 9 9 9 9 9 9 f 
        f 6 6 f 6 6 f 9 9 9 9 9 9 9 9 f 
        f 6 6 f 6 6 6 f 9 9 9 9 9 9 f . 
        f 6 6 f 6 6 6 6 f f f f f f f . 
        f 6 6 f 6 6 6 6 6 6 6 6 6 6 f . 
        f 6 6 f 6 6 6 6 6 6 6 6 6 6 f . 
        . f f f 6 6 6 f f f f 6 6 6 f . 
        . . . f 6 6 6 f . . f 6 6 6 f . 
        . . . f 6 6 6 f . . f 6 6 6 f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember5, tiles.getTileLocation(18, 8))
    enemyTeamMember5.setVelocity(55, 0)
    enemyTeamMember5.setBounceOnWall(true)
    enemyTeamMember6 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f 7 7 7 7 7 7 f . . . 
        . . . . f 7 7 7 7 7 7 7 7 f . . 
        . . . f 7 7 7 7 f f f f f f . . 
        . f f f 7 7 7 f 9 9 9 9 9 9 f . 
        f 7 7 f 7 7 f 9 9 9 9 9 9 9 9 f 
        f 7 7 f 7 7 f 9 9 9 9 9 9 9 9 f 
        f 7 7 f 7 7 f 9 9 9 9 9 9 9 9 f 
        f 7 7 f 7 7 7 f 9 9 9 9 9 9 f . 
        f 7 7 f 7 7 7 7 f f f f f f f . 
        f 7 7 f 7 7 7 7 7 7 7 7 7 7 f . 
        f 7 7 f 7 7 7 7 7 7 7 7 7 7 f . 
        . f f f 7 7 7 f f f f 7 7 7 f . 
        . . . f 7 7 7 f . . f 7 7 7 f . 
        . . . f 7 7 7 f . . f 7 7 7 f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember6, tiles.getTileLocation(21, 19))
    enemyTeamMember6.setVelocity(0, 55)
    enemyTeamMember6.setBounceOnWall(true)
    enemyTeamMember7 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f a a a a a a f . . . 
        . . . . f a a a a a a a a f . . 
        . . . f a a a a f f f f f f . . 
        . f f f a a a f 9 9 9 9 9 9 f . 
        f a a f a a f 9 9 9 9 9 9 9 9 f 
        f a a f a a f 9 9 9 9 9 9 9 9 f 
        f a a f a a f 9 9 9 9 9 9 9 9 f 
        f a a f a a a f 9 9 9 9 9 9 f . 
        f a a f a a a a f f f f f f f . 
        f a a f a a a a a a a a a a f . 
        f a a f a a a a a a a a a a f . 
        . f f f a a a f f f f a a a f . 
        . . . f a a a f . . f a a a f . 
        . . . f a a a f . . f a a a f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember7, tiles.getTileLocation(6, 12))
    enemyTeamMember7.setVelocity(0, 35)
    enemyTeamMember7.setBounceOnWall(true)
    enemyTeamMember8 = sprites.create(img`
        . . . . . . f f f f f f . . . . 
        . . . . . f e e e e e e f . . . 
        . . . . f e e e e e e e e f . . 
        . . . f e e e e f f f f f f . . 
        . f f f e e e f 9 9 9 9 9 9 f . 
        f e e f e e f 9 9 9 9 9 9 9 9 f 
        f e e f e e f 9 9 9 9 9 9 9 9 f 
        f e e f e e f 9 9 9 9 9 9 9 9 f 
        f e e f e e e f 9 9 9 9 9 9 f . 
        f e e f e e e e f f f f f f f . 
        f e e f e e e e e e e e e e f . 
        f e e f e e e e e e e e e e f . 
        . f f f e e e f f f f e e e f . 
        . . . f e e e f . . f e e e f . 
        . . . f e e e f . . f e e e f . 
        . . . . f f f . . . . f f f . . 
        `, SpriteKind.level2Enemies)
    tiles.placeOnTile(enemyTeamMember8, tiles.getTileLocation(1, 15))
    enemyTeamMember8.setVelocity(45, 0)
    enemyTeamMember8.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Chest, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    game.splash("Find The Door!!", "Watch Out For Enemies!")
    game.splash("Extra hearts have spawned...", "You might need them later")
    createEnemies()
    spawnHeart()
    portal2 = sprites.create(img`
        fffffffffffffffff
        f666666666666666f
        f6ff8888f8888ff6f
        f6f66666f66666f6f
        f6862666f6662686f
        f6822226f6222286f
        f6862666f6662686f
        f6866ff6f66ff686f
        f686f66ff6f66f86f
        f686f66ff6666f86f
        f686f66ff666f686f
        f686f66ff66f6686f
        f6811ff1f1ffff86f
        f6866666ff666686f
        f68666666fff6686f
        f6811111111f1186f
        f6811111111f1186f
        f6866666666f6686f
        f6811111111f1186f
        f6866666666f6686f
        f6811111111f1186f
        f6811111111f1186f
        f6811111111f1186f
        f688888888fff886f
        `, SpriteKind.Portal2)
    tiles.placeOnRandomTile(portal2, assets.tile`myTile`)
    if (info.life() < 3) {
        info.setLife(3)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal3Key, function (sprite, otherSprite) {
    game.splash("Key Collected")
    sprites.destroy(otherSprite)
    portalOpen = 1
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal2, function (sprite, otherSprite) {
    game.splash("You beat Level 2")
    game.splash("You have 45 seconds to get to door 3!", "Watch out for trip wire")
    game.splash("Watch Your lives")
    info.startCountdown(45)
    sprites.destroyAllSpritesOfKind(SpriteKind.Portal2)
    sprites.destroyAllSpritesOfKind(SpriteKind.level2Enemies)
    sprites.destroyAllSpritesOfKind(SpriteKind.Life)
    tilemap_level3 = tilemap`level4`
    tiles.setCurrentTilemap(tilemap_level3)
    current_tilemap = tilemap_level3
    tiles.placeOnRandomTile(Ninja, assets.tile`startingTile`)
    portal3 = sprites.create(img`
        fffffffffffffffff
        f666666666666666f
        f6ff8888f8888ff6f
        f6f66666f66666f6f
        f6862666f6662686f
        f6822226f6222286f
        f6862666f6662686f
        f6866ff6f66ff686f
        f686f66ff6f66f86f
        f686f66ff6666f86f
        f686f66ff66fff86f
        f686f66ff6666f86f
        f6811ff1f1fff186f
        f6866666ff666686f
        f68666666fff6686f
        f6811111111f1186f
        f6811111111f1186f
        f6866666666f6686f
        f6811111111f1186f
        f6866666666f6686f
        f6811111111f1186f
        f6811111111f1186f
        f6811111111f1186f
        f688888888fff886f
        `, SpriteKind.Portal3)
    tiles.placeOnRandomTile(portal3, assets.tile`myTile`)
    portalOpen = 0
    for (let value of tiles.getTilesByType(assets.tile`coinLoc`)) {
        gus = sprites.create(img`
            . . . . . . f f f f f f . . . . 
            . . . . . f e e e e e e f . . . 
            . . . . f e e e e e e e e f . . 
            . . . f e e e e f f f f f f . . 
            . f f f e e e f 9 9 9 9 9 9 f . 
            f e e f e e f 9 9 9 9 9 9 9 9 f 
            f e e f e e f 9 9 9 9 9 9 9 9 f 
            f e e f e e f 9 9 9 9 9 9 9 9 f 
            f e e f e e e f 9 9 9 9 9 9 f . 
            f e e f e e e e f f f f f f f . 
            f e e f e e e e e e e e e e f . 
            f e e f e e e e e e e e e e f . 
            . f f f e e e f f f f e e e f . 
            . . . f e e e f . . f e e e f . 
            . . . f e e e f . . f e e e f . 
            . . . . f f f . . . . f f f . . 
            `, SpriteKind.level3Enemies)
        tiles.placeOnTile(gus, value)
        gus.vx = 50
        gus.setBounceOnWall(true)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        tripwire = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Teleporter)
        tiles.placeOnTile(tripwire, value)
    }
    portal3Key = sprites.create(img`
        ........................
        ........................
        ....fff.................
        ...f118ff...............
        ..f188881f..............
        .f188f8881fffffffffffff.
        .f88f1f8888888888888811f
        .f88f1f888888888888f888f
        .f888f8888fffffff8f.f88f
        ..f888881f......f8f.f81f
        ...f881ff........f...ff.
        ....fff.................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Portal3Key)
    tiles.placeOnRandomTile(portal3Key, assets.tile`enemyLoc`)
})
function spawnHeart () {
    mySprite = sprites.create(img`
        ....................
        ....................
        ....ffff...ffff.....
        ...f2222f.f2222f....
        ..f222222f222222f...
        .f222222222222222f..
        .f222222222222222f..
        .f222222222222222f..
        .f222222222222222f..
        .f222222222222222f..
        .f222222222222222f..
        ..f2222222222222f...
        ...f22222222222f....
        ....f222222222f.....
        .....f2222222f......
        ......f22222f.......
        .......f222f........
        ........f2f.........
        ........f2f.........
        .........f..........
        `, SpriteKind.Life)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (weaponCollected == 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . . . f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Ninja, 50, 50)
        projectile.follow(level1Boss, 50)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
        pause(750)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.level2Enemies, function (sprite, otherSprite) {
    game.splash("Respawn")
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(sprite, assets.tile`startingTile`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.level3Enemies, function (sprite, otherSprite) {
    game.splash("Respawn")
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(sprite, assets.tile`startingTile`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite, location) {
    if (current_tilemap == tilemap_level4) {
        Ninja.sayText("DIG HERE WITH 'B'", 1000, false)
        if (controller.B.isPressed()) {
            key = sprites.create(img`
                ........................
                ........................
                ....fff.................
                ...f118ff...............
                ..f188881f..............
                .f188f8881fffffffffffff.
                .f88f1f8888888888888811f
                .f88f1f888888888888f888f
                .f888f8888fffffff8f.f88f
                ..f888881f......f8f.f81f
                ...f881ff........f...ff.
                ....fff.................
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.KeyToWorld)
            tiles.placeOnTile(key, tiles.getTileLocation(location.column + 1, location.row + 1))
            portal = sprites.create(img`
                fffffffffffffffff
                f666666666666666f
                f6ff8888f8888ff6f
                f6f66666f66666f6f
                f6862666f6662686f
                f6822226f6222286f
                f6862666f6662686f
                f6866ff6f66ff686f
                f686f66ff6f6f686f
                f686f66ff666f686f
                f686f66ff666f686f
                f686f66ff666f686f
                f6811ff1f1ffff86f
                f6866666ff666686f
                f68666666fff6686f
                f6811111111f1186f
                f6811111111f1186f
                f6866666666f6686f
                f6811111111f1186f
                f6866666666f6686f
                f6811111111f1186f
                f6811111111f1186f
                f6811111111f1186f
                f688888888fff886f
                `, SpriteKind.HomePortal)
            tiles.placeOnRandomTile(portal, assets.tile`enemyLoc`)
            game.showLongText("FIND PORTAL TO WORLD", DialogLayout.Full)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal3, function (sprite, otherSprite) {
    info.stopCountdown()
    if (portalOpen == 1) {
        sprites.destroy(otherSprite)
        sprites.destroyAllSpritesOfKind(SpriteKind.level3Enemies)
        sprites.destroyAllSpritesOfKind(SpriteKind.Teleporter)
        game.splash("Almost at the end!")
        Render.setViewMode(ViewMode.tilemapView)
        portalOpen = 0
        tilemap_level4 = tilemap`level2`
        tiles.setCurrentTilemap(tilemap_level4)
        current_tilemap = tilemap_level4
        tiles.placeOnRandomTile(Ninja, assets.tile`startingTile`)
        game.splash("Oh no, I've entered a different dimension")
        game.splash("Find Your Way Back!!")
        level4Player = 0
    } else {
        game.splash("You got to the door but...", "Door is locked")
        tiles.placeOnRandomTile(Ninja, assets.tile`startingTile`)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    enemyStatus.value += -5
    if (enemyStatus.value <= 0) {
        sprites.destroy(otherSprite)
        portalOpen = 1
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
        game.splash("You killed him!!!")
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    CoinCollected += 1
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Teleporter, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(sprite, assets.tile`startingTile`)
})
let level4Player = 0
let key: Sprite = null
let tilemap_level4: tiles.TileMapData = null
let projectile: Sprite = null
let mySprite: Sprite = null
let portal3Key: Sprite = null
let tripwire: Sprite = null
let gus: Sprite = null
let portal3: Sprite = null
let tilemap_level3: tiles.TileMapData = null
let portal2: Sprite = null
let enemyTeamMember8: Sprite = null
let enemyTeamMember7: Sprite = null
let enemyTeamMember6: Sprite = null
let enemyTeamMember5: Sprite = null
let enemyTeamMember4: Sprite = null
let enemyTeamMember3: Sprite = null
let enemyTeamMember2: Sprite = null
let enemyTeamMember: Sprite = null
let enemyStatus: StatusBarSprite = null
let level1Boss: Sprite = null
let gaby: Sprite = null
let treasureChest: Sprite = null
let tilemap_level2: tiles.TileMapData = null
let weaponCollected = 0
let portalOpen = 0
let portal: Sprite = null
let guide: Sprite = null
let coin: Sprite = null
let CoinCollected = 0
let Ninja: Sprite = null
let current_tilemap: tiles.TileMapData = null
let tilemap_level1: tiles.TileMapData = null
game.splash("This is Maze Galore 2.0...", "Good Luck")
tilemap_level1 = tilemap`level1`
tiles.setCurrentTilemap(tilemap_level1)
current_tilemap = tilemap_level1
controller.moveSprite(Ninja)
Ninja = Render.getRenderSpriteVariable()
Render.moveWithController(2, 3, 0)
tiles.placeOnRandomTile(Ninja, assets.tile`startingTile`)
CoinCollected = 0
game.splash("Find The Coins")
for (let value of tiles.getTilesByType(assets.tile`coinLoc`)) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Food)
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . b b b . . . 
        . b 5 5 5 b . . 
        b 5 d 3 d 5 b . 
        b 5 3 5 1 5 b . 
        c 5 3 5 1 d c . 
        c 5 d 1 d d c . 
        . f d d d f . . 
        . . f f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 d 1 5 b . 
        . b 5 3 1 5 b . 
        . c 5 3 1 d c . 
        . c 5 1 d d c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . b 5 1 d 5 b . 
        . b 5 1 3 5 b . 
        . c d 1 3 5 c . 
        . c d d 1 5 c . 
        . . f d d f . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    100,
    true
    )
    tiles.placeOnTile(coin, value)
}
for (let value2 of tiles.getTilesByType(assets.tile`myTile0`)) {
    guide = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........fff22fff........
        .......fff2222fff.......
        ......fffeeeeeefff......
        ......ffe222222eef......
        ......fe2ffffff2ef......
        ......ffffeeeeffff......
        .....ffefbf44fbfeff.....
        .....fee41fddf14eef.....
        ......ffffdddddeef......
        .....fddddf444eef.......
        .....fbbbbf2222f4e......
        .....fbbbbf2222fd4......
        ......fccf45544f44......
        .......ffffffff.........
        .........ff..ff.........
        `, SpriteKind.Guide)
    tiles.placeOnTile(guide, value2)
}
portal = sprites.create(img`
    fffffffffffffffff
    f666666666666666f
    f6ff8888f8888ff6f
    f6f66666f66666f6f
    f6862666f6662686f
    f6822226f6222286f
    f6862666f6662686f
    f6866ff6f66ff686f
    f686f66ff6f6f686f
    f686f66ff666f686f
    f686f66ff666f686f
    f686f66ff666f686f
    f6811ff1f1ffff86f
    f6866666ff666686f
    f68666666fff6686f
    f6811111111f1186f
    f6811111111f1186f
    f6866666666f6686f
    f6811111111f1186f
    f6866666666f6686f
    f6811111111f1186f
    f6811111111f1186f
    f6811111111f1186f
    f688888888fff886f
    `, SpriteKind.Portal1)
tiles.placeOnRandomTile(portal, assets.tile`myTile`)
portalOpen = 0
let weapon = sprites.create(img`
    ..bb.......................bb...
    dfcffffffffffffffffffffffffcffc.
    bcccccccccccccccccccccccccccccf.
    bcccccccccccccccccccccccccccccc.
    dccccccccccccccccccccccffcccfcf.
    .cffffffffffffffffffffffffffffc.
    .bfffffffffffffffffffffffffffbd.
    ...........cfcd.cffbffffffffc...
    ...........dfc..dfbbffffffffc...
    ...........dfcdddcdcfffffffff...
    ...........bfffffffffffffffffd..
    ...........bcccccccddffffffffc..
    .....................dfffffffc..
    ......................ffffffffb.
    ......................bffffffff.
    ......................bffffffff.
    .......................cfffffffb
    .......................cfffffffb
    .......................dffffffb.
    .......................dcfffffb.
    .........................ccccb..
    .........................dbb....
    `, SpriteKind.Weapon)
tiles.placeOnRandomTile(weapon, assets.tile`enemyLoc`)
weaponCollected = 0
