<!-- 使用Bootstrap 5 examples 中的 Cover 範例修改 -->
<script>
export default {
  name: 'FloatingWindow',
  data() {
    return {
      items: [
        { id: 0, color: [232, 122, 144], title: "首頁", description: "歡迎來到首頁" },
        { id: 1, color: [236, 184, 138], title: "切版練習", description: "了解更多關於我們的資訊" },
        { id: 2, color: [181, 202, 160], title: "小元件練習", description: "查看我們提供的服務" },
        { id: 3, color: [46, 169, 223], title: "專案練習", description: "保持聯繫" }
      ],
      currentIndex: 0,
      carouselVisible: true,
      lists: [
        {},
        {
          // name: 'Layout',
          // unit:[
          //   {
          //     name: 'animatedText',
          //     to: '/Layout/animatedText'
          //   },
          // ],
        },
        {
          name: 'Components',
          unit:[
            {
              name: '動態文字',
              to: '/Components/animatedText'
            },
            {
              name: '動態更換背景色',
              to:'/Components/BackgroundColorChange',
            },
            {
              name: 'carousel-3d測試',
              to:'/Components/HomeViewSlide',
            },
            {
              name: 'ThreeCube',
              to:'/Components/ThreeJS/ThreeCube',
            },
            {
              name: 'ThreeExample',
              to:'/Components/ThreeJS/ThreeExample',
            },
            {
              name: 'ThreeInteractive',
              to:'/Components/ThreeJS/ThreeInteractive',
            },
          ],
        },
        {
          // name: 'Project',
          // unit:[
          //   {
          //     name: 'animatedText',
          //     to:'/Project/HomeViewSlide',
          //   },
          //   {
          //     name: 'BackgroundColorChange',
          //     to:'/Project/HomeViewSlide',
          //   },
          //   {
          //     name: 'HomeViewSlide',
          //     to:'/Project/HomeViewSlide',
          //   },
          // ],
        },
      ],
      openCase: 0,
      targetCase: 0,
    };
  },
  computed: {
    currentItem() {
      return this.items[this.currentIndex];
    }
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll);
    this.updateFromHash();
    window.addEventListener('hashchange', this.updateFromHash);
  },
  methods: {
    // ↓↓↓Nav相關↓↓↓
    handleScroll(event) {
      if (event.deltaY > 0) {
        if (this.currentIndex < this.items.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
        this.updateHash();
      } else {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.items.length - 1;
        }
        this.updateHash();
      }
    },
    updateHash() {
      window.history.pushState({}, '', '/');
      window.location.hash = `#${this.items[this.currentIndex].id}`;
    },
    updateFromHash() {
      const hash = window.location.hash.replace('#', '');
      const index = this.items.findIndex(item => item.id === parseInt(hash));
      if (index !== -1) {
        this.currentIndex = index;
        this.openCase = 0;
      }
    },
    onSlideChange(temp) {
      this.carouselIndex = temp;
      this.targetCase = temp;
    },
    goSlideIndex(index) {
      if (index > this.lists.length - 1 || 0 > this.lists.length - 1) {
        return;
      }
      this.$refs.carousel.goFar(index);
    },
    navControl(index){
      this.currentIndex = index;
      this.targetNav = this.items[this.currentIndex].id;
      window.history.pushState({}, '', '/');
    },
    // ↑↑↑Nav相關↑↑↑

    // ↓↓↓Menu選擇↓↓↓
    changeCase(){
      this.openCase = this.lists[this.currentIndex].unit[this.targetCase];
      console.log(this.openCase);
    },
    // ↑↑↑Menu選擇↑↑↑

  },
  beforeUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('hashchange', this.updateFromHash);
  }
}
</script>

<template>
  <div class="vh-100 text-center text-white background-anime"
    style="text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);"
    :style="{ 'background-color': 'rgb(' + currentItem.color + ')' }">
    <div class="d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
        <div>
          <h3 class="float-md-start mb-0">我的作品集</h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a @click="navControl(index)" v-for="(item, index) in items" :key="item.id" :href="'#' + item.id"
              :class="['nav-link', { active: currentIndex === index }]">
              {{ item.title }}
            </a>
          </nav>
        </div>
      </header>
      <RouterView v-if="openCase"/>
      <transition v-if="!openCase" name="fade" mode="out-in">
        <div v-if="carouselVisible" :key="currentItem.id">
          <div class="px-3">
            <h1>{{ currentItem.title }}</h1>
            <p>{{ currentItem.description }}</p>
          </div>

          <div v-if="currentItem.id!=0">
            <carousel-3d ref="carousel"  
              @before-slide-change="onSlideChange"
              :onMainSlideClick="changeCase" 
              :display="5"
              :animationSpeed="150" 
              :minSwipeDistance="3"
              :width="300" 
              :height="300" 
              :controlsVisible="true">
              <slide class="border-0 rounded" v-for="(item, i) in lists[this.currentIndex].unit" :index="i" :key="i">
                <div class="card">
                  <div class="img-fluid" style="height: 300px;">
                    <img class="card-img-top" src="http://fakeimg.pl/300x300"
                      style="object-fit: cover; width: 100%; height: 100%">
                  </div>
                  <div class="position-absolute bottom-0 start-0 w-100 badge bg-dark" style="--bs-bg-opacity: 0.4">
                    <h5 class="title text-truncate">{{ item.name }}</h5>
                  </div>
                  <router-link :to="lists[this.currentIndex].unit[this.targetCase].to" class="stretched-link"></router-link>
                </div>
              </slide>
            </carousel-3d>
          </div>
        </div>
      </transition>

      <footer class="mt-auto text-white-50">
        <p>關於我的<a class="text-white" href="https://github.com/SaplingOuO" target="_blank">Github</a></p>
      </footer>
    </div>
  </div>
</template>

<style>
/* ↓↓↓Header↓↓↓ */
.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead, .nav-link:hover,
.nav-masthead, .nav-link:focus {
  color: #fff !important;
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link+.nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}

/* ↑↑↑Header↑↑↑ */


/* ↓↓↓main↓↓↓ */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none;
}

/* ↑↑↑main↑↑↑ */

.background-anime {
  transition: background-color 1s ease;
}

/* 定義淡入淡出的動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>