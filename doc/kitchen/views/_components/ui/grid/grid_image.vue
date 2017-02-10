<template>
  <section class="grid-image" :class="{ 'contain': display_type == 'contain' }"
           :style="{ 'height': row_num * 50 + 'px' }" :id="id">

    <div class="grid-image-wrap">
      <div class="the-image"
           :style="{ 'background': 'url(' + image_url + ') no-repeat center/' + display_type }">
      </div>
    </div>

    <header class="image-header">{{ title }}
      <span class="image-size" v-if="!!min_size && min_size.length == 2">#
        <span>{{ min_size[0] == '' ? '不限' : min_size[0] + 'px'  }}</span> *
        <span>{{ min_size[1] == '' ? '不限' : min_size[1] + 'px' }}</span>
      </span>
    </header>

    <div class="image-actions pure-g">
      <a class="image-action pure-u-1-1 shadow-deep do-upload"
         v-if="!!min_size" href="javascript:;" :id="button_id">
        <icon :name="'i-upload'" :color="'#fff'"></icon>
        上传
      </a>
      <a class="image-action pure-u-1-2 shadow-deep do-preview" href="javascript:;"
         v-show="!!image_url" @click="is_preview_show = true">
        <icon :name="'i-image'" :color="'#fff'"></icon>
      </a>
      <a class="image-action pure-u-1-2 shadow-deep do-download" target="_blank"
         v-show="!!image_url" :href="image_url">
        <icon :name="'i-new-tab'" :color="'#fff'"></icon>
      </a>
    </div>

    <aside class="image-progress" v-show="is_progress_show" :style="{ 'width': progress + '%' }"></aside>

    <!-- ------------------------------------------------------------------------------------------- -->
    <!-- 预览弹窗 -->
    <modal :use_padding="false" v-if="is_preview_show" @close-modal="is_preview_show = false">
      <img class="image-preview" :src="image_url">
    </modal>

  </section>
</template>

<style scoped lang="stylus">
  @import './../../../_styles/variables';
  .grid-image { position: relative; background: #fff; min-height: 100px !important; }
  .grid-image-wrap .the-image { position: absolute; top: 0; left: 0; right: 0; bottom: 0; transition: filter .3s ease; }
  .image-header { z-index: 110; position: absolute; top: 0; left: 0; right: 0; height: 25px; line-height: 25px; padding: 0 10px; color: #fff; overflow: hidden; text-overflow: ellipsis; font-weight: bold; background: linear-gradient(to bottom right, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0)); border-radius: 2px 2px 1px 1px; transition: all .3s; }
  .image-header .image-size { margin-left: 8px; font-weight: 200; }
  .image-actions { z-index: 110; opacity: 0; position: absolute; top: 50%; left: 50%; height: 81px; width: 81px; margin: -30px 0 0 -40px; transition: all .3s; }
  .image-actions .image-action { height: 40px; line-height: 40px; background: rgba(0, 0, 0, .8); color: #fff; border-radius: 2px; font-size: 14px; text-align: center; text-decoration: none; cursor: pointer; transition: all .2s; }
  .image-actions .image-action:hover { background: rgba(0, 0, 0, .5); }
  .image-actions .image-action.do-preview { width: 40px; margin-top: 1px; }
  .image-actions .image-action.do-download { width: 40px; margin-top: 1px; margin-left: 1px; }
  .image-actions .image-action .icon { vertical-align: -3px; width: 15px; height: 15px; }
  .image-progress { position: absolute; z-index: 150; left: 0; top: 0; height: 3px; background: success; transition: width .6s ease; }
  .image-preview { display: block; width: 100%; }
  /* 状态 */
  .grid-image:hover .the-image { filter: blur(2px) brightness(1.1); z-index: 100; }
  .grid-image:hover .image-actions { opacity: 1; }
  .grid-image.contain .grid-image-wrap .the-image { top: 20px; left: 10px; right: 10px; bottom: 10px; }
</style>

<script>
  /* global plupload o:true */
  //  import plupload from 'plupload/js/plupload.dev.js';
  //  import moxie from 'plupload/js/moxie.min.js';
  export default {
    props: {
      row_num: { type: Number, default: 1 },
      image_url: String,
      title: { type: String, default: 'Image' },
      min_size: Array,
      max_volume: { type: String, default: '1mb' },
      index: Number,
      display_type: { type: String, default: 'cover' }
    },
    data () {
      return {
        id: 'pl_' + Math.random(),
        button_id: 'pl_' + Math.random(),
        progress: 0,
        is_progress_show: false,
        is_preview_show: false
      };
    },
    mounted () {
      if (!this.min_size) return;
      var uploader = new plupload.Uploader({
        browse_button: this.button_id,
        url: '/admin/site/uploadPic',
        drop_element: this.id,
        filters: {
          mime_types: [{ title: 'Image files', extensions: 'jpg,gif,png' }],
          max_file_size: this.max_volume,
          min_img_resolution: this.min_size
        },
        resize: {
          quality: 100
        }
      });

      uploader.bind('FilesAdded', (up, files) => {
        this.progress = 0;
        this.is_progress_show = true;
        uploader.start();
      });

      uploader.bind('UploadProgress', (up, file) => {
        this.progress = file.percent;
      });

      uploader.bind('FileUploaded', (up, file, result) => {
        setTimeout(() => {
          this.is_progress_show = false;
          this.progress = 0;
          this.$emit('image-uploaded', JSON.parse(result.response).data, this.index);
        }, 500);
      });

      uploader.bind('Error', (up, err) => {
        if (err.code === plupload.FILE_SIZE_ERROR) {
          this.$root.$emit('action-feedback', {
            msg: '图片体积不能大于' + this.max_volume + '!',
            mood: 'danger'
          });
        } else {
          this.$root.$emit('action-feedback', {
            msg: err.message,
            mood: 'danger'
          });
        }
      });

      uploader.setOption();

      this.$nextTick(() => {
        uploader.init();
      });

      plupload.addFileFilter('min_img_resolution', (minSize, file, cb) => {
        var self = this;
        var img = new o.Image();

        function finalize(result) {
          img.destroy();
          img = null;

          if (!result) {
            self.$root.$emit('action-feedback', {
              msg: '图片尺寸不能小于' + minSize[0] + 'px * ' + minSize[1] + 'px!',
              mood: 'danger'
            });
          }
          cb(result);
        }

        img.onload = () => {
          console.log(minSize);
          finalize(img.width >= minSize[0] && img.height >= minSize[1]);
        };
        img.onerror = (err) => {
          console.log(err);
          finalize(false);
        };
        console.log(file);
        img.load(file.getSource());
      });
    }
  };
</script>
