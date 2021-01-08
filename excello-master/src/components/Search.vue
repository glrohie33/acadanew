<template>
  <div>
    <div class="wm-mini-header">
      <span class="wm-blue-transparent"></span>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="wm-mini-title">
              <h1>Our Courses</h1>
            </div>
            <div class="wm-breadcrumb">
              <ul>
                <li>Home</li>
                <li>Search</li>
                <li>{{cat}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wm-main-content">
      <!--// Main Section \\-->
      <div class="wm-main-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12" style="text-align:center;">
              <div
                class="wm-search-course"
                style="max-width:600px; margin:0px auto; float:none; overflow:hidden; border-radius:5px;"
              >
                <div v-show="feedback" style="position:relative;">
                  <span class="fa fa-close absolute" @click="feedback = false"></span>
                  <p v-for="error in errors" v-bind:key="error" class="text-danger">{{error}}</p>
                  <p class="text-success">{{success}}</p>
                </div>
                <form>
                  <ul>
                    <li class="search">
                      <input
                        type="text"
                        list="hints"
                        placeholder="Search For course"
                        v-model="query"
                        @blur="hints=[]"
                        @keypress="hint()"
                      />
                      <i class="wmicon-search"></i>
                      <datalist v-if="cat == 'institutions'" class="hints" id="hints">
                        <option
                          v-for="(x,index) in hints"
                          :key="index"
                          :value="x.fullName.toLowerCase()"
                        >{{x.fullName}}</option>
                      </datalist>

                      <datalist v-if="cat == 'courses'" class="hints" id="hints">
                        <option
                          style="padding:10px; font-weight:bold;"
                          v-for="(x,index) in hints"
                          :key="index"
                          :value="x.name.toLowerCase()"
                        >{{x.name}}</option>
                      </datalist>
                    </li>
                    <li>
                      <div class="wm-apply-select">
                        <select v-model="cat">
                          <option value>Select Category</option>
                          <option value="institutions">Institutions</option>
                          <option value="courses">Courses</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <input type="button" value="Search course" @click="searchCourse()" />
                    </li>
                  </ul>
                </form>
              </div>
            </div>
            <div class="col-md-12">
              <div class="wm-view-btn">
                <a href="#" class="wmicon-squares active"></a>
                <a href="#" class="wmicon-signs"></a>
              </div>
            </div>
            <div class="wm-courses wm-courses-popular" v-if="$route.params.c == 'courses'">
              <ul class="row">
                <li
                  class="col-md-4 col-sm-12"
                  v-for="(x,index) in data"
                  :key="index"
                  v-if=" index >= start  && index < end"
                >
                  <div class="wm-courses-popular-wrap">
                    <figure>
                      <figcaption>
                        <h6>
                          <a href="#">{{x.name}}</a>
                        </h6>
                      </figcaption>
                    </figure>
                    <div class="wm-popular-courses-text">
                      <h6>
                        <a href="#">{{x.description}}</a>
                      </h6>
                      <p>
                        <Strong>Utme:</Strong>
                        {{x.utme}}
                      </p>
                      <p>
                        <strong>Ssce:</strong>
                        {{x.ssce}}
                      </p>
                      <p>
                        <strong>Req:</strong>
                        {{x.requirement}}
                      </p>
                      <div class="wm-courses-price">
                        <span>{{x.institution}}</span>
                      </div>
                      <ul>
                        <li></li>
                        <li>
                          <a href="#" class="wm-color"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="wm-courses wm-courses-popular" v-if="$route.params.c == 'institutions'">
              <ul class="row">
                <li
                  class="col-md-4 col-sm-12"
                  v-for="(x,index) in data"
                  :key="index"
                  v-if="  index >= start  && index < end "
                >
                  <div class="wm-courses-popular-wrap">
                    <figure>
                      <a href="#">
                        <img :src="x.logoUrl" alt />
                        <span class="wm-popular-hover">
                          <small>see course</small>
                        </span>
                      </a>
                      <figcaption>
                        <h6>
                          <a href="#">{{x.fullName}}</a>
                        </h6>
                      </figcaption>
                    </figure>
                    <div class="wm-popular-courses-text">
                      <p>
                        <strong>Location:</strong>
                        {{x.shortName}}
                      </p>
                      <p>
                        <strong>Website:</strong>
                        {{x.website}}
                      </p>
                      <p>
                        <strong>Email:</strong>
                        {{x.email}}
                      </p>
                      <p>
                        <strong>Phone Number:</strong>
                        {{x.phoneNumber}}
                      </p>
                      <p>
                        <strong>Institution Type:</strong>
                        {{x.institutionType}}
                      </p>
                      <p>
                        <strong>Institution Status:</strong>
                        {{x.institutionStatus}}
                      </p>
                      <p>
                        <strong>Description:</strong>
                        {{x.description}}
                      </p>

                      <div class="wm-courses-price">
                        <span>$32</span>
                      </div>
                      <ul>
                        <li>
                          <a href="#" class="wm-color">
                            <i class="wmicon-social7"></i> 342
                          </a>
                        </li>
                        <li>
                          <a href="#" class="wm-color">
                            <i class="wmicon-social6"></i>
                            {{index}}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="wm-pagination" v-if="pag > 0">
              <ul>
                <li>
                  <a href="#" aria-label="Previous">
                    <i class="wmicon-arrows4"></i> Previous
                  </a>
                </li>
                <li
                  class
                  v-for="(x,index) in pag"
                  :id="`page${index}`"
                  :key="index"
                  @click="setIndex(index)"
                  :class="index == 0 ? 'active' : '' "
                >
                  <a href="#">{{index + 1}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--// Main Section \\-->
  </div>
</template>
<script>
import dummy from "./dummydata.js";
export default {
  data() {
    return {
      data: [],
      view: 15,
      start: 0,
      end: 15,
      pag: 0,
      index: 0,
      query: "",
      cat: "",
      url: "",
      success: "",
      feedback: false,
      errors: [],
      success: "",
      hints: []
    };
  },
  created() {
    this.cat = this.$route.params.c ? this.$route.params.c : "";
    this.query = this.$route.params.s ? this.$route.params.s : "";
    this.run();
  },

  methods: {
    searchCourse() {
      this.errors = [];
      var query = this.query;
      var cat = this.cat;
      if (cat.length < 1) {
        this.feedback = true;
        this.errors.push("please select the where you want to search");
      } else {
        if (query.length > 0) {
          this.$router.push(`/search/${cat}/${query}`);
          this.run();
        } else {
          this.feedback = true;
          this.errors.push("Search Field Is Not");
        }
      }
    },
    run() {
      if (this.cat == "courses") {
        this.url =
          this.indexurl + "api/Search/CourseSearch?keyword=" + this.query;
      } else if (this.cat == "institutions") {
        this.url =
          this.indexurl + "api/Search/InstitutionSearch?keyword=" + this.query;
      }
      this.search();
    },
    search() {
      this.axios
        .get(this.url)
        .then(resp => {
          if (resp.status == 200) {
            this.data = resp.data;
            this.setView();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setView() {
      var pag = this.data.length / this.view;
      if (pag > 0) {
        this.pag = Math.ceil(pag);
      }
    },
    setIndex(index) {
      var pele = document.getElementById("page" + this.index);
      var ele = document.getElementById("page" + index);
      var start = index * this.view;
      var end = index * this.view + this.view;
      this.start = start;
      this.end = end;
      this.index = index;
      pele.classList.toggle("active");
      ele.classList.toggle("active");
    },
    hint() {
      this.errors = [];
      var cat = this.cat;
      if (cat.length < 1) {
        this.feedback = true;
        this.errors.push("please select the category where you want to search");
      } else {
        var store = this.$store.state.data;

        if (this.cat == "institutions") {
          var search = this.query.toLowerCase();
          this.hints = store.institutionHints.filter(ele => {
            return ele.fullName.toLowerCase().search(search) > -1;
          });
        } else if (this.cat == "courses") {
          var search = this.search;
          this.hints = store.courseHints.filter(ele => {
            return ele.name.toLowerCase().search(search) > -1;
          });
        }
      }
    }
  }
};
</script>