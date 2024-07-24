import "./hometab.css"
import { WidgetTypes, createWidget } from "../../../index";

export default createWidget(
    <div  widget-type={WidgetTypes.FREE}  widget-class={"homeContainer"}>
        <h1>Famous Race Car Drivers</h1>
    <h2>Introduction</h2>
    <p>Throughout the history of motorsport, many drivers have left an indelible mark on the sport.</p>

    <h3>Juan Manuel Fangio</h3>
    <p>Juan Manuel Fangio, an Argentine racing driver, dominated the early years of Formula One, winning five World Championships in the 1950s. Fangio's skill and precision on the track earned him the nickname "El Maestro."</p>
    <img src="fangio.jpg" alt="Juan Manuel Fangio" />

    </div>
);