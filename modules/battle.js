const Brave = require('./brave')

module.exports = class Battle {
  start (monster, preemptiveFlag = 0) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await brave.showRemainingHp()
        for (let i = 0; ; i++) {
          // 通常は勇者の攻撃から戦闘が始まる
          if (i % 2 === preemptiveFlag) {
            const damageAmount = brave.calcAttackScore()
            await monster.attacked(monster, damageAmount)
            if (monster.isDead(monster)) {
              await this.#win(monster)
              break
            }
          } else {
            const damageAmount = monster.calcAttackScore()
            await brave.attacked(monster, damageAmount)
            await brave.showRemainingHp()
            if (brave.isDead()) {
              await brave.death()
              break
            }
          }
        }
        resolve()
      }, 2000)
    })
  }

  #win (monster) {
    console.log(`${monster.name}を倒した\n\n`)
    if (monster.name !== "魔王") {
      brave.levelup()
    }
  }
}
const brave = new Brave()
