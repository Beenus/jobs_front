<template>
  <div class="faq">
    <div class="container">
      <Breadcrumbs :links="breadcrumbs"/>
    </div>
    <LegalTwoSidebars title="FAQs" :anchors="anchors">
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
  name: "faq",
  components: {LegalTwoSidebars},
  head() {
    return {
      title: 'FAQs | Recommended Jobs',
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
      type: 'FAQs',
      page_id: null,
      session: app.$cookies.get('session_uuid'),
      ip: store.state.userIp,
      country: store.state.userOriginalLocation?.country,
    })

    return {
      content: [
        {
          title: "1. How does Recommended-Jobs.com work?",
          anchor: app.$slugify("1. How does Recommended-Jobs.com work?"),
          text: "Recommended-Jobs.com utilizes an advanced job recommendation engine powered by machine learning technology. The engine analyzes users' skills and preferences, and based on that information, it delivers personalized job recommendations. The more you use the platform and provide feedback, the better it becomes at understanding your unique professional profile and suggesting relevant opportunities.",
        },
        {
          title: "2. Is Recommended-Jobs.com free to use?",
          anchor: app.$slugify("2. Is Recommended-Jobs.com free to use?"),
          text: "Yes, Recommended-Jobs.com is free for job seekers. Our aim is to provide a user-friendly and accessible platform for individuals seeking their ideal job opportunities. Simply sign up, create your profile, and start receiving personalized recommendations.",
        },
        {
          title: "3. Can I trust the job recommendations provided by Recommended-Jobs.com?",
          anchor: app.$slugify("3. Can I trust the job recommendations provided by Recommended-Jobs.com?"),
          text: "Absolutely. Our job recommendation engine is designed to prioritize accuracy and relevance. We continuously improve our algorithms to ensure that the recommendations are aligned with your skills, preferences, and career goals. However, it's always important to conduct your own research and due diligence before applying for any job opportunity.",
        },
        {
          title: "4. What type of job opportunities does Recommended-Jobs.com recommend?",
          anchor: app.$slugify("6. What type of job opportunities does Recommended-Jobs.com recommend?"),
          text: "Recommended-Jobs.com covers a wide range of job opportunities across various industries and sectors. Whether you're seeking full-time, part-time, remote, or freelance positions, our job recommendation engine strives to provide relevant opportunities that match your skills and preferences.",
        },
        {
          title: "5. Can I apply for jobs directly through Recommended-Jobs.com?",
          anchor: app.$slugify("7. Can I apply for jobs directly through Recommended-Jobs.com?"),
          text: "Yes, you can. When you find a job listing that interests you, simply click on the provided link or button to be redirected to the respective job application page. Recommended-Jobs.com serves as a platform to discover and explore job opportunities, allowing you to seamlessly transition to the application process.",
        },
        {
          title: "6. How can I provide feedback on the job recommendations?",
          anchor: app.$slugify("8. How can I provide feedback on the job recommendations?"),
          text: "We value your feedback and encourage you to share your thoughts on the recommended job opportunities. You can provide feedback directly on the platform by rating the relevance of the recommendations or by leaving comments. Your feedback helps us improve the accuracy of future recommendations.",
        },
        {
          title: "7. Is my personal information secure on Recommended-Jobs.com?",
          anchor: app.$slugify("9. Is my personal information secure on Recommended-Jobs.com?"),
          text: "At Recommended-Jobs.com, we take the privacy and security of your personal information seriously. We employ robust security measures to protect your data and adhere to strict privacy policies. We do not share your personal information with third parties without your consent.",
        },
        {
          title: "8. How can I contact the support team at Recommended-Jobs.com?",
          anchor: app.$slugify("10. How can I contact the support team at Recommended-Jobs.com?"),
          text: "If you have any questions, concerns, or technical issues, our support team is here to assist you. You can reach out to us through the \"Contact\" or \"Support\" section on our website. We strive to provide prompt and helpful assistance to ensure you have a seamless experience on Recommended-Jobs.com. <br/><br/> <b>If you have any additional questions or need further assistance, please don't hesitate to reach out to us. We're here to help you in your journey towards finding the perfect career opportunity.</b>",
        },
      ],
      breadcrumbs: [
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'FAQs',
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
.faq {
  padding-top: 30px;

  > .container {
    padding: 0 15px;
  }
}
</style>
