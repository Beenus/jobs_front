export default {
  methods: {
    async registerOutclickMixin(type) {
      const pageType = this.$route.name.toUpperCase()

      if (window) {
        window.uetq = window.uetq || [];
        window.uetq.push('event', 'Out Click', {"event_label": "{{Click URL}}", "event_category": "Behavior"});
      }

      await this.$store.dispatch('registerOutclick', {
        type,
        page_type: pageType === 'SLUG' ? 'PAGE' : pageType,
        page_id: pageType === 'SLUG' ? this.$store.state.pages.pageData?.id : null,
        session: this.$cookies.get('session_uuid'),
        url: this.job.url,
        cpc: this.job.bid,
        keyword: this.$store.state.search ? this.$store.state.search : this.pageData?.keyword ? this.pageData.keyword : null,
        jobkey: this.job.jobkey,
        position: this.index,
      })
    }
  }
}
