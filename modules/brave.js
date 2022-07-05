module.exports = class Brave {
  constructor () {
    this.name = '勇者'
    this.hp = 5
    this.level = 1
    this.offensivePower = 3
  }

  showRemainingHp () {
    console.log(`\n勇者のHP[${Math.max(0, this.hp)}]\n`)
  }

  calcAttackScore () {
    // offensivePowerに近い乱数の出現頻度を指数関数的に高くする
    return Math.floor((1 - Math.random() * Math.random()) * this.offensivePower)
  }

  attacked (monster, damageAmount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`\n\n⬟ ⬟ ⬟ ⬟ ⬟ ${monster.name}の攻撃 ⬟ ⬟ ⬟ ⬟ ⬟`)
        if (damageAmount === 0) {
          console.log('miss!')
        } else {
          console.log(`勇者は ${damageAmount} ポイントのダメージを受けた`)
        }
        this.hp -= damageAmount
        resolve()
      }, 2000)
    })
  }

  levelup () {
    this.level += 1
    // 勇者のhpを回復させる
    this.hp = 5
    // 勇者のhpとmaxPowerの上昇にレバレッジを効かせ,
    // 魔王に勝てる確率50%程度、ゴーレムに勝つ確率95%程度に設定
    const LEVERAGE = 2
    this.hp *= this.level ** LEVERAGE
    this.offensivePower += this.level ** LEVERAGE
    console.log('勇者のレベルが1上がった')
  }

  isDead () {
    return this.hp <= 0
  }

  death () {
    console.log('\n\n\n...勇者は死んでしまった')
  }
}
