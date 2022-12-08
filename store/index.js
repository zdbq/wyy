export default new Vuex.Store({
    // 定义全局状态（状态就是数据）
    state:{
      sj:{}
    },
    // 定义修改状态的方法
    mutations:{
      //该方法，修改汽车信息
      updateCar(state,val){
          state.sj = val
      }
    }
  })