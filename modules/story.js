const Monster = require('./monster')
const Battle = require('./battle')
const {Toggle} = require('enquirer')

module.exports = class Story {

  progress () {
    console.log('村人：「魔物が村を襲ってきて困っています。」')
    const helpOrAbandon = new Toggle({
      message: '勇者様お願いです。魔物を倒して下さい！',
      enabled: '助ける',
      disabled: '見捨てて立ち去る'
    })
    helpOrAbandon.run()
      .then(async answer => {
        const battle = new Battle()
        if (answer === true) {
          slime.appear()
          await battle.start(slime)
          if (slime.isDead()) {
            golem.appear()
            await battle.start(golem)
            if (golem.isDead()) {
              devil.appear()
              await battle.start(devil)
              if (devil.isDead()) {
                console.log('村に平和が戻った')
              }
            }
          }
        } else {
          devil.appear()
          // 「見捨てて立ち去る」を選ぶと魔王の攻撃から戦闘開始する
          battle.start(devil, 1)
        }
      })
      .catch(console.error)
  }
}
const slime = new Monster('スライム', 5, 2)
const golem = new Monster('ゴーレム', 20, 6)
const devil = new Monster('魔王', 50, 13)
