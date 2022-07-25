import Image from "next/image"



// prop types
type WeatherItemProps = {
     index: number,
     weather: any
}


// default export
export default function WeatherItem({ index, weather }: WeatherItemProps) {

     // default return
     return (
          <div className="accordion-item">
          <h2 className="accordion-header" 
              id={`flush-headingOne${index}`}>
               <button className="accordion-button collapsed" 
                       type="button" 
                       data-bs-toggle="collapse" 
                       data-bs-target={`#flush-collapseOne${index}`} 
                       aria-expanded="false" 
                       aria-controls={`#flush-collapseOne${index}`}>{weather.date}
               </button>
          </h2>

          <div id={`flush-collapseOne${index}`} 
               className="accordion-collapse collapse" 
               aria-labelledby={`flush-headingOne${index}`} 
               data-bs-parent="#accordionFlushExample">
               <div className="accordion-body">
               <div className="container">
               <div className="row">
                    <div className="col-12 col-md-3">
                    <Image src={`http:${weather.day.condition.icon}`} />
                    <h5 className="ms-2">{`${weather.day.condition.text}`}</h5>
                    </div>

                    <div className="col-12 col-md-3">
                    <div>
                    <small>Min/Max</small>
                    <h4>{`${weather.day.mintemp_c}`}°/{`${weather.day.maxtemp_c}`}°</h4>
                    </div>

                    <div className="mt-3">
                    <small>Avg Humidity</small>
                    <h4>{`${weather.day.avghumidity}`}</h4>
                    </div>
                    </div>

                    <div className="col-12 col-md-3">
                    <div>
                    <small>Moonrise</small>
                    <h4>{`${weather.astro.moonrise}`}</h4>
                    </div>

                    <div className="mt-3">
                    <small>Moonset</small>
                    <h4>{`${weather.astro.moonset}`}</h4>
                    </div>
                    </div>

                    <div className="col-12 col-md-3">
                         <div>
                         <small>Sunrise</small>
                         <h4>{`${weather.astro.sunrise}`}</h4>
                         </div>

                         <div className="mt-3">
                         <small>Sunset</small>
                         <h4>{`${weather.astro.sunset}`}</h4>
                         </div>
                    </div>
               </div>
               </div>
               </div>
          </div>
          </div>
     )
}