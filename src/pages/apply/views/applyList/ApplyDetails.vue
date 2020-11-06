<template>
  <div class="apply-details">
    <Header title="申请详情" />
    <div class="msg-form">
      <div class="msg-top msg">
        <div class="apply-status" :style="{ background: getStatus(formData.state)[2], color: getStatus(formData.state)[1] }">
          {{ getStatus(formData.state)[3] }}
        </div>
        <div class="msg-title">申请信息</div>
        <div class="msg-area">
          <div class="msg-item">
            <div class="msg-item-title">姓名：</div>
            <div class="msg-item-content">{{ formData.studentName || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">申请学校：</div>
            <div class="msg-item-content">{{ formData.schoolName || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">申请专业：</div>
            <div class="msg-item-content">{{ formData.majorName || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">联系手机：</div>
            <div class="msg-item-content">{{ formData.mobile || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">申请时间：</div>
            <div class="msg-item-content">{{ formData.schoolName || '' }}</div>
          </div>
        </div>
      </div>
      <div class="msg-bottom msg">
        <div class="msg-title">详细信息</div>
        <div class="msg-area">
          <div class="msg-item">
            <div class="msg-item-title">年级：</div>
            <div class="msg-item-content">{{ formData.grade || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">性别：</div>
            <div class="msg-item-content">{{ formData.gender || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">民族：</div>
            <div class="msg-item-content">{{ formData.nationality || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">政治面貌：</div>
            <div class="msg-item-content">{{ formData.politicalOutlook || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">学生来源：</div>
            <div class="msg-item-content">{{ formData.studentSource || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">毕业学校：</div>
            <div class="msg-item-content">{{ formData.graduationSchool || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">户口性质：</div>
            <div class="msg-item-content">{{ formData.registrationNature || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">户口地址：</div>
            <div class="msg-item-content">{{ formData.registrationAddress || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">所属派出所：</div>
            <div class="msg-item-content">{{ formData.policeStation || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">居住类型：</div>
            <div class="msg-item-content">{{ formData.residentialType || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">家庭地址：</div>
            <div class="msg-item-content">{{ formData.homeAddress || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">家长姓名：</div>
            <div class="msg-item-content">{{ formData.parentName || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">家长手机：</div>
            <div class="msg-item-content">{{ formData.parentMobile || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">与本人关系：</div>
            <div class="msg-item-content">{{ formData.relationship || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">是否监视人：</div>
            <div class="msg-item-content">{{ formData.hasGuardian || '' }}</div>
          </div>
          <div class="msg-item">
            <div class="msg-item-title">健康状况：</div>
            <div class="msg-item-content">{{ formData.healthyState || '' }}</div>
          </div>
          <div class="msg-item user-photo">
            <div class="msg-item-title">人脸照片：</div>
            <div class="msg-item-content photo">
              <img :src="formData.photoUrl || ''" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../component/Header'
import { actions } from '../../store/index'
export default {
  components: {
    Header,
  },
  data() {
    return {
      formData: {},
    }
  },
  mounted() {
    const id = this.$route.query.id
    if (!id) {
      this.$router.go(-1)
    }
    this.getDetails(id)
  },
  methods: {
    getStatus(status) {
      return this.$getStatus(status)
    },
    getDetails(id) {
      actions.getApplyDetails(id).then((res) => {
        if (res && res.code === 200) {
          this.formData = res.data || {}
        }
      })
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