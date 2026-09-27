// 彩蛋的判定逻辑。纯函数，不碰浏览器 API，所以能在 node 里直接跑着验。
// 组件只负责"什么时候调用"，怎么算对、怎么算重来，都在这里。

// 键盘序列。按到当前该按的那个键就往前进一格，按到首键时从第二格重新算起——
// 否则 ↑↑↓↓… 里第二个 ↑ 会被当成按错，永远走不到头。
export function createSequenceMatcher(sequence: string[]) {
  const keys = sequence.map((key) => key.toLowerCase())
  let index = 0

  return (pressed: string) => {
    const key = pressed.toLowerCase()
    index = key === keys[index] ? index + 1 : key === keys[0] ? 1 : 0

    if (index < keys.length) return false

    index = 0
    return true
  }
}

// 连着敲出的词。只认单个字符的按键——方向键、Shift、F5 这类 key 是长名字的
// 一律不进缓冲，否则敲 fuzz 时顺手按一下 Shift，缓冲就被"hift"顶掉、再也命中不了。
// 缓冲只留最近这么多个字符，前面敲错的会被挤出去。
export function createTypedWordMatcher(word: string) {
  const target = word.toLowerCase()
  let buffer = ''

  // 没配触发词时直接废掉，别让它拿空串跟空缓冲比出个"命中"
  if (!target) return () => false

  return (pressed: string) => {
    if (pressed.length !== 1) return false

    buffer = (buffer + pressed.toLowerCase()).slice(-target.length)
    if (buffer !== target) return false

    buffer = ''
    return true
  }
}

// 连点计数。两次间隔超过窗口就重新数，数够了返回 true 并清零。
// now 可传入，方便测试；正常调用不用管。
export function createClickCounter(times: number, windowMs = 1200) {
  let count = 0
  let last = 0

  return (now: number = Date.now()) => {
    count = now - last <= windowMs ? count + 1 : 1
    last = now

    if (count < times) return false

    count = 0
    return true
  }
}
