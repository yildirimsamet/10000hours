import styles from "./styles.module.scss";
import classnames from "classnames";
interface IStatuBar {
  hours: number;
}
const StatuBar: React.FC<IStatuBar> = ({ hours }) => {
  const calculatePercentage = (hour: number, maxHour = 10000) => {
    return ((100 * hour) / maxHour).toFixed(0);
  };
  const percentage = calculatePercentage(hours);
  const calculateColor = (percentage: number): string => {
    if (percentage >= 0 && percentage < 20) return "red2";
    if (percentage >= 20 && percentage < 40) return "red1";
    if (percentage >= 40 && percentage < 60) return "green0";
    if (percentage >= 60 && percentage < 80) return "green1";
    if (percentage >= 80 && percentage <= 100) return "green2";
    else {
      return "";
    }
  };
  return (
    <div className={styles.statuBar}>
      <span
        style={{ width: `${percentage}%` }}
        className={classnames(
          styles.statuBarProgress,
          styles[calculateColor(+percentage)]
        )}
      >
        {/* if percentage is too small we only show the hours */}
        {hours>500&& (+percentage < 20 ? hours : hours + " Hours")}
      </span>
      <div className={styles.statuBarPercentage}>
        <span>0%</span>
       {hours>500&& <span
          style={{ left: `${percentage}%` }}
          className={styles.statuBarPercentageMid}
        >
          {percentage + "%"}
        </span>}
        <span>100%</span>
      </div>
    </div>
  );
};
export default StatuBar;
