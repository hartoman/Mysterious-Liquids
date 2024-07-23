import * as classes from "./LevelFinishedScreen.module.css";

function InfoScreen(props) {
  return (
    <div className="background">
      <div className="content">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Mysterious Liquids</h1>
          <i>Copyright © 2024 Christos Chartomatsidis</i>
          <p>This game is a personal project to practice React</p>
          <p>
            Mysterious Liquids is a classic water-sort puzzle game: the goal is to transfer the liquids from one bottle
            to another, so that you end up with full bottles and each bottle has only one color. You may place a liquid
            in an empty bottle or on top of a liquid of the same color.
          </p>
          <p>
            Mysterious Liquids is free software: you can redistribute it and/or modify it under the terms of the Creative Commons
            Attribution-ShareAlike 4.0 International License.
          </p>
          <p>
            You should have received a copy of the Creative Commons Attribution-ShareAlike 4.0 International License
            along with this program. If not, see here:
          </p>
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons</a>

          <ul>
            <li>
              {" "}
              This software is provided on an "as-is" basis, meaning without any warranties or guarantees of any kind.{" "}
            </li>
            <li>You must give appropriate credit and indicate if changes were made.</li>
            <li>You must distribute under the same license as the original, **even if modified**</li>
          </ul>

            <button style={{marginBottom:"100px", height:"100px", fontSize:"3rem"}} onClick={() => props.setInfoShown(false)}> Back</button>
        </div>
      </div>
    </div>
  );
}
export default InfoScreen;
