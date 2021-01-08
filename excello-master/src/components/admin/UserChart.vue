<script>
import { Bar } from "vue-chartjs";
import { Store } from "vuex";
import { mapState } from "vuex";
export default {
  extends: Bar,
  data() {
    return {
      label: [],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Users",
          data: [],
          backgroundColor: "#42b983"
        }
      ]
    };
  },
  computed: mapState(["data"]),
  created() {
    if (this.$store.state.data.users.length > 0) {
      this.setData();
    }
    var obj = this;
    this.unwatch = this.$store.watch(
      state => state.data.users,
      (newValue, oldValue) => {
        if (oldValue.length < newValue.length) {
          this.setData();
        }
      }
    );
  },
  methods: {
    setData() {
      this.datasets[0].data = [];
      this.label = [];
      var d = new Date();
      var i = 30;
      while (i >= 0) {
        var ago = i * 24 * 60 * 60 * 1000;
        var date = new Date(d.getTime() - ago);
        var day = date.getDate();
        var intmon = date.getMonth();
        var mon = this.months[intmon];
        var users = this.$store.state.data.users.filter(user => {
          var date = new Date(user.Created);
          var umon = date.getMonth();
          var uday = date.getDate();
          if (umon == intmon && uday == day) {
            return user;
          }
        });
        this.label.push(`${mon} ${day}`);
        this.datasets[0].data.push(users.length);
        i--;
      }
      this.render();
    },
    render() {
      this.renderChart(
        {
          labels: this.label,
          datasets: this.datasets
        },
        {
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                categoryPercentage: 1,
                barPercentage: 0.5
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      );
    }
  },
  watch: {
    $store: {
      handler(state) {
        this.setData();
      }
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.render();
  },
  beforeDestroy() {
    this.unwatch();
  }
};
</script>