<template>
  <div class="faq" v-if="faq">
    <div class="faq-main-title">Frequently asked questions</div>
    <div class="faq-items">
      <SingleFAQ :item="item" v-for="(item, index) in faq" :key="index" :forceOpen="index===0"/>
    </div>
  </div>
</template>

<script>
import SingleFAQ from "@/components/FAQ/SingleFAQ";

export default {
  name: "FAQ",
  components: {SingleFAQ},
  props: ['faq'],
  computed: {

  },
}
</script>

<style scoped lang="scss">
.faq {
  margin-top: 45px;

  .faq-main-title {
    font-weight: 800;
    font-size: 32px;
    line-height: 36px;
    color: #000000;
    margin-bottom: 25px;
  }

  .faq-main-sub-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 36px;
    color: #3F4A5B;
    margin-bottom: 25px;
  }
}
</style>
