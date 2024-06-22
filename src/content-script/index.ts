import './index.scss'

const src = chrome.runtime.getURL('src/content-script/iframe/index.html')
// check if current domain http://fb.dut.udn.vn/ then append iframe
console.log(window.location)
if (window.location.host === 'fb.dut.udn.vn' && window.location.pathname === '/PageDanhGiaCA.aspx') {
  // chrome.runtime.onMessage.addListener((msgObj) => {
    // do something with msgObj
    // console.log(msgObj)
    const btn = document.createElement('button')
    btn.className = 'crx-btn'
    btn.textContent = 'Điền tự động'
    btn.onclick = () => {
      console.log('clicked')
      let i = 1
      let el = null
      const list = []
      do {
        // 0 -> 01
        const t = i.toString().padStart(2, '0')
        console.log(`#Re24LTC${t}`)
        el = document.querySelector(`#Re24LTC${t}`)
        i++
        if (el) {
          list.push(el)
        }
      } while (el)
      console.log(list)
      list.forEach((el) => {
        // el.style.backgroundColor = 'red'
        // get first span tag inside the element
        const inp = el.querySelector('input[type="radio"]')
        if (inp) {
          inp.checked = true
        }
      })

      // console.log(document.querySelectorAll('textarea'))
      const textareas = document.querySelectorAll('textarea')
      textareas.forEach((el) => {
        el.value = 'Em không có ý kiến gì thêm ạ'
      })
      const submit = document.querySelector('input[type="submit"]')
      if (submit) {
        // scroll to the submit button
        submit.scrollIntoView({ behavior: 'smooth' })
        // submit.click()
      }
    }
    document.body?.append(btn)
  // })
}

console.log('hello world from content script')
self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}
