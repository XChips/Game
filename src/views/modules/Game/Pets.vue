<template>
  <div class="XCInfo">【星火Starry】工会ID（666888）<br>招峡谷和拔河活跃人员</div>
  <div class="petsCont">
    <div class="petsPage">
      <div class="title">合成目标
        <el-tooltip effect="dark" placement="bottom">
          <el-icon>
            <QuestionFilled/>
          </el-icon>
          <template v-slot:content>
            <div>
              仅展示分数前十的配方<br>
              并列排名的配方超过十个仍会展示<br>
              标记【一定不要】时，会强制将含有该合成结果的配方删除<br>
              建议最多标记两个【一定不要】<br>
            </div>
          </template>
        </el-tooltip>
      </div>
      <el-form ref="ruleForm" label-width="90px" label-position="top" :model="ruleForm">
        <el-form-item class="oneRow" label="目标等级" prop="level">
          <el-radio-group v-model="ruleForm.level" @change="initForm">
            <el-radio v-for="(option, index) in levelOption" :key="index" :value="option.label">{{option.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-for="(item, index) in FormConfig" :key="index">
          <el-form-item v-show="ruleForm.level === item.level" class="oneRow" :label="item.label" :prop="item.prop">
            <el-rate v-bind="item.attrs" :ref="item.prop" v-model="ruleForm[item.prop]"
                     @change="computedData(ruleForm.level, 'S', reSetData())"/>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <div class="petsPage">
      <div class="title">S级合成配方</div>
      <div v-for="(item,index) in formulaRuleS" :key="`S${index}`" :style="`color: rgba(255,0,0,${item.value/12})`">
        <span>{{DataName[item.form[0]]}}+{{DataName[item.form[1]]}}:{{item.value}}</span>
      </div>
      <div class="title">A级合成配方</div>
      <div v-for="(item,index) in formulaRuleA" :key="`A${index}`" :style="`color: rgba(255,0,0,${item.value/12})`">
        <span>{{DataName[item.form[0]]}}+{{DataName[item.form[1]]}}:{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {cloneDeep} from 'lodash-es';

export default {
  name: 'Pets',
  data() {
    return {
      value: 3,
      formulaRule: [
        {level: 'S', value: 0, form: ['A1', 'A1'], out: ['S2', 'S5', 'S6', 'S9']},
        {level: 'S', value: 0, form: ['A1', 'A2'], out: ['S1', 'S5', 'S6', 'SA']},
        {level: 'S', value: 0, form: ['A1', 'A3'], out: ['S2', 'S5', 'S6', 'SA']},
        {level: 'S', value: 0, form: ['A1', 'A4'], out: ['S2', 'S5', 'S7', 'S9']},
        {level: 'S', value: 0, form: ['A1', 'A5'], out: ['S2', 'S4', 'S7', 'S9']},
        {level: 'S', value: 0, form: ['A1', 'A6'], out: ['S1', 'S4', 'S8', 'S9']},
        {level: 'S', value: 0, form: ['A2', 'A2'], out: ['S1', 'S4', 'S6', 'S9']},
        {level: 'S', value: 0, form: ['A2', 'A3'], out: ['S1', 'S5', 'S8', 'SA']},
        {level: 'S', value: 0, form: ['A2', 'A4'], out: ['S2', 'S4', 'S7', 'SA']},
        {level: 'S', value: 0, form: ['A2', 'A5'], out: ['S1', 'S7', 'SB', 'SC']},
        {level: 'S', value: 0, form: ['A2', 'A6'], out: ['S3', 'S7', 'SA', 'SC']},
        {level: 'S', value: 0, form: ['A3', 'A3'], out: ['S1', 'S8', 'SB', 'SC']},
        {level: 'S', value: 0, form: ['A3', 'A4'], out: ['S3', 'S8', 'S9', 'SC']},
        {level: 'S', value: 0, form: ['A3', 'A5'], out: ['S2', 'S4', 'S6', 'S9']},
        {level: 'S', value: 0, form: ['A3', 'A6'], out: ['S3', 'S5', 'S6', 'SB']},
        {level: 'S', value: 0, form: ['A4', 'A4'], out: ['S3', 'S4', 'S7', 'SB']},
        {level: 'S', value: 0, form: ['A4', 'A5'], out: ['S3', 'S8', 'SB', 'SC']},
        {level: 'S', value: 0, form: ['A4', 'A6'], out: ['S3', 'S4', 'S8', 'SA']},
        {level: 'S', value: 0, form: ['A5', 'A5'], out: ['S1', 'S8', 'SB', 'SC']},
        {level: 'S', value: 0, form: ['A5', 'A6'], out: ['S2', 'S5', 'S7', 'SA']},
        {level: 'S', value: 0, form: ['A6', 'A6'], out: ['S3', 'S6', 'SB', 'SC']},
        {level: 'SS', value: 0, form: ['S1', 'S1'], out: ['SS2', 'SS5', 'SSB', 'SSC']},
        {level: 'SS', value: 0, form: ['S1', 'S2'], out: ['SS1', 'SS4', 'SS7', 'SS9']},
        {level: 'SS', value: 0, form: ['S1', 'S3'], out: ['SS3', 'SS5', 'SS6', 'SS8']},
        {level: 'SS', value: 0, form: ['S1', 'S4'], out: ['SS1', 'SS3', 'SS8', 'SSA']},
        {level: 'SS', value: 0, form: ['S1', 'S5'], out: ['SS5', 'SS8', 'SSA', 'SSC']},
        {level: 'SS', value: 0, form: ['S1', 'S6'], out: ['SS1', 'SS3', 'SS5', 'SSC']},
        {level: 'SS', value: 0, form: ['S1', 'S7'], out: ['SS4', 'SS6', 'SS8', 'SSB']},
        {level: 'SS', value: 0, form: ['S1', 'S8'], out: ['SS2', 'SS3', 'SSA', 'SSB']},
        {level: 'SS', value: 0, form: ['S1', 'S9'], out: ['SS4', 'SS7', 'SS8', 'SSB']},
        {level: 'SS', value: 0, form: ['S1', 'SA'], out: ['SS1', 'SS5', 'SS7', 'SS9']},
        {level: 'SS', value: 0, form: ['S1', 'SB'], out: ['SS1', 'SS4', 'SS5', 'SS8']},
        {level: 'SS', value: 0, form: ['S1', 'SC'], out: ['SS1', 'SS9', 'SSA', 'SSB']},
        {level: 'SS', value: 0, form: ['S2', 'S2'], out: ['SS3', 'SS5', 'SS7', 'SS9']},
        {level: 'SS', value: 0, form: ['S2', 'S3'], out: ['SS1', 'SS8', 'SSA', 'SSB']},
        {level: 'SS', value: 0, form: ['S2', 'S4'], out: ['SS1', 'SS5', 'SS8', 'SSA']},
        {level: 'SS', value: 0, form: ['S2', 'S5'], out: ['SS3', 'SS4', 'SS6', 'SSB']},
        {level: 'SS', value: 0, form: ['S2', 'S6'], out: ['SS2', 'SS4', 'SS7', 'SS8']},
        {level: 'SS', value: 0, form: ['S2', 'S7'], out: ['SS1', 'SS3', 'SS9', 'SSC']},
        {level: 'SS', value: 0, form: ['S2', 'S8'], out: ['SS2', 'SS3', 'SS9', 'SSA']},
        {level: 'SS', value: 0, form: ['S2', 'S9'], out: ['SS1', 'SS5', 'SS6', 'SSC']},
        {level: 'SS', value: 0, form: ['S2', 'SA'], out: ['SS1', 'SS2', 'SS5', 'SS6']},
        {level: 'SS', value: 0, form: ['S2', 'SB'], out: ['SS1', 'SS3', 'SS5', 'SSC']},
        {level: 'SS', value: 0, form: ['S2', 'SC'], out: ['SS1', 'SS2', 'SS3', 'SSA']},
        {level: 'SS', value: 0, form: ['S3', 'S3'], out: ['SS1', 'SS2', 'SS3', 'SSC']},
        {level: 'SS', value: 0, form: ['S3', 'S4'], out: ['SS3', 'SS4', 'SS5', 'SS6']},
        {level: 'SS', value: 0, form: ['S3', 'S5'], out: ['SS7', 'SS8', 'SSB', 'SSC']},
        {level: 'SS', value: 0, form: ['S3', 'S6'], out: ['SS4', 'SS8', 'SSB', 'SSC']},
        {level: 'SS', value: 0, form: ['S3', 'S7'], out: ['SS2', 'SS5', 'SS9', 'SSA']},
        {level: 'SS', value: 0, form: ['S3', 'S8'], out: ['SS1', 'SS6', 'SS7', 'SSB']},
        {level: 'SS', value: 0, form: ['S3', 'S9'], out: ['SS2', 'SS3', 'SS6', 'SSC']},
        {level: 'SS', value: 0, form: ['S3', 'SA'], out: ['SS4', 'SS6', 'SS7', 'SSC']},
        {level: 'SS', value: 0, form: ['S3', 'SB'], out: ['SS4', 'SS6', 'SS7', 'SSB']},
        {level: 'SS', value: 0, form: ['S3', 'SC'], out: ['SS4', 'SS7', 'SS8', 'SSA']},
        {level: 'SS', value: 0, form: ['S4', 'S4'], out: ['SS2', 'SS6', 'SS7', 'SSA']},
        {level: 'SS', value: 0, form: ['S4', 'S5'], out: ['SS2', 'SS6', 'SS8', 'SSB']},
        {level: 'SS', value: 0, form: ['S4', 'S6'], out: ['SS1', 'SS2', 'SSA', 'SSB']},
        {level: 'SS', value: 0, form: ['S4', 'S7'], out: ['SS2', 'SS5', 'SSA', 'SSC']},
        {level: 'SS', value: 0, form: ['S4', 'S8'], out: ['SS4', 'SS5', 'SSA', 'SSB']},
        {level: 'SS', value: 0, form: ['S4', 'S9'], out: ['SS4', 'SS7', 'SSB', 'SSC']},
        {level: 'SS', value: 0, form: ['S4', 'SA'], out: ['SS4', 'SS6', 'SS7', 'SSC']},
        {level: 'SS', value: 0, form: ['S4', 'SB'], out: ['SS5', 'SS6', 'SS9', 'SSB']},
        {level: 'SS', value: 0, form: ['S4', 'SC'], out: ['SS1', 'SS3', 'SS6', 'SSC']},
        {level: 'SS', value: 0, form: ['S5', 'S5'], out: ['SS1', 'SS9', 'SSA', 'SSB']},
        {level: 'SS', value: 0, form: ['S5', 'S6'], out: ['SS3', 'SS6', 'SS9', 'SSC']},
        {level: 'SS', value: 0, form: ['S5', 'S7'], out: ['SS4', 'SS6', 'SS7', 'SS9']},
        {level: 'SS', value: 0, form: ['S5', 'S8'], out: ['SS1', 'SS7', 'SS9', 'SSC']},
        {level: 'SS', value: 0, form: ['S5', 'S9'], out: ['SS2', 'SS3', 'SS5', 'SS9']},
        {level: 'SS', value: 0, form: ['S5', 'SA'], out: ['SS1', 'SS2', 'SS8', 'SSB']},
        {level: 'SS', value: 0, form: ['S5', 'SB'], out: ['SS2', 'SS4', 'SS8', 'SSC']},
        {level: 'SS', value: 0, form: ['S5', 'SC'], out: ['SS2', 'SS4', 'SS5', 'SS8']},
        {level: 'SS', value: 0, form: ['S6', 'S6'], out: ['SS4', 'SS8', 'SS9', 'SSA']},
        {level: 'SS', value: 0, form: ['S6', 'S7'], out: ['SS4', 'SS5', 'SS6', 'SSB']},
        {level: 'SS', value: 0, form: ['S6', 'S8'], out: ['SS2', 'SS8', 'SS9', 'SSB']},
        {level: 'SS', value: 0, form: ['S6', 'S9'], out: ['SS2', 'SS5', 'SS7', 'SSC']},
        {level: 'SS', value: 0, form: ['S6', 'SA'], out: ['SS2', 'SS4', 'SS9', 'SSC']},
        {level: 'SS', value: 0, form: ['S6', 'SB'], out: ['SS2', 'SS3', 'SS7', 'SS8']},
        {level: 'SS', value: 0, form: ['S6', 'SC'], out: ['SS3', 'SS5', 'SS9', 'SSB']},
        {level: 'SS', value: 0, form: ['S7', 'S7'], out: ['SS1', 'SS3', 'SS6', 'SS7']},
        {level: 'SS', value: 0, form: ['S7', 'S8'], out: ['SS1', 'SS2', 'SS6', 'SS7']},
        {level: 'SS', value: 0, form: ['S7', 'S9'], out: ['SS6', 'SS7', 'SS9', 'SSA']},
        {level: 'SS', value: 0, form: ['S7', 'SA'], out: ['SS1', 'SS3', 'SS7', 'SSB']},
        {level: 'SS', value: 0, form: ['S7', 'SB'], out: ['SS1', 'SS2', 'SS4', 'SSC']},
        {level: 'SS', value: 0, form: ['S7', 'SC'], out: ['SS2', 'SS7', 'SS9', 'SSC']},
        {level: 'SS', value: 0, form: ['S8', 'S8'], out: ['SS3', 'SS5', 'SS8', 'SSC']},
        {level: 'SS', value: 0, form: ['S8', 'S9'], out: ['SS2', 'SS7', 'SSB', 'SSA']},
        {level: 'SS', value: 0, form: ['S8', 'SA'], out: ['SS4', 'SS5', 'SS7', 'SSA']},
        {level: 'SS', value: 0, form: ['S8', 'SB'], out: ['SS5', 'SS6', 'SS9', 'SSA']},
        {level: 'SS', value: 0, form: ['S8', 'SC'], out: ['SS3', 'SS4', 'SS9', 'SSA']},
        {level: 'SS', value: 0, form: ['S9', 'S9'], out: ['SS1', 'SS4', 'SS8', 'SS9']},
        {level: 'SS', value: 0, form: ['S9', 'SA'], out: ['SS2', 'SS8', 'SS9', 'SSB']},
        {level: 'SS', value: 0, form: ['S9', 'SB'], out: ['SS3', 'SS5', 'SS8', 'SS9']},
        {level: 'SS', value: 0, form: ['S9', 'SC'], out: ['SS6', 'SS8', 'SSB', 'SSA']},
        {level: 'SS', value: 0, form: ['SA', 'SA'], out: ['SS1', 'SS6', 'SS8', 'SSA']},
        {level: 'SS', value: 0, form: ['SA', 'SB'], out: ['SS3', 'SS4', 'SSB', 'SSA']},
        {level: 'SS', value: 0, form: ['SA', 'SC'], out: ['SS3', 'SS7', 'SSA', 'SSC']},
        {level: 'SS', value: 0, form: ['SB', 'SB'], out: ['SS6', 'SS8', 'SS9', 'SSC']},
        {level: 'SS', value: 0, form: ['SB', 'SC'], out: ['SS3', 'SS4', 'SS5', 'SS7']},
        {level: 'SS', value: 0, form: ['SC', 'SC'], out: ['SS6', 'SS9', 'SSC', 'SSA']},
      ],
      ruleForm: {
        level: 'SS',
      },
      levelOption: [
        {label: 'S'},
        {label: 'SS'},
      ],
      FormConfig: [],
      dataMax: 0,
      DataList: [
        {id: 'A1', value: 0, level: 'A', name: '枯树精', alias: '树精'},
        {id: 'A2', value: 0, level: 'A', name: '灰石人', alias: '绿石头'},
        {id: 'A3', value: 0, level: 'A', name: '黑曜', alias: '黑石头'},
        {id: 'A4', value: 0, level: 'A', name: '达兹', alias: '幽灵'},
        {id: 'A5', value: 0, level: 'A', name: '门番', alias: '狼狗'},
        {id: 'A6', value: 0, level: 'A', name: '菲尼克斯', alias: '火鸟'},
        {id: 'S1', value: 0, level: 'S', name: '熔岩恶魔', alias: '大嘴'},
        {id: 'S2', value: 0, level: 'S', name: '双刃蜥蜴', alias: '双刀'},
        {id: 'S3', value: 0, level: 'S', name: '宝箱战士', alias: '宝箱怪'},
        {id: 'S4', value: 0, level: 'S', name: '怨恨', alias: '怨恨'},
        {id: 'S5', value: 0, level: 'S', name: '格瑞姆', alias: '石头怪'},
        {id: 'S6', value: 0, level: 'S', name: '霓石精', alias: '冰女'},
        {id: 'S7', value: 0, level: 'S', name: '披甲战象', alias: '大象'},
        {id: 'S8', value: 0, level: 'S', name: '石像鬼', alias: '石像鬼'},
        {id: 'S9', value: 0, level: 'S', name: '森之喀戎', alias: '绿人马'},
        {id: 'SA', value: 0, level: 'S', name: '霜之喀戎', alias: '冰人马'},
        {id: 'SB', value: 0, level: 'S', name: '暗之喀戎', alias: '暗人马'},
        {id: 'SC', value: 0, level: 'S', name: '驯鹿', alias: '牛头'},
        {id: 'SS1', value: 0, level: 'SS', name: '戴维船长', alias: '船长'},
        {id: 'SS2', value: 0, level: 'SS', name: '巴风特', alias: '恶魔'},
        {id: 'SS3', value: 0, level: 'SS', name: '卡斯帕', alias: '老鹰'},
        {id: 'SS4', value: 0, level: 'SS', name: '马赫斯', alias: '狮子'},
        {id: 'SS5', value: 0, level: 'SS', name: '欧文', alias: '欧文'},
        {id: 'SS6', value: 0, level: 'SS', name: '处刑者', alias: '处刑'},
        {id: 'SS7', value: 0, level: 'SS', name: '符石守护者', alias: '符石'},
        {id: 'SS8', value: 0, level: 'SS', name: '梅尔基奥尔', alias: '梅尔'},
        {id: 'SS9', value: 0, level: 'SS', name: '冥界凤凰', alias: '凤凰'},
        {id: 'SSA', value: 0, level: 'SS', name: '西蒙', alias: '飞龙'},
        {id: 'SSB', value: 0, level: 'SS', name: '暴雨领主', alias: '水怪'},
        {id: 'SSC', value: 0, level: 'SS', name: '枯骨法师', alias: '骨法'},
      ],
      DataName: {},
    };
  },
  computed: {
    formulaRuleA() {
      const formulaRule = this.formulaRule.filter(item => item.level === 'S' && item.value > 0);
      return formulaRule.sort((a, b) => b.value - a.value);
    },
    formulaRuleS() {
      const formulaRule = this.formulaRule.filter(item => item.level === 'SS' && item.value > 0);
      return formulaRule.sort((a, b) => b.value - a.value);
    },
  },
  mounted() {
    this.getConfig();
    this.DataList.forEach(item => {
      this.DataName[item.id] = item.name;
    });
  },
  methods: {
    initForm() {
      for (const argumentsKey in this.ruleForm) {
        if (['level'].includes(argumentsKey)) continue;
        this.ruleForm[argumentsKey] = 2;
      }
      this.formulaRule.forEach(item => (item.value = 0));
      this.dataMax = 0;
    },
    computedData(level, showType, ruleForm) {
      console.info(level);
      const formulaRule = this.formulaRule.filter(item => item.level === level);
      formulaRule.forEach(item => {
        item.value = 0;
        item.out.forEach(outItem => {
          const num = ruleForm[outItem] - 1 ? ruleForm[outItem] - 1 : -15;
          item.value += num;
        });
      });
      let sort = formulaRule.map(item => item.value);
      sort = sort.sort((a, b) => b - a);
      this.dataMax = sort[0];
      formulaRule.forEach(item => {
        if (item.value < sort[10]) item.value = 0;
        if (ruleForm[item.form[0]] === undefined) ruleForm[item.form[0]] = 0;
        if (ruleForm[item.form[1]] === undefined) ruleForm[item.form[1]] = 0;
        ruleForm[item.form[0]] += item.value;
        ruleForm[item.form[1]] += item.value;
      });
      const levelArr = ['A', 'S', 'SS'];
      const levelIndex = levelArr.indexOf(level);
      if (levelIndex > levelArr.indexOf(showType)) {
        return this.computedData(levelArr[levelIndex - 1], showType, ruleForm);
      } else {
        return ruleForm;
      }
    },
    reSetData() {
      this.formulaRule.forEach(item => (item.value = 0));
      this.dataMax = 0;
      return cloneDeep(this.ruleForm);
    },
    getConfig() {
      this.DataList.forEach(item => {
        this.ruleForm[item.id] = 2;
        this.FormConfig.push({
          prop: item.id,
          label: item.name,
          level: item.level,
          default: 4,
          attrs: {
            showText: true,
            max: 6,
            texts: ['一定不要', '不想要', '不太想要', '一般', '能接受', '想要'],
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          },
          change: () => {
            this.computedData(this.ruleForm.level, 'S', this.reSetData());
          },
          option: [
            {label: -18, desc: '一定不要'},
            {label: 0, desc: '不想要'},
            {label: 1, desc: '不太想要'},
            {label: 2, desc: '一般'},
            {label: 3, desc: '能接受'},
            {label: 4, desc: '想要'},
          ],
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  min-width: 360px;
  :deep(.el-form-item, .el-select, .el-date-editor, .el-cascader) {
    width: 100%;
  }
  :deep(&.twoColumns) {
    .el-form-item {
      width: 50%;
    }
    .oneRow {
      width: 100%;
    }
    @media only screen and (max-width: 767px) {
      .el-form-item {
        width: 100%;
      }
    }
  }
}
.XCInfo {
  color: red;
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
}
.petsCont {
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
  max-width: 500px;
  .petsPage {
    padding: 0 20px 20px;
    min-width: 150px;
    .title {
      font-size: 24px;
      line-height: 42px;
      text-align: center;
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
      .el-form-item__label {
        line-height: 16px;
        margin-bottom: 0;
        padding-bottom: 0;
      }
    }
    :deep(.el-rate) {
      line-height: 1;
    }
  }
}
</style>
