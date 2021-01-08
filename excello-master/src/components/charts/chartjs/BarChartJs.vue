<script>
import { Bar } from "vue-chartjs";
import { Store } from "vuex";

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
  created() {
    this.setData();
  },
  methods: {
    setData() {
      var d = new Date();
      var i = 30;
      while (i >= 0) {
        var ago = i * 24 * 60 * 60 * 1000;
        var date = new Date(d.getTime() - ago);
        var day = date.getDate();
        var intmon = date.getMonth();
        var mon = this.months[intmon];
        var users = this.$store.state.data.users.filter(user => {
          var date = new Date(user.created);
          var umon = date.getMonth();
          var uday = date.getDate();
          console.log("here");
          if (umon == intmon && uday == day) {
            return user;
          }
        });
        this.label.push(`${mon} ${day}`);
        this.datasets[0].data.push(users.length);
        i--;
      }
    }
  },
  watch: {
    $store: {
      handler() {
        this.setData();
      }
    }
  },
  mounted() {
    // Overwriting base render method with actual data.
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
};
</script>
