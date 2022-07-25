// imports
import FModalBody from "./FModalBody";

const statusBadge = (status: string) => {
  let badge = <div></div>;

  if (status === "high") {
    badge = (
      <p className="h4 border rounded-3 border-3 mt-3 mt-md-4 mt-lg-0 py-3 px-2 col-12 col-md-12 col-lg-4 text-white bg-danger">
        HIGH RISK OF FLOODING IN THIS LOCATION
      </p>
    );
  }
  if (status === "medium") {
    badge = (
      <p className="h4 border rounded-3 border-3 mt-3 mt-md-4 mt-lg-0 py-3 px-2 col-12 col-md-12 col-lg-4 text-white bg-warning">
        MEDIUM RISK OF FLOODING IN THIS LOCATION
      </p>
    );
  }
  if (status === "low") {
    badge = (
      <p className="h4 border rounded-3 border-3 mt-3 mt-md-4 mt-lg-0 py-3 px-2 col-12 col-md-12 col-lg-4 text-white bg-success">
        LOW RISK OF FLOODING IN THIS LOCATION
      </p>
    );
  }

  return badge;
};

// prop types
type ForecastModalProps = {
  forecastData: any;
};

// default export
export default function ForecastModal({ forecastData }: ForecastModalProps) {
  // main return

  const percentageGroups = ["low", "medium", "high"];

  const floodRiskPercentage =
    forecastData.data.floodRiskPercentage < 45
      ? "low"
      : forecastData.data.floodRiskPercentage > 44 &&
        forecastData.data.floodRiskPercentage < 84
      ? "medium"
      : "high";

  const triangleColor = ["success", "warning", "danger"][
    percentageGroups.indexOf(floodRiskPercentage)
  ];

  return (
    <div>
      <div className="w-100 d-lg-flex mt-3 align-items-center justify-content-between">
        <p className="border border-3 p-2 col-12 col-md-12 col-lg-4 rounded-3">
          {forecastData.data.advisory}
        </p>
        <div className="d-flex mb-lg-3 justify-content-center align-items-end">
          <i
            className={`fas fa-triangle-exclamation text-${triangleColor}`}
            style={{ fontSize: "120px" }}
          />
        </div>

        {statusBadge(floodRiskPercentage)}
      </div>
    </div>
  );
}
