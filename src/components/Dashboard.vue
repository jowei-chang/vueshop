<template>
  <div>
    <NavBar/>
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <SideBar></SideBar>

        <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';
import Alert from './AlertMessage';

export default {
  name: 'Dashboard',
  data () {
    return {}
  },
  components: {
    SideBar,
    NavBar,
    Alert,
  }
}
</script>

