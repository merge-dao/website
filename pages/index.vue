<template>
  <div>
    <seo-tags
      :title="$t('index.seo.title')"
      :description="$t('index.seo.desc')"
    />
    <StarfieldHero :title="$t('index.title')">
      <h2 class="text-center">
        {{ $t('index.h2.l1') }}
        <br />
        {{ $t('index.h2.l2') }}
        <br />
        {{ $t('index.h2.l3') }}
      </h2>
      <div class="flex flex-col sm:flex-row mt-6">
        <Button
          type="primary"
          href="#install"
          :text="$t('index.button.start')"
          class="mr-0 sm:mr-2.5 mb-2.5 sm:mb-0 px-8 py-3"
          :on-click="(item) => onCTAClick({ ui: 'hero/install', ...item })"
        />
        <Button
          href="#how"
          class="px-8 py-3"
          :text="$t('index.button.work')"
          :on-click="(item) => onCTAClick({ ui: 'hero/how', ...item })"
        />
      </div>
    </StarfieldHero>
    <section id="why" class="grid-margins py-20 sm:py-36">
      <div class="text-center mb-8 sm:mb-20">
        <h2 class="font-display mb-3">
          {{ $t('index.why.h2') }}
        </h2>
        <p class="text-base sm:text-lg">
          {{ $t('index.why.p') }}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-1 gap-x-16 gap-y-20">
        <div>
          <div class="flex justify-center items-center h-52 px-3">
            <Icon name="ipfs-illustration-network" class="max-w-xs h-52" />
          </div>
          <h3 class="text-center text-navy text-base sm:text-lg mb-4 font-bold">
            {{ $t('index.why.h3') }}
          </h3>
          <p>
            {{ $t('index.why.desc') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SeoTags from '~/components/SeoTags.vue';
import Button from '~/components/Button';
import StarfieldHero from '~/components/StarfieldHero';
import VideoModal from '~/components/VideoModal.vue';

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Button, StarfieldHero, SeoTags, VideoModal },
  data() {
    return {
      latestPosts: [],
      latestNews: [],
      latestVideos: [],
    };
  },
  async fetch() {
    const [latestPosts, latestNews, latestVideos] = await Promise.allSettled([
      fetch('https://blog.ipfs.io/index.json')
        .then((res) => res.json())
        .then((data) => data.posts),
      fetch('https://blog.ipfs.io/news.json')
        .then((res) => res.json())
        .then((data) => data.news),
      fetch('https://blog.ipfs.io/videos.json')
        .then((res) => res.json())
        .then((data) => data.videos),
    ]);

    if (latestPosts.status === 'fulfilled') {
      this.latestPosts = latestPosts.value;
    }

    if (latestNews.status === 'fulfilled') {
      this.latestNews = latestNews.value;
    }

    if (latestVideos.status === 'fulfilled') {
      this.latestVideos = latestVideos.value;
    }
  },
  fetchOnServer: false,
  methods: {
    onCTAClick(data) {
      this.$countly.trackEvent(this.$countly.events.CTA_CLICK, {
        path: this.$route.path,
        ...data,
      });
    },
    openVideoModal: function (video) {
      this.$refs.videoModal.openModal(video);
    },
  },
};
</script>

<style scoped>
.video-preview:hover .video-preview-thumbnail {
  @apply scale-105;
}

h2 {
  @apply text-3xl;
}

@screen sm {
  h2 {
    @apply text-4xl;
  }
}
</style>
