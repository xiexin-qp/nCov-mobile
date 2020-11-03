<template>
  <div class="apply-details">
    <Header title="申请详情" />
    <div class="msg-form">
      <div class="msg-top msg">
        <div class="apply-status" :style="{ background: getStatus(1)[2], color: getStatus(1)[1] }">
          {{ getStatus(1)[3] }}
        </div>
        <div class="msg-title">申请信息</div>
        <div class="msg-area">
          <div class="msg-item">
            <div class="msg-item-title">姓名：</div>
            <div class="msg-item-content">张学良</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">申请学校：</div>
            <div class="msg-item-content">旬阳中等职业学校</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">申请专业：</div>
            <div class="msg-item-content">化工技术</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">联系手机：</div>
            <div class="msg-item-content">13111111111</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">申请时间：</div>
            <div class="msg-item-content">2020/11/02 12:00:00</div>
          </div>
        </div>
      </div>
      <div class="msg-bottom msg">
        <div class="msg-title">详细信息</div>
        <div class="msg-area">
          <div class="msg-item">
            <div class="msg-item-title">年级：</div>
            <div class="msg-item-content">2020级</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">性别：</div>
            <div class="msg-item-content">男</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">民族：</div>
            <div class="msg-item-content">汉族</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">政治面貌：</div>
            <div class="msg-item-content">群众</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">学生来源：</div>
            <div class="msg-item-content">应届</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">毕业学校：</div>
            <div class="msg-item-content">旬阳五中</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">户口性质：</div>
            <div class="msg-item-content">农业</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">户口地址：</div>
            <div class="msg-item-content">陕西省安康市旬阳县XX村</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">所属派出所：</div>
            <div class="msg-item-content">旬阳派出所</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">居住类型：</div>
            <div class="msg-item-content">农村</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">家庭地址：</div>
            <div class="msg-item-content">旬阳县XX镇CC村</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">家长姓名：</div>
            <div class="msg-item-content">张作霖</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">家长手机：</div>
            <div class="msg-item-content">13111111111</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">与本人关系：</div>
            <div class="msg-item-content">父亲</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">是否监视人：</div>
            <div class="msg-item-content">是</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">健康状况：</div>
            <div class="msg-item-content">良好</div>
          </div>
          <div class="msg-item user-photo">
            <div class="msg-item-title">人脸照片：</div>
            <div class="msg-item-content photo">
              <img src="../../assets/close.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../component/Header'
export default {
  components: {
    Header,
  },
  methods: {
    getStatus(status) {
      return this.$getStatus(status)
    },
  },
}
</script>
<style lang="less" scoped>
.apply-details {
  height: 100vh;
  background-color: #f4f7fc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.msg-form {
  flex: 1;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;

  .msg {
    // border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 6px;
    padding: 18px;
    box-sizing: border-box;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.117647), 0 -3px 15px rgba(0, 0, 0, 0.117647);

    .msg-title {
      // margin-bottom: 20px;
      padding: 30px 0 40px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #333;
      font-size: 36px;
      font-weight: bolder;
      font-family: PingFang SC;
    }
    .msg-area {
      .msg-item {
        display: flex;
        margin-bottom: 10px;
        border-bottom: 1px solid rgba(204, 204, 204, 0.4);
        padding: 15px 0;

        .msg-item-title {
          width: 25%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #999;
        }
        .msg-item-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: #333;
        }
        .photo {
          img {
            width: 130px;
            height: 150px;
          }
        }
      }
      .msg-item:last-child {
        border-bottom: 0;
      }
      .user-photo {
        align-items: flex-start;
      }
    }
  }

  .msg-top {
    margin-bottom: 40px;
    position: relative;

    .apply-status {
      position: absolute;
      right: 0;
      top: 30px;
      border-top-left-radius: 35px;
      border-bottom-left-radius: 35px;
      width: 200px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      font-weight: bold;
    }
  }
}
</style>