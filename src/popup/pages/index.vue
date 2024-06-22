<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'

const version = __VERSION__
const displayName = __DISPLAY_NAME__
const gitURL = __GITHUB_URL__
const gitCommit = __GIT_COMMIT__
const gitCommitURL = `${gitURL}/commit/${gitCommit}`

const store = useAppStore()

const name = computed(() => store.name)
const count = computed(() => store.count)

interface ListItems {
  date: string
  title: string
  content: string
  isCurrentDay: boolean
}
const listTitle = ref<ListItems[]>([])

const isFetching = ref(false)
const handleQuery = () => {
// crawl html page http://sv.dut.udn.vn/Default.aspx
    isFetching.value = true
    const url = 'http://sv.dut.udn.vn/Default.aspx'
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        isFetching.value = false
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const titles = doc.querySelector('#MainContent_pnBody')
        const boxs = titles.querySelectorAll('.tbBox')
        boxs.forEach((box) => {
          const element = box.querySelector('.tbBoxCaption') as HTMLElement
          if (element === null) return
          const date = element?.querySelector('b')?.textContent.trim()
          const title = element?.querySelectorAll('span')[1].textContent.trim()
          const content = box.querySelector('.tbBoxContent')?.innerHTML.trim()
          // check is current date - date is format dd/mm/yyyy
          // check format date
          const optionFormat = { year: 'numeric', month: '2-digit', day: '2-digit' }
          const isCurrentDay = date?.split(':')[0] === new Date().toLocaleDateString('vi-VN', optionFormat)
          listTitle.value.push({ date, title, content, isCurrentDay })
        })
        // console.log('Title: 2', title?.querySelector('.tbBoxCaption').textContent.trim())
      })
      .catch((error) => {
        console.error('Error:', error)
      })
}
onMounted(() => {
  console.log('Popup mounted')
  handleQuery()
})
</script>

<template>
  <div class="m-4 flex flex-col gap-y-2">
    <div class="flex gap-2">
      <h1 class="text-lg font-bold">
        Thông báo DUT
      </h1>
      <a href="http://fb.dut.udn.vn/" target="_blank" class="border-0 btn btn-success h-8 min-h-5">Điền khảo sát</a>
    </div>
    <div v-if="isFetching" class="flex justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
    </div>
    <div v-for="item in listTitle" :key="item.title" class="p-2 mt-2 bg-white border rounded-xl shadow-sm">
      <div class="flex gap-2 font-medium text-sm">
        <h1 :class="{'text-rose-600': item.isCurrentDay}">
          {{ item.date }} 
          <span v-if="item.isCurrentDay">(Hôm nay)</span>
        </h1>

        <h1>{{ item.title }}</h1>
      </div>
      <div class="mt-3" v-html="item.content" />
    </div>
    <!-- <div class="fixed right-0 w-full bottom-3 flex justify-center h-16">
      <div class="flex items-center shadow-lg px-4 bg-white w-[95%] h-[95%] border rounded-lg ">
        <a href="http://fb.dut.udn.vn/" class="btn btn-success h-8 min-h-5">Điền khảo sát</a>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-md bg-blue-500 text-white;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
<style>
a {
  color: #1302ff;
}
</style>