export default {
  methods: {
    async registerOutclickMixin(type) {
      const pageType = this.$route.name.toUpperCase()

      await this.$store.dispatch('registerOutclick', {
        type,
        page_type: pageType === 'SLUG' ? 'PAGE' : pageType,
        page_id: pageType === 'SLUG' ? this.$store.state.pages.pageData?.id : null,
        session: this.$cookies.get('session_uuid'),
        url: this.job.url,
        cpc: this.job.bid,
        jobkey: this.job.jobkey,
      })
    }
  }
}
