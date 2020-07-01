<template>
  <div class="home">
    <Header></Header>
    <Contents></Contents>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Contents from '@/components/Contents.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Contents
  }
}
</script>
