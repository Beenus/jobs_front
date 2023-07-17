<template>
  <div class="jobs-page">
    <PopularPages :top="true" v-if="isMobileWidth && !search"/>
    <div class="list" :class="{short: shortTemplate}">
      <div class="sidebar left"></div>
      <div class="container">
        <div class="title-sort">
          <div class="title desktop">Available jobs {{ search ? `for "${search}"` : '' }} in "{{ location }}"
          </div>
          <div class="title mobile">Jobs founds in "{{ location }}"</div>

          <div class="sort-counting"></div>
        </div>
        <ListWrapper :isMobileWidth="isMobileWidth" :template="template"/>
      </div>
      <div class="sidebar right" :class="{short: shortTemplate}">
        <div class="sidebar-wrap" :class="{headerVisible: isHeaderVisible}" v-if="shortTemplate">
          <PopularPages/>
          <Subscribe/>
          <GptAd ad-unit="Right_to_lineup"
                 :collapseEmptyDiv="true"
                 :size="[300, 250]"
          />
        </div>
      </div>
    </div>
    <ContentBlock v-if="title && description" :title="title" :content="description"/>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  head() {
    return {
      title: 'Jobs' + this.$store.state.global.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Description',
        }
      ]
    }
  },
  async asyncData({store, route, from, error}) {
    await store.dispatch('pages/clearPageData')
    await store.dispatch('pages/getPopularPages', route?.params?.slug)

    if (route.query.search) {
      await store.dispatch('setSearch', route.query.search)
    }

    if (route.query.keyword) {
      await store.dispatch('setSearch', route.query.keyword)
    }

    if (route.query.location) {
      await store.dispatch('setLocation', route.query.location)
      const location = route.query.location.split(',');

      let params = {}

      if (location && location[0] && location[1]) {
        params.city = location[0].trim()
        params.region = location[1].trim()
        params.countryCode = store.state.userOriginalLocation.countryCode
      } else {
        if (location && location[0]) {
          const {cities} = await store.dispatch('getCities', {q: location[0].trim()});

          if (cities.length) {
            params = cities[0]
          }
        }
      }

      await store.dispatch('setUserLocation', params)
    }

    if (!from) {
      await store.dispatch('jobs/getJobs', {route: route.name, loader: true})
    }

    return {
      windowSize: null,
      search: store.state.search,
      title: 'Revolutionizing Your Job Hunt: How Our Job Search Engine Can Empower Your Career Quest',
      description: '<p>In today\'s competitive job market, it\'s critical to arm yourself with the right tools to find the perfect career opportunity. Long gone are the days of scouring newspaper classifieds or hopping from company to company dropping off résumés. The job search process has evolved, becoming digitized and more efficient than ever before.</p>' +
        '<p>This is where our website comes into the picture. Designed with the modern job seeker in mind, our platform harnesses the power of technology to bring an array of job opportunities right at your fingertips. This blog post aims to highlight the ways our job search engine can streamline your job hunting process, ultimately helping you land the ideal position.</p>' +
        '<h2>Comprehensive Job Listings</h2>' +
        '<p>Our website provides an extensive database of job openings sourced from numerous companies across various sectors. This comprehensive approach ensures that you have access to a wide range of opportunities, whether you\'re looking for an entry-level position or a high-ranking executive role. We understand that everyone\'s career path is unique, and we strive to cater to as many aspirations and ambitions as possible.</p>' +
        '<h3>Work from Home Opportunities</h3>' +
        '<p>Our platform offers a dedicated page for <a href="https://recommended-jobs.com/work-from-home-jobs">work from home opportunities</a>, perfect for those seeking flexibility and balance between professional and personal life. We curate remote jobs across various industries, helping you find a role that allows you to excel professionally from the comfort of your home.</p>' +
        '<h3>Caregiver Jobs</h3>' +
        '<p>For those inclined towards making a difference in other\'s lives, our extensive list of <a href="https://recommended-jobs.com/caregiver">caregiver jobs</a> is just a click away. With roles ranging from child care to elderly care, we can connect you to positions that align with your caregiving skills and passion.</p>' +
        '<h3>Driver Jobs</h3>' +
        '<p>If you enjoy being on the road and have the necessary qualifications, our <a href="https://recommended-jobs.com/driving-jobs">driver jobs</a> page offers a wide range of opportunities. From delivery drivers to commercial truck operators, we can help you steer your career in the right direction.</p>' +
        '<h3>Warehouse Jobs</h3>' +
        '<p>For those seeking roles in logistics and supply chain, check out our <a href="https://recommended-jobs.com/warehouse-jobs">warehouse jobs</a> page. We provide an array of positions, from entry-level to management, in various locations.</p>' +
        '<h3>Administrative Jobs</h3>' +
        '<p>Our <a href="https://recommended-jobs.com/administrative-jobs">administrative jobs</a> page is the go-to resource for professionals looking for roles in office management, secretarial tasks, or executive assistance. With our vast collection of opportunities, your next administrative role could be just a search away.</p>' +
        '<h3>Part-Time and Full-Time Jobs</h3>' +
        '<p>Whether you\'re looking for a side gig or a full-time commitment, we have you covered. Visit our <a href="https://recommended-jobs.com/part-time-jobs">part-time jobs</a> or full-time jobs pages to find positions that suit your availability and income needs.</p>' +
        '<h3>Nurse Jobs</h3>' +
        '<p>For those in the healthcare industry, our <a href="https://recommended-jobs.com/nurse-jobs">nurse jobs</a> page is a valuable resource. We connect <a href="https://recommended-jobs.com/rn-jobs">registered nurses</a>, <a href="https://recommended-jobs.com/nurse-practitioner">nurse practitioners</a>, and other healthcare professionals with institutions in dire need of their expertise.</p>' +
        '<p>By integrating these pages into our platform, we aim to provide a comprehensive job search experience that caters to various job seekers\' unique needs and preferences. Explore these pages today and find the right opportunity for your career.</p>' +
        '<h2>Intuitive Search Engine</h2>' +
        '<p>Having an abundance of options can sometimes be overwhelming, especially when you\'re unsure where to start. Our intuitive search engine simplifies this process. By using tailored keywords, job titles, companies, or locations, you can pinpoint specific opportunities that match your qualifications and interests. This user-friendly feature saves you valuable time by narrowing down your options and presenting only the most relevant jobs.</p>' +
        '<h2>Regular Updates</h2>' +
        '<p>The job market is constantly evolving, with new roles and opportunities emerging every day. Our website stays up-to-date with these changes, providing you with real-time updates on the latest job postings. This dynamic approach ensures that you stay ahead of the competition and never miss an opportunity.</p>' +
        '<h2>Personalized Job Alerts</h2>' +
        '<p>To further enhance your job search experience, our platform offers personalized job alerts. Once you\'ve set your preferences—be it industry, location, or job level—our system will notify you of any new postings that fit your criteria. This way, you can apply for fresh positions as soon as they\'re available, increasing your chances of securing an interview.</p>' +
        '<h2>Ease of Application</h2>' +
        '<p>Our website doesn’t just help you find jobs; it makes the application process seamless as well. With your profile and résumé saved on the platform, you can apply to numerous positions with a few clicks. This efficient method removes the tedious task of filling out application forms multiple times, giving you more time to prepare for potential interviews.</p>' +
        '<h2>Informative Blog and Resources</h2>' +
        '<p>In addition to the job search engine, our platform hosts an informative blog and numerous resources to help users in their job search journey. From tips on crafting an outstanding résumé to advice on acing interviews and negotiating salaries, we\'re here to provide support at every step of the way.</p>' +
        '<p>Finding a job may be a daunting task, but with the right resources, it doesn\'t have to be an exhausting ordeal. Our job search engine has been designed to alleviate the stress associated with job hunting, offering a streamlined, user-friendly solution to help you navigate the job market effectively. Whether you\'re kickstarting your career or looking for a change, our platform is here to guide you towards your professional goals.</p>' +
        '<p>Start your search today and discover the wealth of opportunities waiting for you.</p>\n',
    }
  },
  computed: {
    isMobileWidth() {
      return this.$device ? this.$device.isMobileOrTablet : this.windowSize ? this.windowSize?.x < 768 : false
    },
    location() {
      return this.$store.getters['location'];
    },
    perPage() {
      return this.$store.state.jobs.perPage
    },
    jobsCount() {
      return this.$store.state.jobs.list.length
    },
    jobsFetching() {
      return this.$store.state.jobs.fetching
    },
    template() {
      return this.$store.state.globalTemplate;
    },
    shortTemplate() {
      // return this.template === 'ListItemLogo';
      return true;
    },
    isHeaderVisible() {
      return this.$store.state.isHeaderVisible
    },
  },
  methods: {
    onResize() {
      this.windowSize = {x: window.innerWidth, y: window.innerHeight}
    },
  },
  watch: {
    jobsFetching(val, oldVal) {
      if (val !== oldVal) {
        this.search = this.$store.state.search
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (process.browser) {
        this.$store.dispatch('registerPageView', {
          type: 'JOBS',
          page_id: null,
          session: this.$cookies.get('session_uuid'),
          ip: this.$store.state.userIp,
          country: this.$store.state.userOriginalLocation?.country,
        })

        this.onResize()
        window.addEventListener('resize', this.onResize)
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped lang="scss">
.jobs-page {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 45px 0 40px;
  background: #f0f0f0;

  @media (max-width: $screen-sm-max) {
    padding-top: 35px;
  }

  @media (max-width: $screen-xs-max) {
    padding: 100px 0 0;
  }

  .sidebar {
    width: 100%;
    max-width: 195px;

    @media (max-width: $screen-sm-max) {
      display: none;
    }

    &.right {
      padding-left: 36px;

      .sidebar-wrap {
        position: sticky;
        top: 15px;
        transition: .3s;

        &.headerVisible {
          top: 75px;
        }
      }

      .ad {
        background: #EBEBEB;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 600px;
      }

      &.short {
        max-width: 300px;
        padding-left: 0;
        margin-left: 20px;
      }
    }

    &.left {
      @media (max-width: $screen-md-max) {
        display: none;
      }
    }
  }

  .list {
    display: flex;
    justify-content: center;
    max-width: 1350px;
    width: 100%;
    @media (max-width: $screen-md-max) {
      padding: 0 15px;
    }

    &.short {
      justify-content: flex-start;

      .container {
        @media (min-width: $screen-md) {
          max-width: 640px;
          margin: 0;
        }

      }
    }
  }

  .title-sort {
    display: flex;
    justify-content: space-between;

    @media (max-width: $screen-xs-max) {
      display: none;
    }

    .title {
      font-weight: 600;
      font-size: 18px;
      line-height: 21px;
      color: #000000;

      &.desktop {
        @media (max-width: $screen-xs-max) {
          display: none;
        }
      }

      &.mobile {
        display: none;

        @media (max-width: $screen-xs-max) {
          display: flex;
          font-weight: 700;
          font-size: 18px;
          line-height: 16px;
          color: #000000;
        }
      }
    }

    .sort-counting {
      @media (max-width: $screen-xs-max) {
        display: none;
      }

      .counting {
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #737373;
      }
    }
  }
}
</style>
