import Image from "next/image";

// prop types
type FModalBodyProps = {
  data: any;
  formattedAddress: any;
};

const line = (
  <div
    className="my-3"
    style={{
      height: "2px",
      backgroundColor: "rgb(100,100,100)",
      width: "100%",
    }}
  ></div>
);

export function DifferentHours(props: any) {
  const _hours = props.hours.data.hourlyData //hours
    .filter((hour: any) => hour.time !== "24")
    .map((hour: any) => {
      let _time = hour.time;
      //remove excessive 00 without tampering with 12am which is 00
      _time = Number(hour.time) > 0 ? Number(hour.time.split("0")[0]) : 0;
      //add leading zero if less than 10
      _time = _time.toString().length === 1 ? `0${_time}` : _time;
      //add am to 12am
      _time = String(Number(_time) === 0 ? "12:00 am" : _time);
      //complete the rest of the time
      if (!_time.includes("am")) {
        if (Number(_time) / 12 < 1) {
          _time = `${_time}:00 am`;
        } else {
          _time = `${_time}:00 pm`;
        }
      }
      return {
        ...hour,
        time: _time,
      };
    });

  return _hours.map((hour: any, index: number) => {
    return (
      <div
        key={index}
        className=" d-flex flex-column align-items-center me-2 rounded bg-transparent px-3 shadow-lg text-white "
      >
        <div>
          <h6 className="p-3" style={{ height: "70px" }}>
            {hour.time}
          </h6>{" "}
        </div>
        {/* <Image
          src={hour.weatherIconUrl[0].value}
          alt={hour.weatherDesc}
          width={50}
          height={50}
        /> */}
        <div
          style={{
            height: "6rem",
            width: "6rem",
            backgroundImage: `url('${hour.weatherIconUrl[0].value}')`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <h6 className="py-2">{hour.tempC} &#8451;</h6>
      </div>
    );
  });
}

// default export
export default function FModalBody({
  data,
  formattedAddress,
}: FModalBodyProps) {
  const hourTemperature = data.data.hourlyData.map((hour: any) =>
    Number(hour.tempC)
  );
  const maxHourTemperature = Math.max(...hourTemperature);
  const minHourTemperature = Math.min(...hourTemperature);

  return (
    <div
      className="row text-white p-3 m-0 rounded shadow-lg "
      style={{
        textShadow: "2px 2px rgba(0,0,0,0.2)",
        background: "url(/otherImages/cloudySky.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col col-sm-6 col-lg-6">
        <div>
          <h3 className="py-2">CURRENT WEATHER</h3>
          <div className="d-flex">
            <div
              style={{
                height: "8rem",
                width: "8rem",
                backgroundImage: `url('${data.data.currentCondition[0].weatherIconUrl[0]["value"]}')`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            {/* <Image
              src={data.data.currentCondition[0].weatherIconUrl[0]["value"]}
              alt={data.data.currentCondition[0].weatherDesc[0]["value"]}
              width={100}
              height={100}
              style={{ objectFit: "contain", objectPosition: "center" }}
            /> */}
            <div className="mx-4 mt-0">
              <p className="fs-1">
                <b>{data.data.currentCondition[0].temp_C} &#8451;</b>
              </p>
              <p className="fs-5">
                Feels like {data.data.currentCondition[0].FeelsLikeC} &#8451;
              </p>
            </div>
          </div>
          <p className="fs-5 mt-2">
            <b>{data.data.currentCondition[0].weatherDesc[0]["value"]}</b>
          </p>
        </div>
      </div>

      <div className="col col-sm-6 col-lg-6 d-flex flex-column justify-content-center">
        <div className="d-flex flex-column justify-content-center ">
          <div className="d-flex align-items-center py-2">
            <Image src="/svgs/flood_forecast/wind.svg" width="30" height="30" />
            <p className=" ms-3 fs-5">
              Wind:
              <b> {data.data.currentCondition[0].windspeedKmph}Km/h</b>
            </p>
          </div>

          <div className="d-flex align-items-center py-2">
            <Image
              src="/svgs/flood_forecast/humidity.svg"
              width="30"
              height="30"
            />
            <p className=" ms-3 fs-5">
              Humidity:
              <b> {data.data.currentCondition[0].humidity}%</b>
            </p>
          </div>

          <div className="d-flex align-items-center py-2">
            <Image
              src="/svgs/flood_forecast/visibility.svg"
              width="30"
              height="30"
            />
            <p className=" ms-3 fs-5">
              Visibility:
              <b> {data.data.currentCondition[0].visibility}km</b>
            </p>
          </div>

          <div className="d-flex align-items-center py-2">
            <Image
              src="/svgs/flood_forecast/pressure.svg"
              width="30"
              height="30"
            />
            <p className=" ms-3 fs-5">
              Pressure:
              <b> {data.data.currentCondition[0].pressure}Mb</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
