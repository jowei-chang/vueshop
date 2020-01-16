<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- Button trigger modal -->
    <div class="text-right mt-3">
      <button class="btn btn-primary btn-sm" @click="openModal('create')">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120px">分類</th>
          <th>產品名稱</th>
          <th width="120px">原價</th>
          <th width="120px">售價</th>
          <th width="100px">是否啟用</th>
          <th width="140">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <!--<button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>-->
            <button class="btn btn-outline-primary btn-sm" @click="openModal('update', item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)" >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagniation -->
     <Pagination :pagination="pagination" @changePage="getProducts"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img img="#"
                  class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    v-model="tempProduct.title" placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      v-model="tempProduct.category" placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      v-model="tempProduct.unit" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      v-model="tempProduct.origin_price" placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      v-model="tempProduct.price" placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" id="is_enabled">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="updateProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 如果有用ESLint可是用下面註解  讓$可以使用
/* global $ */
import $ from 'jquery';
import Pagination from '@/components/Pagination';

export default {
  name: 'Products',
  components: {
    Pagination
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      mType: '',
      isLoading: false,
      status: {
        fileUploading: false,
      }
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products/?page=${page}`;
      const vm = this;
      vm.isLoading = true;

      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      })
    },
    openModal(modalType, item){
      const vm = this;
      if (modalType == 'create'){
        vm.mType = 'create';
        this.tempProduct = {};
        document.getElementById('customFile').value= '';
        $('#productModal').modal('show');
      } else if(modalType == 'update') {
        //Object.assign({}, item)   可以建立新物件 且跟注入的item無關(不會資料綁定)
        vm.mType = 'update';
        this.tempProduct = Object.assign({}, item);
        $('#productModal').modal('show');
      } else if(modalType == 'delete') {
        vm.mType = 'delete';
        this.tempProduct = Object.assign({}, item);
        $('#delProductModal').modal('show');
      }
    },
    updateProduct() {
      // 建立新商品的 api
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      // 修改商品/刪除商品的 api
      if (vm.mType == 'update') {
        console.log('update');
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      } else if (vm.mType == 'delete') {
        console.log('delete');
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'delete';
      } else {
        console.log('create');
      }
      console.log(api);

      if (vm.mType == 'delete') {
        this.$http.delete(api).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            $('#delProductModal').modal('hide');
            vm.getProducts();
          } else {
            $('#delProductModal').modal('hide');
            vm.getProducts();
            console.log('刪除失敗')
          }
        })
      } else {
        this.$http[httpMethod](api,{ data: vm.tempProduct }).then((response) => {
          console.log(response.data);
          if (response.data.success) {
            $('#productModal').modal('hide');
            vm.getProducts();
          } else {
            $('#productModal').modal('hide');
            vm.getProducts();
            console.log('新增失敗')
          }
        })
      }
    },
    uploadFile() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          // console.log(vm.tempProduct);
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          vm.status.fileUploading = false;
        } else {
          this.$bus.$emit('message:push',response.data.message, 'danger');
          vm.status.fileUploading = false;
        }
      });
    }
  },
  created() {
    this.getProducts();
  }
}
</script>

