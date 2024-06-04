import "./hometab.css"
import { WidgetTypes, createWidget } from "../../../index";

export default createWidget(
    <div  widget-type={WidgetTypes.FREE}  widget-class={"homeContainer"}>
        <h1>Famous Race Tracks</h1>
        <h2>Introduction</h2>
        <p>Race tracks around the world have become iconic due to their challenging layouts, historical significance, and the memorable races they have hosted. Here are some of the most famous race tracks in the world.</p>

        <h3>Monaco Grand Prix Circuit</h3>
        <p>The Monaco Grand Prix Circuit, also known as Circuit de Monaco, is one of the most prestigious and challenging tracks in Formula One. Located on the streets of Monte Carlo and La Condamine, the track is known for its narrow and twisting layout.</p>

        <h3>Indianapolis Motor Speedway</h3>
        <p>Located in Speedway, Indiana, the Indianapolis Motor Speedway is home to the famous Indianapolis 500 race. It is one of the oldest and most iconic tracks in the world, featuring a rectangular oval layout.</p>

        <h3>Silverstone Circuit</h3>
        <p>Silverstone Circuit is located in Northamptonshire, England, and is known as the home of British motorsport. It has hosted the British Grand Prix since 1948 and is famous for its fast and challenging corners.</p>
    </div>
);