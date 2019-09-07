import { Vue, Component } from 'vue-property-decorator';

@require('./app.render.html?style=./app.scss')
@Component({
  components: {},
})
export default class App extends Vue {
  public formLayout = 'horizontal';
  public form!: any;

  public created() {
    this.form = this.$form.createForm(this);
  }

  public handleSubmit(e: any) {
    e.preventDefault();
    console.log(this);
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  public handleSelectChange(value: string) {
    console.log(value);
    this.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
}
