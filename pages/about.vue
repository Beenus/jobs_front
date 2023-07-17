<template>
  <div class="about-us">
    <div class="container">
      <Breadcrumbs :links="breadcrumbs"/>
    </div>
    <LegalTwoSidebars title="About Us" :anchors="anchors">
      <div class="paragraph" v-for="(item, index) in content" :key="index">
        <div class="title" :id="item.anchor">{{ item.title }}</div>
        <div class="text" v-html="item.text"/>
      </div>
    </LegalTwoSidebars>
  </div>
</template>

<script>
import LegalTwoSidebars from "@/components/layout/LegalTwoSidebars.vue";

export default {
  name: "about-us",
  components: {LegalTwoSidebars},
  head() {
    return {
      title: 'About us | Recommended Jobs',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Our Local Job Search Engine is the ultimate destination for all your job search needs. We provide the most comprehensive, up-to-date listings of local jobs in your area, so you can easily find the perfect job for you.',
        }
      ]
    }
  },
  async asyncData({store, route, app}) {
    await store.dispatch('registerPageView', {
      type: 'ABOUT_US',
      page_id: null,
      session: app.$cookies.get('session_uuid'),
      ip: store.state.userIp,
      country: store.state.userOriginalLocation?.country,
    })

    return {
      content: [
        {
          title: "Discover Personalized Job Recommendations",
          anchor: app.$slugify("Discover Personalized Job Recommendations"),
          text: "At Recommended-Jobs.com, we are dedicated to revolutionizing the way job seekers discover their perfect career opportunities. With our cutting-edge job recommendation engine, powered by advanced machine learning technology, we bring personalized job recommendations directly to your fingertips.",
        },
        {
          title: "Effortless Job Search Made Easy",
          anchor: app.$slugify("Effortless Job Search Made Easy"),
          text: "Gone are the days of sifting through countless job listings that aren't relevant to your interests or aspirations. With Recommended-Jobs.com, you can rest assured that each recommendation is carefully curated to match your skills, preferences, and career goals. Our advanced job recommendation engine leverages the power of machine learning to analyze and understand users' skills and preferences, making the search process easier and more efficient.",
        },
        {
          title: "Customized Experience for Job Seekers",
          anchor: app.$slugify("Customized Experience for Job Seekers"),
          text: "We understand that finding the right job opportunity can be a daunting task, filled with uncertainty and endless searching. That's why at Recommended-Jobs.com, we are committed to providing a customized experience that empowers job seekers like you. Our platform is designed to streamline the job search process, ensuring that you can efficiently and effortlessly find the right opportunities that align with your expertise and aspirations.",
        },
        {
          title: "Unleash Your Professional Potential",
          anchor: app.$slugify("Unleash Your Professional Potential"),
          text: "Whether you're a recent graduate exploring entry-level positions or a seasoned professional seeking a career change, our job recommendation engine is here to guide you every step of the way. We strive to go beyond the conventional search methods and provide a truly personalized experience that matches you with opportunities that are not only suitable but also fulfilling.",
        },
        {
          title: "Your Partner in Professional Success",
          anchor: app.$slugify("Your Partner in Professional Success"),
          text: "At Recommended-Jobs.com, we believe that the right job can transform lives. We are driven by the belief that everyone deserves a fulfilling career that harnesses their unique talents and passions. With our dedication to excellence, innovation, and user satisfaction, we aim to be your trusted partner in your journey to professional success.",
        },
        {
          title: "Join Us Today and Shape Your Future",
          anchor: app.$slugify("Join Us Today and Shape Your Future"),
          text: "Join us today and experience the future of job searching. Let Recommended-Jobs.com be your compass as you navigate the vast landscape of career opportunities. Together, we'll uncover the hidden gems that will shape your future and lead you to the career you've always dreamed of.<br/><br/> <b>Welcome to Recommended-Jobs.com, where personalized recommendations meet limitless possibilities.</b>",
        },
      ],
      breadcrumbs: [
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'About Us',
          link: null
        }
      ],
    }
  },
  methods: {},
  computed: {
    anchors() {
      return this.content.map(item => {
        return {
          title: item.title,
          anchor: item.anchor,
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.about-us {
  padding-top: 30px;

  > .container {
    padding: 0 15px;
  }
}
</style>
