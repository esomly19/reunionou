<script>
import { Pie } from "vue-chartjs";
import axios from "axios";
export default {
  extends: Pie,
  data() {
    return {
      chrome: 0,
      firefox: 0
    };
  },

  methods: {},
  mounted() {
    axios
      .get("http://localhost:3000/logs")
      .then(res => {
        this.gradient = this.$refs.canvas
          .getContext("2d")
          .createLinearGradient(0, 0, 0, 450);
        this.gradient2 = this.$refs.canvas
          .getContext("2d")
          .createLinearGradient(0, 0, 0, 450);

        this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
        this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
        this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

        this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
        this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
        this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
        this.renderChart(
          {
            labels: ["Chrome", "Firefox"],
            datasets: [
              {
                backgroundColor: [this.gradient, this.gradient2],
                data: [res.data.chrome, res.data.firefox]
              }
            ]
          },
          { responsive: true, maintainAspectRatio: false }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>