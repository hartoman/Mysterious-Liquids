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
            ML is free software: you can redistribute it and/or modify it under the terms of the Creative Commons
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nam hic architecto quod modi, accusantium,
            consectetur illum enim ex, officia distinctio soluta. Distinctio consequuntur eveniet accusantium minus fuga
            aperiam! Dolorum porro maxime fugiat tempora ratione asperiores ducimus repudiandae ullam reprehenderit
            perferendis explicabo expedita, in blanditiis doloremque dolor enim? Saepe perferendis perspiciatis nobis
            est, commodi tenetur cupiditate quo vel quasi dolor cumque labore, omnis iure ipsa quod quas excepturi sunt
            id rerum dolorum voluptate suscipit similique? Nobis quae mollitia ea cumque accusamus amet rerum similique,
            ducimus asperiores quam quia quidem doloribus. Temporibus consequuntur dolores alias quisquam perferendis
            minus enim impedit recusandae!
          </p>
          <button onClick={() => props.setInfoShown(false)}> Back</button>
        </div>
      </div>
    </div>
  );
}
export default InfoScreen;
