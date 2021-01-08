<template>
  <div>
    <div class="wm-mini-header">
      <span class="wm-blue-transparent"></span>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="wm-mini-title">
              <h1>Contact Us</h1>
            </div>
            <div class="wm-breadcrumb">
              <ul>
                <li>
                  Home
                </li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wm-main-content">
      <div class="wm-main-section wm-contact-full wm-contact-full-inner">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="wm-contact-tab">
                <ul class="nav nav-tabs">
                  <li class="active">
                    <a href="#home" aria-controls="home" data-toggle="tab">Contact Us</a>
                  </li>
                  <li>
                    <a href="#profile" aria-controls="profile" data-toggle="tab">Information Details</a>
                  </li>
                </ul>

                <div class="tab-content">
                  <div class="tab-pane active" id="home">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="wm-map">
                          <div id="map"></div>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div class="wm-contact-form">
                          <span>Talk To Us Today</span>
                          <form>
                            <ul>
                              <li>
                                <i class="wmicon-black"></i>
                                <input
                                  type="text"
                                  value="Name"
                                  onblur="if(this.value == '') { this.value ='Name'; }"
                                  onfocus="if(this.value =='Name') { this.value = ''; }"
                                />
                              </li>
                              <li>
                                <i class="wmicon-symbol3"></i>
                                <input
                                  type="text"
                                  value="E-mail"
                                  onblur="if(this.value == '') { this.value ='E-mail'; }"
                                  onfocus="if(this.value =='E-mail') { this.value = ''; }"
                                />
                              </li>
                              <li>
                                <i class="wmicon-technology4"></i>
                                <input
                                  type="text"
                                  value="Phone"
                                  onblur="if(this.value == '') { this.value ='Phone'; }"
                                  onfocus="if(this.value =='Phone') { this.value = ''; }"
                                />
                              </li>
                              <li>
                                <i class="wmicon-web2"></i>
                                <textarea placeholder="Message"></textarea>
                              </li>
                              <li>
                                <input type="submit" value="Send Message" />
                              </li>
                            </ul>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane" id="profile">
                    <span class="wm-contact-title">Contact Info</span>
                    <div class="wm-contact-service">
                      <ul class="row">
                        <li class="col-md-4">
                          <span class="wm-service-icon">
                            <i class="wmicon-pin"></i>
                          </span>
                          <h5 class="wm-color">Address</h5>
                          <p>195 Cooks Mine Road Espanola, NM 87532</p>
                        </li>
                        <li class="col-md-4">
                          <span class="wm-service-icon">
                            <i class="wmicon-phone"></i>
                          </span>
                          <h5 class="wm-color">Phone & Fax</h5>
                          <p>+1 505-753-5656 +1 505-753-4437</p>
                        </li>
                        <li class="col-md-4">
                          <span class="wm-service-icon">
                            <i class="wmicon-letter"></i>
                          </span>
                          <h5 class="wm-color">E-mail</h5>
                          <p>
                            <a
                              href="http://webmarce.com/cdn-cgi/l/email-protection#214f404c4461444c40484d0f424e4c"
                            >
                              <span
                                class="__cf_email__"
                                data-cfemail="6d24030b022d1803041b081f1e041914430e0200"
                              >[email&#160;protected]</span>
                            </a>
                            <a
                              href="http://webmarce.com/cdn-cgi/l/email-protection#8ee0efe3ebceebe3efe7e2a0ede1e3"
                            >
                              <span
                                class="__cf_email__"
                                data-cfemail="dcafa9acacb3aea89ca9b2b5aab9aeafb5a8a5f2bfb3b1"
                              >[email&#160;protected]</span>
                            </a>
                          </p>
                        </li>
                      </ul>
                    </div>
                    <ul class="contact-social-icon">
                      <li>
                        <a href="#">
                          <i class="wm-color wmicon-social5"></i> Facebook
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="wm-color wmicon-social4"></i> Twitter
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="wm-color wmicon-social3"></i> Linkedin
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="wm-color wmicon-vimeo"></i> Vimeo
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>